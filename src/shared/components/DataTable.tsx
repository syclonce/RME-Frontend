import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { Loader2, Inbox } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

/**
 * Shared list-table for every generated module page — replaces the old
 * pattern of each ListPage hand-rolling its own <Table> with raw DB column
 * names as headers. Uses the app's already-branded shadcn Table primitives
 * (teal token theme in index.css), so this inherits real styling for free.
 */
export function DataTable<TData>({
  columns,
  data,
  loading,
  emptyMessage = 'Belum ada data.',
  onClearSearch,
}: {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  loading?: boolean
  emptyMessage?: string
  /**
   * Diisi hanya bila kosongnya daftar disebabkan pencarian. Tanpa jalan
   * keluar di tempat, petugas yang salah ketik harus menebak bahwa kotak
   * pencarian di atas yang menyebabkan tabelnya kosong.
   */
  onClearSearch?: () => void
}) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xs">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground bg-muted/40 text-xs font-semibold tracking-wide uppercase"
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-12 text-center">
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-sm">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Memuat data...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-12 text-center">
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-sm">
                  <Inbox className="size-8" />
                  <span>{emptyMessage}</span>
                  {onClearSearch && (
                    <button
                      type="button"
                      onClick={onClearSearch}
                      className="text-primary text-sm hover:underline"
                    >
                      Bersihkan pencarian
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
