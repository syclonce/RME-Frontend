// codegen:preserve — alur penerbitan dan detail dokumen bukan CRUD generik.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StructuredDataView } from '@/shared/components/StructuredDataView'
import { usePrintDocumentResource } from '../api'

export function PrintDocumentListPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { useList, useDetail } = usePrintDocumentResource()
  const { data, isLoading } = useList()
  const detail = useDetail(selectedId)

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
            <TableHead className="text-right">Aksi</TableHead>
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
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => setSelectedId(row.id)}>Detail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={selectedId !== null} onOpenChange={(open) => { if (!open) setSelectedId(null) }}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Dokumen Cetak</DialogTitle>
            <DialogDescription>Data lengkap dan payload dokumen yang telah diterbitkan.</DialogDescription>
          </DialogHeader>
          {detail.isLoading ? <p className="text-muted-foreground text-sm">Memuat detail...</p> : null}
          {detail.isError ? <p className="text-destructive text-sm">Detail dokumen gagal dimuat.</p> : null}
          {detail.data ? <StructuredDataView data={detail.data} /> : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
