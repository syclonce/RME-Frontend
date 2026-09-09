import type { ColumnDef } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ActiveVisitBanner } from '@/shared/components/ActiveVisitBanner'
import { useActiveVisit } from '@/shared/hooks/useActiveVisit'
import { notifyApiError } from '@/shared/lib/apiError'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { DataTable } from '@/shared/components/DataTable'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { RecordFieldsForm, groupFieldsBySection, type CrudField } from '@/shared/components/RecordFieldsForm'
import { StructuredDataView } from '@/shared/components/StructuredDataView'

export type { CrudField }

/**
 * A workflow action button on a row — either a real backend status-transition
 * verb (e.g. POST /beds/{id}/reserve) or, when `fields` is set, an action that
 * needs a small payload first (e.g. POST /medicine-deliveries/{id}/assign-courier
 * needs courier_employee_id) so it opens a field dialog instead of a bare
 * confirm. Every action is confirmed before firing — these are backend state
 * transitions, often as consequential as a delete.
 */
export interface WorkflowAction<T> {
  key: string
  label: string
  method: 'get' | 'post' | 'patch' | 'put'
  /** Builds the action URL from the row's id, e.g. (id) => `/beds/${id}/reserve`. */
  path: (item: T) => string
  /** When set, the action opens a small Dialog collecting these fields as the request body instead of firing an empty-body POST. */
  fields?: CrudField[]
  emptyForm?: Record<string, unknown>
  loadInitialForm?: (item: T) => Promise<Record<string, unknown>>
  payload?: Record<string, unknown>
  resultTitle?: string
  /** Only shown for rows where this returns true — e.g. hide "Selesaikan" once status is already 'selesai'. Omit to always show. */
  visibleWhen?: (item: T) => boolean
  variant?: 'default' | 'destructive'
  confirmDescription?: (item: T, label: (i: T) => string) => string
}

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

/**
 * Shared list page for modules that are NOT plain CRUD — they have real
 * backend workflow verbs (status transitions / explicit actions beyond
 * store+update+destroy) and/or are missing update/destroy entirely
 * (append-only clinical records, audit trails that must never be edited or
 * deleted). CrudDialogPage assumes Tambah/Ubah/Hapus ALWAYS exist; this
 * component only ever renders the buttons the module's real backend routes
 * actually support, plus one confirm-gated button per real workflow verb —
 * never a button that would just 404/405.
 */
