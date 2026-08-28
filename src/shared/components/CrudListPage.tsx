import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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

/** Same windowed-page-list helper as CrudDialogPage — kept local to avoid a shared-state import cycle. */
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
 * Shared list page for modules whose form is too large for a dialog (many
 * fields, sectioned data) — Tambah/Ubah navigate to a dedicated route+page
 * (see FormPage.tsx pattern) instead of opening a modal. Hapus still confirms
 * via shadcn <AlertDialog>, list still paginates via shadcn <Pagination> —
 * same as CrudDialogPage, only the add/edit affordance differs.
 */
export function CrudListPage<T extends { id: number | string }>({
  title,
  description,
  columns,
  itemLabel,
  addPath,
  editPath,
  resource,
}: {
  title: string
  description: string
  columns: ColumnDef<T, unknown>[]
  itemLabel: (item: T) => string
  addPath: string
  editPath: (item: T) => string
  resource: {
    useList: (params?: Record<string, unknown>) => {
      data?: { items: T[]; currentPage: number; lastPage: number }
      isLoading: boolean
    }
    remove: { mutate: (id: T['id']) => void }
  }
}) {
  const [page, setPage] = useState(1)
  const { data, isLoading } = resource.useList({ page })
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)

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
        <Link to={editPath(row.original)} className="text-primary text-sm hover:underline">
          Ubah
        </Link>
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

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <Button asChild>
          <Link to={addPath}>Tambah {title}</Link>
        </Button>
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
