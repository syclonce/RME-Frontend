import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface NestedField {
  key: string
  label: string
  type?: 'text' | 'select'
  options?: { value: string; label: string }[]
}

/**
 * Compact inline child-record list for use INSIDE a parent's edit dialog —
 * e.g. Kontak/Keluarga nested under Pasien. Only makes sense once the parent
 * already has an id (server needs `${parentIdField}` to store a child row),
 * so callers only render this in edit mode, never while adding the parent.
 */
export function InlineNestedList<T extends { id: number | string }>({
  title,
  parentIdField,
  parentId,
  fields,
  itemLabel,
  resource,
}: {
  title: string
  parentIdField: string
  parentId: number
  fields: NestedField[]
  itemLabel: (item: T) => string
  resource: {
    useList: (params?: Record<string, unknown>) => { data?: { items: T[] }; isLoading: boolean }
    create: { mutateAsync: (payload: Record<string, unknown>) => Promise<unknown>; isPending: boolean }
    remove: { mutate: (id: T['id']) => void }
  }
}) {
  const emptyRow = Object.fromEntries(fields.map((f) => [f.key, '']))
  const [row, setRow] = useState<Record<string, unknown>>(emptyRow)
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)

  const { data, isLoading } = resource.useList({ [parentIdField]: parentId })

  async function handleAdd() {
    await resource.create.mutateAsync({ [parentIdField]: parentId, ...row })
    setRow(emptyRow)
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-3">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>

      {isLoading ? (
        <p className="text-muted-foreground text-xs">Memuat...</p>
      ) : data && data.items.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {data.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between rounded-md border px-2.5 py-1.5 text-sm">
              <span>{itemLabel(item)}</span>
              <button
                type="button"
                className="text-destructive text-xs hover:underline"
                onClick={() => setDeleteTarget(item)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-xs">Belum ada data.</p>
      )}

      <div className="flex flex-wrap items-end gap-2">
        {fields.map((f) => (
          <div key={f.key} className="flex min-w-32 flex-1 flex-col gap-1">
            <label className="text-muted-foreground text-xs">{f.label}</label>
            {f.type === 'select' ? (
              <Select value={(row[f.key] as string) ?? ''} onValueChange={(v) => setRow((prev) => ({ ...prev, [f.key]: v }))}>
                <SelectTrigger className="w-full" size="sm">
                  <SelectValue placeholder="Pilih..." />
                </SelectTrigger>
                <SelectContent>
                  {f.options?.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={(row[f.key] as string) ?? ''}
                onChange={(e) => setRow((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <Button type="button" size="sm" variant="outline" disabled={resource.create.isPending} onClick={handleAdd}>
          Tambah
        </Button>
      </div>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? `"${itemLabel(deleteTarget)}" akan dihapus permanen.` : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                if (deleteTarget) resource.remove.mutate(deleteTarget.id)
                setDeleteTarget(null)
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
