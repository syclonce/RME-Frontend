import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useBedQueueResource } from '../api'

const COLUMNS = ["id","bed_id","patient_id","queue_number","status","created_at"] as const

export function BedQueueListPage() {
  const { useList } = useBedQueueResource()
  const { data, isLoading } = useList()
  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">BedQueue</h1>
        <Button asChild>
          <Link to="/modul/pendaftaran-bed-queue/tambah">Tambah</Link>
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
                  <Link to={`/modul/pendaftaran-bed-queue/${row.id}/edit`} className="text-primary underline">Ubah</Link>
                  
                  
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
