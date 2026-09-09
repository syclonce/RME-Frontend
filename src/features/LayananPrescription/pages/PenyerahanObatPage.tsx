import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { notifyApiError } from '@/shared/lib/apiError'
import { toast } from 'sonner'
import { useActivePrescriptions, useDispensePrescription } from '../api'
import { usePrescriptionItems } from '@/features/LayananPrescriptionItem/api'
import type { Prescription } from '../types'

/**
 * Halaman Farmasi — Penyerahan Obat: petugas apotek melihat resep yang masih
 * berstatus 'active' (belum diserahkan), mengecek item obatnya, lalu
 * menyerahkan lewat POST /prescriptions/{id}/dispense. Backend yang memotong
 * stok dan mengubah status — halaman ini hanya perlu invalidate query
 * setelah sukses supaya resep yang sudah diserahkan hilang dari daftar.
 */
export function PenyerahanObatPage() {
  const activeQuery = useActivePrescriptions()
  const dispenseMutation = useDispensePrescription()
  const [expandedId, setExpandedId] = useState<number | null>(null)
  // Lacak resep yang sedang diproses secara terpisah dari isPending mutation
  // global, supaya tombol resep LAIN tidak ikut ter-disable saat satu resep
  // sedang diserahkan.
  const [dispensingId, setDispensingId] = useState<number | null>(null)

  // Terbaru di atas — urutkan berdasar prescribed_at menurun karena backend
  // tidak menjamin urutan tertentu.
  const sortedPrescriptions = [...(activeQuery.data ?? [])].sort((a, b) => {
    const aTime = a.prescribed_at ? new Date(a.prescribed_at).getTime() : 0
    const bTime = b.prescribed_at ? new Date(b.prescribed_at).getTime() : 0
    return bTime - aTime
  })

  const handleDispense = (prescription: Prescription) => {
    setDispensingId(prescription.id)
    dispenseMutation.mutate(prescription.id, {
      onSuccess: () => {
        toast.success(`Obat untuk resep ${prescription.prescription_number ?? `#${prescription.id}`} berhasil diserahkan.`)
      },
      // Galat stok tidak cukup (422) dari backend sudah menyebut nama obat +
      // sisa stok di pesannya — notifyApiError menampilkannya apa adanya
      // lewat toast supaya petugas langsung tahu obat mana yang bermasalah.
      onError: (error) => notifyApiError(error),
      onSettled: () => setDispensingId(null),
    })
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <p className="text-sm text-muted-foreground">Farmasi</p>
        <h1 className="text-2xl font-semibold tracking-tight">Penyerahan Obat</h1>
        <p className="text-sm text-muted-foreground">Resep yang menunggu diserahkan ke pasien.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Resep Menunggu</CardTitle>
          <Badge variant="outline">{sortedPrescriptions.length} resep</Badge>
        </CardHeader>
        <CardContent>
          {activeQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat daftar resep...</p>}

          {activeQuery.isError && <p className="text-sm text-destructive">Daftar resep tidak dapat dimuat.</p>}

          {!activeQuery.isLoading && !activeQuery.isError && sortedPrescriptions.length === 0 && (
            <p className="text-sm text-muted-foreground">Tidak ada resep menunggu penyerahan.</p>
          )}

          {sortedPrescriptions.length > 0 && (
            <div className="flex flex-col divide-y">
              {sortedPrescriptions.map((prescription) => (
                <PrescriptionRow
                  key={prescription.id}
                  prescription={prescription}
                  isExpanded={expandedId === prescription.id}
                  onToggleExpand={() => setExpandedId((current) => (current === prescription.id ? null : prescription.id))}
                  onDispense={() => handleDispense(prescription)}
                  isDispensing={dispensingId === prescription.id}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface PrescriptionRowProps {
  prescription: Prescription
  isExpanded: boolean
  onToggleExpand: () => void
  onDispense: () => void
  isDispensing: boolean
}

function PrescriptionRow({ prescription, isExpanded, onToggleExpand, onDispense, isDispensing }: PrescriptionRowProps) {
  const itemsQuery = usePrescriptionItems(prescription.id, isExpanded)

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggleExpand} className="py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CollapsibleTrigger asChild>
          <button type="button" className="flex flex-1 items-center gap-2 text-left">
            <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            <div>
              <p className="font-medium">{prescription.prescription_number ?? `Resep #${prescription.id}`}</p>
              <p className="text-sm text-muted-foreground">
                Kunjungan #{prescription.visit_id ?? '—'}
                {prescription.prescribed_at ? ` · Diresepkan ${new Date(prescription.prescribed_at).toLocaleString('id-ID')}` : ''}
              </p>
            </div>
          </button>
        </CollapsibleTrigger>
        <Button onClick={onDispense} disabled={isDispensing}>
          {isDispensing ? 'Menyerahkan...' : 'Serahkan Obat'}
        </Button>
      </div>

      <CollapsibleContent className="mt-3 pl-6">
        {itemsQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat item obat...</p>}

        {itemsQuery.isError && <p className="text-sm text-destructive">Item obat tidak dapat dimuat.</p>}

        {!itemsQuery.isLoading && !itemsQuery.isError && (itemsQuery.data?.length ?? 0) === 0 && (
          <p className="text-sm text-muted-foreground">Resep ini tidak memiliki item obat.</p>
        )}

        {(itemsQuery.data?.length ?? 0) > 0 && (
          <div className="flex flex-col gap-2 rounded-md border p-3">
            {itemsQuery.data?.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-medium">{item.drug_name ?? '—'}</span>
                <span className="text-muted-foreground">
                  {item.dosage ?? '—'} · {item.frequency ?? '—'} · Jumlah {item.quantity ?? '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
