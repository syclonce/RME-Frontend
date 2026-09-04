import { ArrowRight, BedDouble, Receipt, Wallet, Pill, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AdmissionTrendChart } from '../components/AdmissionTrendChart'
import { OccupancyGauge } from '../components/OccupancyGauge'
import { useDashboardCore } from '../api'
import type { DashboardCore } from '../types'

const RUPIAH = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
})
const LONG_DATE = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

export function DashboardCoreListPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardCore()

  return (
    <DashboardView
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      isFetching={isFetching}
      onRefresh={() => refetch()}
    />
  )
}

export interface DashboardViewProps {
  data: DashboardCore | undefined
  isLoading: boolean
  isError?: boolean
  error?: unknown
  isFetching?: boolean
  onRefresh: () => void
}

/**
 * Tampilan murni — dipisah dari `useDashboardCore` supaya tata letaknya dapat
 * dirender dengan data tetap di halaman pratinjau dev. Tampilan tidak dapat
 * diperiksa lewat typecheck, dan halaman ini hanya muncul setelah login.
 */
export function DashboardView({
  data, isLoading, isError, error, isFetching, onRefresh,
}: DashboardViewProps) {
  const navigate = useNavigate()

  if (isError) {
    return (
      <div className="flex flex-col items-start gap-3 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-destructive mt-1 text-sm">
            Ringkasan tidak dapat dimuat: {(error as { message?: string })?.message ?? 'Terjadi kesalahan.'}
          </p>
        </div>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="size-4" /> Coba lagi
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            {data ? LONG_DATE.format(new Date(data.date)) : 'Memuat ringkasan operasional...'}
          </p>
        </div>
        <Button variant="ghost" size="sm" disabled={isFetching} onClick={onRefresh}>
          <RefreshCw className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
          {isFetching ? 'Memperbarui' : 'Perbarui'}
        </Button>
      </div>

      {/* Okupansi mendapat ruang terbesar karena ia satu-satunya angka di sini
          yang menuntut keputusan: bila hampir penuh, penerimaan rawat inap
          harus mulai ditahan. Sisanya laporan, bukan peringatan. */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <Card className="justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BedDouble className="text-muted-foreground size-4" /> Okupansi Tempat Tidur
            </CardTitle>
            <CardDescription>
              {data && data.occupancy.total_beds === 0
                ? 'Belum ada tempat tidur aktif yang terdaftar.'
                : data
                  ? `${data.occupancy.occupied} dari ${data.occupancy.total_beds} tempat tidur siap-pakai sedang terisi.`
                  : ' '}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || !data ? (
              <div className="flex items-center gap-5">
                <Skeleton className="size-[152px] rounded-full" />
                <div className="grid gap-2.5">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-4 w-32" />)}
                </div>
              </div>
            ) : data.occupancy.total_beds === 0 ? (
              <EmptyHint
                message="Okupansi baru dapat dihitung setelah ruangan dan tempat tidur didaftarkan."
                actionLabel="Kelola Tempat Tidur"
                onAction={() => navigate('/modul/general-bed')}
              />
            ) : (
              <div className="flex items-center justify-center py-2">
                <OccupancyGauge occupancy={data.occupancy} />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:content-stretch">
          <StatCard
            label="Pasien Rawat Inap"
            value={data?.inpatients_active}
            unit="sedang dirawat"
            loading={isLoading}
          />
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Masuk" value={data?.admissions_today} unit="hari ini" loading={isLoading} compact />
            <StatCard label="Pulang" value={data?.discharges_today} unit="hari ini" loading={isLoading} compact />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tren Tujuh Hari</CardTitle>
          <CardDescription>Pasien rawat inap yang masuk dan pulang.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || !data ? <Skeleton className="h-44 w-full" /> : <AdmissionTrendChart trend={data.trend} />}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MoneyCard
          icon={Receipt}
          label="Tagihan Terbit"
          count={data?.invoices_today.count}
          amount={data?.invoices_today.total_amount}
          loading={isLoading}
        />
        <MoneyCard
          icon={Wallet}
          label="Pembayaran Diterima"
          count={data?.payments_today.count}
          amount={data?.payments_today.total_amount}
          loading={isLoading}
        />
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Pill className="size-4" /> Resep Hari Ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading || !data ? (
              <Skeleton className="h-9 w-28" />
            ) : (
              <>
                <p className="text-2xl font-semibold tabular-nums">
                  {data.prescriptions_today.dispensed}
                  <span className="text-muted-foreground text-base font-normal">
                    {' '}dari {data.prescriptions_today.created} diserahkan
                  </span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {data.prescriptions_today.created === 0
                    ? 'Belum ada resep dibuat hari ini.'
                    : `${data.prescriptions_today.created - data.prescriptions_today.dispensed} resep menunggu penyerahan.`}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number | undefined
  unit: string
  loading: boolean
  compact?: boolean
}

function StatCard({ label, value, unit, loading, compact }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading || value === undefined ? (
          <Skeleton className={compact ? 'h-8 w-12' : 'h-10 w-16'} />
        ) : (
          <p className={`font-semibold tabular-nums ${compact ? 'text-2xl' : 'text-4xl'}`}>{value}</p>
        )}
        <p className="text-muted-foreground mt-1 text-xs">{unit}</p>
      </CardContent>
    </Card>
  )
}

interface MoneyCardProps {
  icon: typeof Receipt
  label: string
  count: number | undefined
  amount: number | undefined
  loading: boolean
}

function MoneyCard({ icon: Icon, label, count, amount, loading }: MoneyCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center gap-2">
          <Icon className="size-4" /> {label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading || amount === undefined || count === undefined ? (
          <Skeleton className="h-9 w-36" />
        ) : (
          <>
            {/* Nominal didahulukan atas jumlah dokumen: yang ditanyakan
                bagian keuangan adalah berapa rupiahnya, bukan berapa lembar. */}
            <p className="text-2xl font-semibold tabular-nums">{RUPIAH.format(amount)}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {count === 0 ? 'Belum ada transaksi hari ini.' : `dari ${count} transaksi`}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyHint({
  message, actionLabel, onAction,
}: { message: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3 py-4">
      <p className="text-muted-foreground text-sm">{message}</p>
      <Button variant="outline" size="sm" onClick={onAction}>
        {actionLabel} <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}
