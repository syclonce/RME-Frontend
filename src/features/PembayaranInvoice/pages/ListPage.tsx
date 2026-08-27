import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useInvoiceResource } from '../api'

export function InvoiceListPage() {
  const { useList, lock, unlock } = useInvoiceResource()
  const { data, isLoading } = useList()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Tagihan (Invoice)</h1>
        <Button asChild>
          <Link to="/modul/pembayaran-invoice/tambah">Tambah</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Invoice</TableHead>
            <TableHead>Visit</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Kunci</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.invoice_number ?? `#${row.id}`}</TableCell>
              <TableCell>{row.visit_id}</TableCell>
              <TableCell>{row.invoice_date ?? '-'}</TableCell>
              <TableCell>{row.total_amount}</TableCell>
              <TableCell>
                <Badge variant="outline">{row.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={row.is_locked ? 'default' : 'secondary'}>
                  {row.is_locked ? 'Terkunci' : 'Terbuka'}
                </Badge>
              </TableCell>
              <TableCell>
                {row.is_locked ? (
                  <Button type="button" variant="ghost" size="sm" onClick={() => unlock.mutate(row.id)}>
                    Buka Kunci
                  </Button>
                ) : (
                  <Button type="button" variant="ghost" size="sm" onClick={() => lock.mutate(row.id)}>
                    Kunci
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
