import { useState } from 'react'
import { FlaskConical } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { OrderStatusBadge } from '@/shared/components/OrderStatusBadge'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { useCreateLabOrder, useVisitLabOrders } from '../api'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/**
 * Order laboratorium satu kunjungan.
 *
 * Menggantikan tabel CRUD generik yang meminta `ordered_by` sebagai ANGKA —
 * dokter harus menghafal id pegawainya sendiri. Kini diisi server.
 *
 * Nomor order juga tidak lagi diminta dari klien: backend menerbitkannya dari
 * deret NumberSequence, dan nomor yang diketik manual berisiko bertabrakan
 * dengan yang sudah terbit.
 */
export function LabOrderListPage() {
  const { visitId, context } = useActiveVisit()
  const listQuery = useVisitLabOrders(visitId)
  const createMutation = useCreateLabOrder(visitId)
  const [reason, setReason] = useState('')
  const [isEmergency, setIsEmergency] = useState(false)

  async function submit() {
    try {
      await createMutation.mutateAsync({
        ...(reason.trim() !== '' ? { reason: reason.trim() } : {}),
        is_emergency: isEmergency,
      })
      toast.success(isEmergency ? 'Order lab cito dibuat.' : 'Order lab dibuat.')
      setReason('')
      setIsEmergency(false)
    } catch (error) {
      notifyApiError(error)
    }
  }

  if (visitId === null) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Laboratorium</CardTitle>
            <CardDescription>
              Halaman ini dibuka dari papan Pelayanan Pasien supaya konteks kunjungannya ikut terbawa.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <FlaskConical className="text-muted-foreground size-5" /> Order Laboratorium
        </h1>
        <p className="text-muted-foreground text-sm">
          {context
            ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}`
            : `Kunjungan #${visitId}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Buat Order</CardTitle>
          <CardDescription>
            Pemeriksaan yang diminta ditambahkan sebagai item setelah order terbit.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="reason">Indikasi Klinis</Label>
            <Textarea
              id="reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="mis. Curiga infeksi bakteri, evaluasi leukosit."
            />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="cito"
              checked={isEmergency}
              onCheckedChange={(checked) => setIsEmergency(checked === true)}
            />
            <div className="grid gap-0.5">
              <Label htmlFor="cito">Cito</Label>
              <p className="text-muted-foreground text-xs">
                Didahulukan di antrean laboratorium. Pakai hanya bila hasilnya memang
                mengubah tindakan dalam hitungan jam.
              </p>
            </div>
          </div>

          <div>
            <Button disabled={createMutation.isPending} onClick={submit}>
              {createMutation.isPending ? 'Membuat...' : 'Buat Order'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Kunjungan Ini</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {listQuery.isLoading && <Skeleton className="h-16 w-full" />}

          {!listQuery.isLoading && (listQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada order laboratorium pada kunjungan ini.
            </p>
          )}

          {(listQuery.data ?? []).map((order) => (
            <div key={order.id} className="rounded-md border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium tabular-nums">{order.order_number ?? `Order #${order.id}`}</span>
                <div className="flex items-center gap-2">
                  {order.is_emergency && <Badge variant="destructive">Cito</Badge>}
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {order.ordered_at ? TIME.format(new Date(order.ordered_at)) : 'Waktu tidak tercatat'}
              </p>
              {order.reason && <p className="mt-2 text-sm whitespace-pre-line">{order.reason}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
