import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSaleResource } from '../api'

const COLUMNS = ["id","sale_number","patient_id","sold_by","sold_at","total_amount","status","created_at"] as const

export function SaleListPage() {
  const { useList } = useSaleResource()
  const { data, isLoading } = useList()
  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Sale</h1>
        <Button asChild>
          <Link to="/modul/penjualan-sale/tambah">Tambah</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as unknown as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link to={`/modul/penjualan-sale/${row.id}/edit`} className="text-primary underline">Ubah</Link>
                  
                  
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
