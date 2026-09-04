import { useState } from 'react'
import { Stamp } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { notifyApiError } from '@/shared/lib/apiError'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { useRecordDiagnosis, useVisitDiagnoses } from '../api'

/**
 * Diagnosis satu kunjungan.
 *
 * Menggantikan tabel CRUD generik yang meminta `diagnosis_code_id` sebagai
 * ANGKA — dokter harus tahu id baris ICD-10 di database, bukan kodenya.
 * Di sini kode dicari lewat combobox.
 *
 * Diagnosis utama selalu di atas: ia yang menentukan grouping INA-CBG, dan
 * dokter memeriksanya lebih dulu sebelum diagnosis sekunder.
 */
export function DiagnosisListPage() {
  const { visitId, context } = useActiveVisit()
  const listQuery = useVisitDiagnoses(visitId)
  const recordMutation = useRecordDiagnosis(visitId)
  const [codeId, setCodeId] = useState<number | null>(null)
  const [isPrimary, setIsPrimary] = useState(false)

  const existingPrimary = (listQuery.data ?? []).find((d) => d.is_primary)

  async function submit() {
    if (codeId === null) return
    try {
      await recordMutation.mutateAsync({ diagnosis_code_id: codeId, is_primary: isPrimary })
      toast.success(isPrimary ? 'Diagnosis utama ditetapkan.' : 'Diagnosis ditambahkan.')
      setCodeId(null)
      setIsPrimary(false)
    } catch (error) {
      notifyApiError(error)
    }
  }

  if (visitId === null) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
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
          <Stamp className="text-muted-foreground size-5" /> Diagnosis
        </h1>
        <p className="text-muted-foreground text-sm">
          {context
            ? `${context.patient.name ?? 'Pasien'} · ${context.visit.visit_number ?? `Kunjungan #${visitId}`}`
            : `Kunjungan #${visitId}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tambah Diagnosis</CardTitle>
          <CardDescription>Cari kode ICD-10 berdasarkan kode atau namanya.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label>Kode Diagnosis</Label>
            <AsyncCombobox endpoint="/diagnosis-codes" value={codeId} onChange={setCodeId} />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="is-primary"
              checked={isPrimary}
              onCheckedChange={(checked) => setIsPrimary(checked === true)}
            />
            <div className="grid gap-0.5">
              <Label htmlFor="is-primary">Jadikan diagnosis utama</Label>
              {/* Peringatan ini ada karena backend memang menurunkan diagnosis
                  utama sebelumnya secara diam-diam (DiagnosisController b.38-40).
                  Dokter harus tahu sebelum menekan simpan, bukan sesudahnya. */}
              <p className="text-muted-foreground text-xs">
                {existingPrimary
                  ? 'Diagnosis utama yang sekarang akan turun jadi diagnosis sekunder.'
                  : 'Satu kunjungan hanya punya satu diagnosis utama — dasar grouping INA-CBG.'}
              </p>
            </div>
          </div>

          <div>
            <Button disabled={codeId === null || recordMutation.isPending} onClick={submit}>
              {recordMutation.isPending ? 'Menyimpan...' : 'Tambah Diagnosis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Diagnosis Kunjungan Ini</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {listQuery.isLoading && <Skeleton className="h-16 w-full" />}

          {!listQuery.isLoading && (listQuery.data ?? []).length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Belum ada diagnosis. Rekam medis tidak dapat difinalkan tanpa diagnosis utama.
            </p>
          )}

          {(listQuery.data ?? []).map((diagnosis) => (
            <div
              key={diagnosis.id}
              className={`flex items-center justify-between gap-3 rounded-md border p-3 ${
                diagnosis.is_primary ? 'border-primary/40 bg-primary/5' : ''
              }`}
            >
              <RelationLabel endpoint="/diagnosis-codes" id={diagnosis.diagnosis_code_id} />
              {diagnosis.is_primary && <Badge>Utama</Badge>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
