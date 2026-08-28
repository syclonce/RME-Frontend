import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useEffect, useState } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Textarea } from '@/components/ui/textarea'
import { DataTable } from '@/shared/components/DataTable'
import { RelationSelect } from '@/shared/components/RelationSelect'

/**
 * Windowed page list for <Pagination> — always shows page 1, the last page,
 * and a small range around the current page, collapsing gaps to 'ellipsis'.
 * Rendering every page as its own link (the naive approach) is unusable once
 * a module has hundreds of pages of data.
 */
function pageWindow(current: number, last: number): (number | 'ellipsis')[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)

  const pages = new Set<number>([1, last, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b)

  const result: (number | 'ellipsis')[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('ellipsis')
    result.push(sorted[i])
  }
  return result
}

export interface CrudField {
  key: string
  label: string
  type?: 'text' | 'number' | 'date' | 'textarea' | 'checkbox' | 'relation' | 'custom' | 'select'
  relationEndpoint?: string
  /** type: 'select' only — static enum options (not a server-backed relation). */
  options?: { value: string; label: string }[]
  required?: boolean
  /** Groups fields under a subheading inside the dialog — mirrors the Card-section pattern used on full-page forms. */
  section?: string
  /** For type: 'custom' — renders its own widget (e.g. a cascading region picker) instead of a generic input. */
  render?: (value: unknown, onChange: (v: unknown) => void) => React.ReactNode
  /** Greys out + disables the field when true — e.g. identity fields once a patient is marked "tidak dikenal". */
  disabledWhen?: (form: Record<string, unknown>) => boolean
  /**
   * checkbox only — extra side effect run alongside the normal value update,
   * so toggling one flag can also adjust OTHER fields (e.g. checking "tidak
   * dikenal" auto-fills `name` instead of leaving it blank-but-required).
   */
  onToggle?: (checked: boolean, form: Record<string, unknown>, setForm: (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => void) => void
}

/**
 * Shared dialog-based CRUD page — Tambah/Ubah open in a shadcn <Dialog> modal
 * (not a separate route+page), Hapus confirms via shadcn <AlertDialog> (not
 * the browser's native confirm()), and the list paginates via shadcn
 * <Pagination>. Replaces the old per-module ListPage+FormPage(+route) trio.
 * Every piece here is an UNMODIFIED shadcn primitive (Dialog/AlertDialog/
 * Pagination/Input/Checkbox/Textarea) — only the composition is custom.
 */
export function CrudDialogPage<T extends { id: number | string }>({
  title,
  description,
  columns,
  fields,
  emptyForm,
  itemLabel,
  resource,
  renderExtra,
}: {
  title: string
  description: string
  columns: ColumnDef<T, unknown>[]
  fields: CrudField[]
  emptyForm: Record<string, unknown>
  itemLabel: (item: T) => string
  /** Extra content rendered below the field sections — e.g. nested Kontak/Keluarga lists that only make sense once a record already has an id (edit mode). */
  renderExtra?: (editing: T | null) => React.ReactNode
  resource: {
    useList: (params?: Record<string, unknown>) => {
      data?: { items: T[]; currentPage: number; lastPage: number }
      isLoading: boolean
    }
    create: { mutateAsync: (payload: Record<string, unknown>) => Promise<unknown>; isPending: boolean }
    update: {
      mutateAsync: (args: { id: T['id']; payload: Record<string, unknown> }) => Promise<unknown>
      isPending: boolean
    }
    remove: { mutate: (id: T['id']) => void }
  }
}) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = resource.useList({ page })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)

  useEffect(() => {
    if (!dialogOpen) return
    if (editing) {
      const next: Record<string, unknown> = { ...emptyForm }
      for (const f of fields) next[f.key] = (editing as unknown as Record<string, unknown>)[f.key] ?? next[f.key]
      setForm(next)
    } else {
      setForm(emptyForm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen, editing])

  function openAdd() {
    setEditing(null)
    setDialogOpen(true)
  }

  function openEdit(item: T) {
    setEditing(item)
    setDialogOpen(true)
  }

  async function handleSubmit() {
    if (editing) {
      await resource.update.mutateAsync({ id: editing.id, payload: form })
    } else {
      await resource.create.mutateAsync(form)
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    resource.remove.mutate(deleteTarget.id)
    setDeleteTarget(null)
  }

  const actionColumn: ColumnDef<T, unknown> = {
    header: 'Aksi',
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <button type="button" className="text-primary text-sm hover:underline" onClick={() => openEdit(row.original)}>
          Ubah
        </button>
        <button
          type="button"
          className="text-destructive text-sm hover:underline"
          onClick={() => setDeleteTarget(row.original)}
        >
          Hapus
        </button>
      </div>
    ),
  }

  const submitting = resource.create.isPending || resource.update.isPending

  // Group fields by their (optional) `section` while preserving first-seen order,
  // so plain flat field lists (no section set) render exactly as before.
  const sectionGroups: [string | undefined, CrudField[]][] = []
  for (const f of fields) {
    const last = sectionGroups[sectionGroups.length - 1]
    if (last && last[0] === f.section) last[1].push(f)
    else sectionGroups.push([f.section, [f]])
  }
  // Small reference-data modules (a handful of fields) get a compact dialog;
  // heavy modules (sectioned, or just many fields) get the wide one — a 2-3
  // field module in a max-w-4xl dialog looks as awkward as 21 fields did in
  // max-w-xl before this was made conditional.
  const isWide = fields.length > 8 || sectionGroups.some(([section]) => section !== undefined)

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <Button onClick={openAdd}>Tambah {title}</Button>
      </div>

      <DataTable columns={[...columns, actionColumn]} data={data?.items ?? []} loading={isLoading} />

      {data && data.lastPage > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                onClick={() => page > 1 && setPage(page - 1)}
              />
            </PaginationItem>
            {pageWindow(page, data.lastPage).map((p, i) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink isActive={p === page} onClick={() => setPage(p)} className="cursor-pointer">
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                className={page >= data.lastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                onClick={() => page < data.lastPage && setPage(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={`flex max-h-[85vh] flex-col overflow-hidden ${isWide ? 'sm:max-w-4xl' : 'sm:max-w-xl'}`}>
          <DialogHeader>
            <DialogTitle>{editing ? `Ubah ${title}` : `Tambah ${title}`}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
            {sectionGroups.map(([section, sectionFields]) => (
              <Fragment key={section ?? '__default'}>
                {section && <h3 className="text-sm font-semibold text-foreground">{section}</h3>}
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  {sectionFields.map((f) => {
                    const disabled = f.disabledWhen?.(form) ?? false
                    return (
                      <div
                        key={f.key}
                        className={`flex flex-col gap-1.5 ${f.type === 'textarea' || f.type === 'custom' ? 'sm:col-span-2' : ''}`}
                      >
                        {f.type !== 'checkbox' && <Label htmlFor={f.key}>{f.label}</Label>}
                        {f.type === 'checkbox' ? (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={f.key}
                              checked={Boolean(form[f.key])}
                              onCheckedChange={(v) => {
                                const checked = Boolean(v)
                                setForm((prev) => ({ ...prev, [f.key]: checked }))
                                f.onToggle?.(checked, form, setForm)
                              }}
                            />
                            <Label htmlFor={f.key}>{f.label}</Label>
                          </div>
                        ) : f.type === 'textarea' ? (
                          <Textarea
                            id={f.key}
                            disabled={disabled}
                            value={(form[f.key] as string) ?? ''}
                            onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                          />
                        ) : f.type === 'relation' && f.relationEndpoint ? (
                          <RelationSelect
                            endpoint={f.relationEndpoint}
                            value={(form[f.key] as number) ?? null}
                            onChange={(v) => setForm((prev) => ({ ...prev, [f.key]: v }))}
                            disabled={disabled}
                          />
                        ) : f.type === 'custom' && f.render ? (
                          f.render(form[f.key], (v) => setForm((prev) => ({ ...prev, [f.key]: v })))
                        ) : f.type === 'select' ? (
                          <Select
                            value={(form[f.key] as string) ?? ''}
                            onValueChange={(v) => setForm((prev) => ({ ...prev, [f.key]: v }))}
                            disabled={disabled}
                          >
                            <SelectTrigger className="w-full">
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
                            id={f.key}
                            type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                            value={(form[f.key] as string | number) ?? ''}
                            required={f.required && !disabled}
                            disabled={disabled}
                            onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </Fragment>
            ))}

            {renderExtra?.(editing)}
          </div>

          <DialogFooter className="bg-transparent pt-3">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? `"${itemLabel(deleteTarget)}" akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.` : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
