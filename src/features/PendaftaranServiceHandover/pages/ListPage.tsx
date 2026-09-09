import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'
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
import { useCreateServiceHandover, useVisitServiceHandovers } from '../api'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/**
 * Serah terima pelayanan pasien ke unit lain.
 *
 * Menggantikan tabel CRUD generik. Yang penting di sini bukan daftar barisnya,
 * melainkan APAKAH SUDAH DITERIMA unit tujuan: serah terima yang masih
 * `pending` berarti pasien belum benar-benar diterima siapa pun, dan itu
 * jenis celah yang berakhir pada pasien tak terpantau.
 */
export function ServiceHandoverListPage() {
  const { visitId, context } = useActiveVisit()
  const listQuery = useVisitServiceHandovers(visitId)
  const createMutation = useCreateServiceHandover(visitId)
  const [wardId, setWardId] = useState<number | null>(null)
  const [notes, setNotes] = useState('')

  const pending = (listQuery.data ?? []).filter((h) => h.status === 'pending')

  async function submit() {
    if (wardId === null) return
    try {
      await createMutation.mutateAsync({
        ward_id: wardId,
        ...(notes.trim() !== '' ? { notes: notes.trim() } : {}),
      })
      toast.success('Serah terima dikirim ke unit tujuan.')
      setWardId(null)
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
            <CardTitle>Serah Terima Pelayanan</CardTitle>
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
          <ArrowRightLeft className="text-muted-foreground size-5" /> Serah Terima Pelayanan
        </h1>
        <p className="text-muted-foreground text-sm">
          {context
            ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}`
            : `Kunjungan #${visitId}`}
        </p>
      </div>

      {pending.length > 0 && (
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardContent className="pt-6 text-sm">
            <p className="font-medium">
              {pending.length === 1
                ? 'Ada satu serah terima yang belum diterima unit tujuan.'
                : `Ada ${pending.length} serah terima yang belum diterima unit tujuan.`}
            </p>
            <p className="text-muted-foreground mt-0.5">
              Pasien belum resmi berpindah tanggung jawab sampai unit tujuan menerimanya.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Serahkan ke Unit Lain</CardTitle>
          <CardDescription>
            Unit tujuan harus menerima serah terima ini sebelum tanggung jawab benar-benar berpindah.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label>Unit Tujuan</Label>
            <AsyncCombobox endpoint="/wards" value={wardId} onChange={setWardId} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="notes">Catatan Serah Terima</Label>
            <p className="text-muted-foreground text-xs">
              Apa yang perlu diketahui petugas berikutnya: kondisi terkini, terapi berjalan,
              hal yang harus dipantau.
            </p>
            <Textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div>
            <Button disabled={wardId === null || createMutation.isPending} onClick={submit}>
              {createMutation.isPending ? 'Mengirim...' : 'Serahkan Pelayanan'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Serah Terima</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {listQuery.isLoading && <Skeleton className="h-16 w-full" />}

          {!listQuery.isLoading && (listQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada serah terima pada kunjungan ini.
            </p>
          )}

          {(listQuery.data ?? []).map((handover) => (
            <div key={handover.id} className="rounded-md border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <RelationLabel endpoint="/wards" id={handover.ward_id} />
                <OrderStatusBadge status={handover.status} />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {handover.handed_over_at
                  ? TIME.format(new Date(handover.handed_over_at))
                  : 'Waktu tidak tercatat'}
              </p>
              {handover.notes && <p className="mt-2 text-sm whitespace-pre-line">{handover.notes}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
