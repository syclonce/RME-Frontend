import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSettingsResource } from '../api'

export function SettingListPage() {
  const { useList } = useSettingsResource()
  const { data, isLoading } = useList()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  const entries = Object.entries(data ?? {})

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Pengaturan Aplikasi (RS Settings)</h1>
        <Button asChild>
          <Link to="/modul/aplikasi-setting/tambah">Tambah Kunci</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kunci</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map(([key, entry]) => (
            <TableRow key={key}>
              <TableCell className="font-mono text-xs">{key}</TableCell>
              <TableCell>{typeof entry.value === 'object' ? JSON.stringify(entry.value) : String(entry.value)}</TableCell>
              <TableCell>
                <Badge variant="outline">{entry.type}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">{entry.description ?? '-'}</TableCell>
              <TableCell>
                <Link to={`/modul/aplikasi-setting/${encodeURIComponent(key)}/edit`} className="text-primary underline">
                  Ubah
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
