import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RecordFieldsForm, groupFieldsBySection, type CrudField } from '@/shared/components/RecordFieldsForm'
import { StructuredDataView } from '@/shared/components/StructuredDataView'

export function EndpointQueryDialog({
  triggerLabel,
  title,
  description,
  fields = [],
  initialForm = {},
  query,
}: {
  triggerLabel: string
  title: string
  description: string
  fields?: CrudField[]
  initialForm?: Record<string, unknown>
  query: (form: Record<string, unknown>) => Promise<unknown>
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Record<string, unknown>>(initialForm)
  const [result, setResult] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const groups = groupFieldsBySection(fields)
  const wide = fields.length > 8 || groups.some(([section]) => section !== undefined)

  async function runQuery() {
    setLoading(true)
    setError('')
    try {
      setResult(await query(form))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Permintaan gagal diproses.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`flex max-h-[85vh] flex-col overflow-hidden ${wide ? 'sm:max-w-4xl' : 'sm:max-w-2xl'}`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 overflow-y-auto px-1 py-2 pr-3">
            {fields.length > 0 && <RecordFieldsForm fields={fields} form={form} setForm={setForm} />}
            {error && <p className="text-destructive text-sm">{error}</p>}
            {result !== undefined && <div className="rounded-md border p-4"><StructuredDataView data={result} /></div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Tutup</Button>
            <Button onClick={runQuery} disabled={loading}>{loading ? 'Memuat...' : 'Tampilkan'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
