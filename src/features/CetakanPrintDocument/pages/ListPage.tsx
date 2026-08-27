import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePrintDocumentResource } from '../api'

export function PrintDocumentListPage() {
  const { useList } = usePrintDocumentResource()
  const { data, isLoading } = useList()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Dokumen Cetak</h1>
        <Button asChild>
          <Link to="/modul/cetakan-print-document/tambah">Terbitkan Dokumen</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Dokumen</TableHead>
            <TableHead>Jenis</TableHead>
            <TableHead>Ref</TableHead>
            <TableHead>Diterbitkan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.document_number}</TableCell>
              <TableCell>
                <Badge variant="outline">{row.document_type}</Badge>
              </TableCell>
              <TableCell>
                {row.ref_type} #{row.ref_id}
              </TableCell>
              <TableCell>{row.issued_at ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
