import { useState } from 'react'
import { Stethoscope } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { OrderStatusBadge } from '@/shared/components/OrderStatusBadge'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { useCreateMedicalProcedure, useVisitMedicalProcedures } from '../api'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/**
 * Tindakan medis satu kunjungan.
 *
 * Menggantikan tabel CRUD generik yang meminta `service_id` dan
 * `performed_by` sebagai ANGKA. `performed_by` kini diisi server dari profil
 * pegawai user login; layanan dicari lewat combobox.
 *
 * Mencatat tindakan MEMBUAT BARIS TAGIHAN di backend — karena itu layar ini
 * menyatakannya, supaya petugas tahu ini bukan sekadar catatan.
 */
export function MedicalProcedureListPage() {
  const { visitId, context } = useActiveVisit()
  const listQuery = useVisitMedicalProcedures(visitId)
  const createMutation = useCreateMedicalProcedure(visitId)
  const [serviceId, setServiceId] = useState<number | null>(null)
  const [notes, setNotes] = useState('')

  async function submit() {
    if (serviceId === null) return
    try {
      await createMutation.mutateAsync({
        service_id: serviceId,
        ...(notes.trim() !== '' ? { notes: notes.trim() } : {}),
      })
      toast.success('Tindakan tercatat.')
      setServiceId(null)
      setNotes('')
    } catch (error) {
      notifyApiError(error)
    }
  }

  if (visitId === null) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Tindakan Medis</CardTitle>
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
          <Stethoscope className="text-muted-foreground size-5" /> Tindakan Medis
        </h1>
        <p className="text-muted-foreground text-sm">
          {context
            ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}`
            : `Kunjungan #${visitId}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Catat Tindakan</CardTitle>
          <CardDescription>
            Tindakan yang tercatat akan diposting sebagai baris tagihan kunjungan ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label>Layanan</Label>
            <AsyncCombobox endpoint="/services" value={serviceId} onChange={setServiceId} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div>
            <Button disabled={serviceId === null || createMutation.isPending} onClick={submit}>
              {createMutation.isPending ? 'Menyimpan...' : 'Catat Tindakan'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tindakan Kunjungan Ini</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {listQuery.isLoading && <Skeleton className="h-16 w-full" />}

          {!listQuery.isLoading && (listQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada tindakan pada kunjungan ini.
            </p>
          )}

          {(listQuery.data ?? []).map((procedure) => (
            <div key={procedure.id} className="rounded-md border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <RelationLabel endpoint="/services" id={procedure.service_id} />
                <OrderStatusBadge status={procedure.status} />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {procedure.performed_at ? TIME.format(new Date(procedure.performed_at)) : 'Waktu tidak tercatat'}
              </p>
              {procedure.notes && <p className="mt-2 text-sm whitespace-pre-line">{procedure.notes}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
