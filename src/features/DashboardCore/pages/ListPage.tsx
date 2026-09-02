import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDashboardCore } from '../api'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short' }).format(new Date(value))
}

interface KpiCardProps {
  title: string
  value: string
  description?: string
}

function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent className="text-muted-foreground text-xs">{description}</CardContent>
      )}
    </Card>
  )
}

function KpiCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-2 h-7 w-16" />
      </CardHeader>
    </Card>
  )
}

export function DashboardCoreListPage() {
  const { data, isLoading, isError, error, refetch } = useDashboardCore()

  if (isError) {
    return (
      <div className="p-4">
        <h1 className="mb-1 text-lg font-semibold">Dashboard</h1>
        <p className="text-destructive text-sm">
          Gagal memuat data dashboard: {(error as { message?: string })?.message ?? 'Terjadi kesalahan.'}
        </p>
        <button className="text-primary mt-2 text-sm underline" onClick={() => refetch()}>
          Coba lagi
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 p-4">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          {data ? `Ringkasan operasional tanggal ${formatDate(data.date)}.` : 'Ringkasan operasional hari ini.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isLoading || !data ? (
          Array.from({ length: 8 }).map((_, i) => <KpiCardSkeleton key={i} />)
        ) : (
          <>
            <KpiCard
              title="Okupansi Tempat Tidur"
              value={`${data.occupancy.occupancy_rate}%`}
              description={`${data.occupancy.occupied}/${data.occupancy.total_beds} terisi · ${data.occupancy.reserved} dipesan · ${data.occupancy.maintenance} maintenance`}
            />
            <KpiCard title="Pasien Rawat Inap Aktif" value={String(data.inpatients_active)} />
            <KpiCard title="Admisi Hari Ini" value={String(data.admissions_today)} />
            <KpiCard title="Pulang Hari Ini" value={String(data.discharges_today)} />
            <KpiCard
              title="Tagihan Hari Ini"
              value={String(data.invoices_today.count)}
              description={formatCurrency(data.invoices_today.total_amount)}
            />
            <KpiCard
              title="Pembayaran Hari Ini"
              value={String(data.payments_today.count)}
              description={formatCurrency(data.payments_today.total_amount)}
            />
            <KpiCard title="Resep Dibuat" value={String(data.prescriptions_today.created)} />
            <KpiCard title="Resep Didispensing" value={String(data.prescriptions_today.dispensed)} />
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tren Admisi &amp; Pulang (7 Hari Terakhir)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading || !data ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Admisi</TableHead>
                  <TableHead className="text-right">Pulang</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.trend.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell>{formatDate(day.date)}</TableCell>
                    <TableCell className="text-right">{day.admissions}</TableCell>
                    <TableCell className="text-right">{day.discharges}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
