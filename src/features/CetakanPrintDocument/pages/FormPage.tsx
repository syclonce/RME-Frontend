import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePrintDocumentResource } from '../api'

const TYPES = ['receipt', 'karcis', 'wristband', 'tracer'] as const

export function PrintDocumentFormPage() {
  const navigate = useNavigate()
  const { issue } = usePrintDocumentResource()
  const [documentType, setDocumentType] = useState<(typeof TYPES)[number]>('receipt')
  const [refType, setRefType] = useState('')
  const [refId, setRefId] = useState('')

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        issue.mutate(
          { document_type: documentType, ref_type: refType, ref_id: Number(refId) },
          { onSuccess: () => navigate('/modul/cetakan-print-document') },
        )
      }}
    >
      <h1 className="text-lg font-semibold">Terbitkan Dokumen Cetak</h1>
      <div className="grid gap-1.5">
        <Label>Jenis Dokumen *</Label>
        <Select value={documentType} onValueChange={(v) => setDocumentType(v as (typeof TYPES)[number])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ref_type">Ref Type * (mis. invoice, visit)</Label>
        <Input id="ref_type" value={refType} onChange={(e) => setRefType(e.target.value)} required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="ref_id">Ref ID *</Label>
        <Input id="ref_id" type="number" value={refId} onChange={(e) => setRefId(e.target.value)} required />
      </div>
      <Button type="submit" disabled={issue.isPending}>
        Terbitkan
      </Button>
    </form>
  )
}
