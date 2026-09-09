import { useState } from 'react'
import { Activity } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { OrderStatusBadge } from '@/shared/components/OrderStatusBadge'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { useCreateRadiologyOrder, useVisitRadiologyOrders } from '../api'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/** Sama persis dengan RadiologyOrder::MODALITIES di backend. */
const MODALITIES = ['X-Ray', 'CT', 'MRI', 'USG'] as const

/**
 * Order radiologi satu kunjungan.
 *
 * `patient_id` wajib di backend tapi TIDAK diminta ke petugas: ia diturunkan
 * dari konteks kunjungan yang sedang dibuka. Memintanya lagi berarti membuka
 * peluang order menempel pada pasien yang berbeda dari kunjungannya.
 */
export function RadiologyOrderListPage() {
  const { visitId, context } = useActiveVisit()
  const listQuery = useVisitRadiologyOrders(visitId)
  const createMutation = useCreateRadiologyOrder(visitId)
  const [modality, setModality] = useState<string>('')
  const [bodyPart, setBodyPart] = useState('')
  const [clinicalNotes, setClinicalNotes] = useState('')

  const patientId = context?.registration.patient_id ?? null

  async function submit() {
    if (patientId === null) return
    try {
      await createMutation.mutateAsync({
        patient_id: patientId,
        ...(modality !== '' ? { modality } : {}),
        ...(bodyPart.trim() !== '' ? { body_part: bodyPart.trim() } : {}),
        ...(clinicalNotes.trim() !== '' ? { clinical_notes: clinicalNotes.trim() } : {}),
      })
      toast.success('Order radiologi dibuat.')
      setModality('')
      setBodyPart('')
      setClinicalNotes('')
    } catch (error) {
      notifyApiError(error)
    }
  }

  if (visitId === null) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Radiologi</CardTitle>
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
          <Activity className="text-muted-foreground size-5" /> Order Radiologi
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
            Indikasi klinis membantu radiolog membaca gambar — sertakan apa yang dicurigai,
            bukan hanya bagian tubuhnya.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="modality">Modalitas</Label>
            <Select value={modality} onValueChange={setModality}>
              <SelectTrigger id="modality">
                <SelectValue placeholder="Pilih modalitas" />
              </SelectTrigger>
              <SelectContent>
                {MODALITIES.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="body-part">Bagian Tubuh</Label>
            <Input
              id="body-part"
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
              placeholder="mis. Thorax PA"
            />
          </div>

          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="clinical-notes">Indikasi Klinis</Label>
            <Textarea
              id="clinical-notes"
              rows={3}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="mis. Batuk 3 minggu, curiga TB paru."
            />
          </div>

          <div className="sm:col-span-2">
            <Button disabled={patientId === null || createMutation.isPending} onClick={submit}>
              {createMutation.isPending ? 'Membuat...' : 'Buat Order'}
            </Button>
            {patientId === null && (
              <p className="text-muted-foreground mt-1.5 text-xs">Memuat konteks pasien...</p>
            )}
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
              Belum ada order radiologi pada kunjungan ini.
            </p>
          )}

          {(listQuery.data ?? []).map((order) => (
            <div key={order.id} className="rounded-md border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium">
                  {[order.modality, order.body_part].filter(Boolean).join(' · ') || `Order #${order.id}`}
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {order.ordered_at ? TIME.format(new Date(order.ordered_at)) : 'Waktu tidak tercatat'}
              </p>
              {order.clinical_notes && (
                <p className="mt-2 text-sm whitespace-pre-line">{order.clinical_notes}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