export function WorkflowListPage<T extends { id: number | string }>({
  title,
  description,
  endpoint,
  columns,
  capabilities,
  fields,
  emptyForm,
  itemLabel,
  actions = [],
  resource,
  headerActions,
  createLabel,
}: {
  title: string
  description: string
  /** Base REST endpoint, e.g. '/lab-orders' — used to invalidate the list query after a workflow action fires. */
  endpoint: string
  columns: ColumnDef<T, unknown>[]
  capabilities: {
    canCreate: boolean
    canUpdate: boolean
    canDestroy: boolean
    canUpdateWhen?: (item: T) => boolean
    canDestroyWhen?: (item: T) => boolean
  }
  /** Fields for the Tambah/Ubah dialog — used only when capabilities.canCreate / canUpdate is true. */
  fields: CrudField[]
  emptyForm: Record<string, unknown>
  itemLabel: (item: T) => string
  actions?: WorkflowAction<T>[]
  headerActions?: React.ReactNode
  createLabel?: string
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
    // `mutateAsync` (bukan `mutate`) dipakai supaya penghapusan bisa di-`await`
    // dalam try/catch — TanStack Query menyediakan keduanya dari hook yang sama,
    // jadi ini tidak mengubah kontrak untuk pemanggil yang sudah ada.
    remove: { mutateAsync: (id: T['id']) => Promise<unknown> }
  }
}) {
  const queryClient = useQueryClient()
  const { visitId: activeVisitId } = useActiveVisit()
  const [page, setPage] = useState(1)

  /**
   * Isi otomatis `visit_id` saat modul dibuka dari workspace Pelayanan Pasien.
   *
   * Tanpa ini petugas harus mengetik nomor kunjungan manual — nomor yang tidak
   * dihafal siapa pun, sehingga rawan tertukar antar pasien. Hanya berlaku bila
   * modul memang punya field `visit_id`, dan tidak menimpa nilai yang sudah ada.
   */
  function withVisitContext(base: Record<string, unknown>): Record<string, unknown> {
    if (activeVisitId === null) return base
    if (!fields.some((f) => f.key === 'visit_id')) return base
    if (base.visit_id !== undefined && base.visit_id !== null && base.visit_id !== '') return base
    return { ...base, visit_id: activeVisitId }
  }
  // Daftar ikut disaring ke kunjungan aktif. Tanpa ini modul klinis yang dibuka
  // dari workspace menampilkan catatan SELURUH pasien, dan petugas harus mencari
  // sendiri milik pasien yang sedang dilayani — sumber salah-baca yang nyata.
  //
  // Hanya dikirim bila modul memang mengenal `visit_id`; backend yang tidak
  // memakainya akan mengabaikan parameter ini, tetapi mengirimkannya tetap
  // menyesatkan saat menelusuri permintaan.
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search)

  const listParams = useMemo(() => {
    const base: Record<string, unknown> = { page }
    // Backend menerima `?name=` — kontrak yang sama dipakai AsyncCombobox.
    if (debouncedSearch.trim() !== '') base.name = debouncedSearch.trim()
    if (activeVisitId !== null && fields.some((f) => f.key === 'visit_id')) {
      base.visit_id = activeVisitId
    }
    return base
  }, [page, activeVisitId, fields, debouncedSearch])

  const { data, isLoading } = resource.useList(listParams)


  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)
  const [detailTarget, setDetailTarget] = useState<T | null>(null)

  // Active workflow action: which action + which row it's being confirmed/filled-in for.
  const [activeAction, setActiveAction] = useState<{ action: WorkflowAction<T>; item: T } | null>(null)
  const [actionForm, setActionForm] = useState<Record<string, unknown>>({})
  const [actionFormLoading, setActionFormLoading] = useState(false)
  const [actionResult, setActionResult] = useState<{ title: string; data: unknown } | null>(null)

  const actionMutation = useMutation({
    mutationFn: async ({ action, item, payload }: { action: WorkflowAction<T>; item: T; payload: Record<string, unknown> }) => {
      const url = action.path(item)
      if (action.method === 'get') return apiClient.get(url, { params: payload })
      if (action.method === 'post') return apiClient.post(url, payload)
      if (action.method === 'patch') return apiClient.patch(url, payload)
      return apiClient.put(url, payload)
    },
  })

  function openAdd() {
    setEditing(null)
    setForm(withVisitContext(emptyForm))
    setDialogOpen(true)
  }

  function openEdit(item: T) {
    setEditing(item)
    const next: Record<string, unknown> = { ...emptyForm }
    for (const f of fields) next[f.key] = (item as unknown as Record<string, unknown>)[f.key] ?? next[f.key]
    setForm(next)
    setDialogOpen(true)
  }

  async function handleSubmit() {
    // Dialog TIDAK ditutup saat gagal — kalau ditutup, isian yang sudah
    // dipenuhi petugas (bisa panjang, form section-banyak) hilang begitu saja
    // dan mereka harus mengetik ulang dari nol tanpa tahu kenapa gagal.
    try {
      if (editing) {
        await resource.update.mutateAsync({ id: editing.id, payload: form })
      } else {
        await resource.create.mutateAsync(form)
      }
      setDialogOpen(false)
    } catch (error) {
      notifyApiError(error)
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    // Hapus dulu baru tutup dialog agar target masih ada untuk toast galat
    // (mis. 403 "tidak ada akses") bila backend menolak.
    try {
      await resource.remove.mutateAsync(deleteTarget.id)
      setDeleteTarget(null)
    } catch (error) {
      notifyApiError(error)
    }
  }

  async function openAction(action: WorkflowAction<T>, item: T) {
    if (action.method === 'get' && (!action.fields || action.fields.length === 0)) {
      try {
        const response = await actionMutation.mutateAsync({ action, item, payload: action.payload ?? {} })
        setActionResult({ title: action.resultTitle ?? action.label, data: response.data })
      } catch (error) {
        notifyApiError(error)
      }
      return
    }
    if (action.fields && action.fields.length > 0) {
      setActionFormLoading(true)
      try {
        setActionForm(action.loadInitialForm ? await action.loadInitialForm(item) : (action.emptyForm ?? {}))
      } catch (error) {
        // Gagal memuat nilai awal form tidak boleh membiarkan dialog terbuka
        // dengan form kosong tanpa penjelasan — batalkan aksi dan beri tahu.
        notifyApiError(error)
        setActionFormLoading(false)
        return
      } finally {
        setActionFormLoading(false)
      }
    }
    setActiveAction({ action, item })
  }

  async function confirmAction() {
    if (!activeAction) return
    const { action, item } = activeAction
    const payload = { ...(action.payload ?? {}), ...(action.fields ? actionForm : {}) }
    // Dialog aksi (konfirmasi/isian) TIDAK ditutup bila gagal, dengan alasan
    // sama seperti handleSubmit: payload yang sudah diisi jangan hilang, dan
    // petugas perlu tahu kenapa aksi backend ditolak sebelum mencoba lagi.
    try {
      const response = await actionMutation.mutateAsync({ action, item, payload })
      setActiveAction(null)
      if (action.method === 'get') {
        setActionResult({ title: action.resultTitle ?? action.label, data: response.data })
      } else {
        await queryClient.invalidateQueries({ queryKey: [endpoint] })
      }
    } catch (error) {
      notifyApiError(error)
    }
  }

  const hasRowActions = capabilities.canUpdate || capabilities.canDestroy || actions.length > 0
  const actionColumn: ColumnDef<T, unknown> | null = hasRowActions
    ? {
        header: 'Aksi',
        id: 'actions',
        cell: ({ row }) => {
          const item = row.original
          const rowActions = actions.filter((a) => a.visibleWhen?.(item) ?? true)
          return (
            <div className="flex flex-wrap items-center gap-3">
              {capabilities.canUpdate && (capabilities.canUpdateWhen?.(item) ?? true) && (
                <button type="button" className="text-primary text-sm hover:underline" onClick={() => openEdit(item)}>
                  Ubah
                </button>
              )}
              {rowActions.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  className={`text-sm hover:underline ${a.variant === 'destructive' ? 'text-destructive' : 'text-primary'}`}
                  onClick={() => void openAction(a, item)}
                >
                  {a.label}
                </button>
              ))}
              {capabilities.canDestroy && (capabilities.canDestroyWhen?.(item) ?? true) && (
                <button
                  type="button"
                  className="text-destructive text-sm hover:underline"
                  onClick={() => setDeleteTarget(item)}
                >
                  Hapus
                </button>
              )}
              {!capabilities.canUpdate && (
                <button type="button" className="text-muted-foreground text-sm hover:underline" onClick={() => setDetailTarget(item)}>
                  Lihat
                </button>
              )}
            </div>
          )
        },
      }
    : null

  const submitting = resource.create.isPending || resource.update.isPending
  const sectionGroups = groupFieldsBySection(fields)
  const isWide = fields.length > 8 || sectionGroups.some(([section]) => section !== undefined)

  const actionSectionGroups = activeAction?.action.fields ? groupFieldsBySection(activeAction.action.fields) : []
  const actionIsWide = (activeAction?.action.fields?.length ?? 0) > 8 || actionSectionGroups.some(([section]) => section !== undefined)

  return (
    <div className="flex flex-col gap-4 p-6">
      <ActiveVisitBanner />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {headerActions}
          {capabilities.canCreate && <Button onClick={openAdd}>{createLabel ?? `Tambah ${title}`}</Button>}
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            // Reset halaman di sini, bukan di useEffect: hasil pencarian baru
            // hampir pasti punya jumlah halaman berbeda, dan bertahan di
            // halaman 7 menampilkan daftar kosong yang tampak seperti
            // "tidak ada hasil".
            setPage(1)
          }}
          placeholder={`Cari ${title.toLowerCase()}...`}
          className="pr-8 pl-8"
          aria-label={`Cari ${title.toLowerCase()}`}
        />
        {search !== '' && (
          <button
            type="button"
            onClick={() => { setSearch(''); setPage(1) }}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
            aria-label="Bersihkan pencarian"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <DataTable
        columns={actionColumn ? [...columns, actionColumn] : columns}
        data={data?.items ?? []}
        loading={isLoading}
        emptyMessage={
          debouncedSearch.trim() !== ''
            ? `Tidak ada hasil untuk "${debouncedSearch.trim()}".`
            : undefined
        }
        onClearSearch={
          debouncedSearch.trim() !== '' ? () => { setSearch(''); setPage(1) } : undefined
        }
      />

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

      {(capabilities.canCreate || capabilities.canUpdate) && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className={`flex max-h-[85vh] flex-col overflow-hidden ${isWide ? 'sm:max-w-4xl' : 'sm:max-w-xl'}`}>
            <DialogHeader>
              <DialogTitle>{editing ? `Ubah ${title}` : `Tambah ${title}`}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5 overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
              <RecordFieldsForm fields={fields} form={form} setForm={setForm} />
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
      )}

      {capabilities.canDestroy && (
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
      )}

      {/* Read-only detail view — shown for rows without an Ubah button (append-only modules) so staff can still inspect a full record. */}
      <Dialog open={detailTarget !== null} onOpenChange={(open) => !open && setDetailTarget(null)}>
        <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail {title}</DialogTitle>
            <DialogDescription>{detailTarget ? itemLabel(detailTarget) : ''}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
            {detailTarget && (
              <RecordFieldsForm
                fields={fields}
                form={detailTarget as unknown as Record<string, unknown>}
                setForm={() => {}}
                readOnly
              />
            )}
          </div>
          <DialogFooter className="bg-transparent pt-3">
            <Button variant="outline" onClick={() => setDetailTarget(null)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Workflow action confirm/payload dialog — AlertDialog for a bare confirm (no fields needed), Dialog+RecordFieldsForm when the backend route needs a payload (e.g. assign-courier needs courier_employee_id). */}
      {activeAction?.action.fields && activeAction.action.fields.length > 0 ? (
        <Dialog open={activeAction !== null} onOpenChange={(open) => !open && setActiveAction(null)}>
          <DialogContent className={`flex max-h-[85vh] flex-col overflow-hidden ${actionIsWide ? 'sm:max-w-4xl' : 'sm:max-w-xl'}`}>
            <DialogHeader>
              <DialogTitle>{activeAction.action.label}</DialogTitle>
              <DialogDescription>{itemLabel(activeAction.item)}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
              {actionFormLoading ? <p className="text-muted-foreground text-sm">Memuat data saat ini...</p> : <RecordFieldsForm fields={activeAction.action.fields} form={actionForm} setForm={setActionForm} />}
            </div>
            <DialogFooter className="bg-transparent pt-3">
              <Button variant="outline" onClick={() => setActiveAction(null)}>
                Batal
              </Button>
              <Button onClick={confirmAction} disabled={actionMutation.isPending}>
                {actionMutation.isPending ? 'Memproses...' : 'Konfirmasi'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <AlertDialog open={activeAction !== null} onOpenChange={(open) => !open && setActiveAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{activeAction?.action.label}?</AlertDialogTitle>
              <AlertDialogDescription>
                {activeAction
                  ? (activeAction.action.confirmDescription?.(activeAction.item, itemLabel) ??
                    `"${itemLabel(activeAction.item)}" akan diproses. Tindakan ini akan langsung mengubah status di backend.`)
                  : ''}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmAction}
                className={activeAction?.action.variant === 'destructive' ? 'bg-destructive hover:bg-destructive/90' : ''}
              >
                Konfirmasi
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Dialog open={actionResult !== null} onOpenChange={(open) => !open && setActionResult(null)}>
        <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{actionResult?.title}</DialogTitle>
            <DialogDescription>Data terbaru dari sistem.</DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto py-2">{actionResult && <StructuredDataView data={actionResult.data} />}</div>
          <DialogFooter><Button variant="outline" onClick={() => setActionResult(null)}>Tutup</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
