import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const COLUMNS = ["id","date","description","source_type","source_id","lines","created_at"] as const

export function JournalEntryListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['/journal-entries', 'list'],
    queryFn: async () => {
      const res = await apiClient.get('/journal-entries')
      return normalizeList<Record<string, unknown>>(res.data)
    },
  })

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">JournalEntry (read-only)</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row, i) => (
            <TableRow key={(row as { id?: number }).id ?? i}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
