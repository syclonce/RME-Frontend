import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const COLUMNS = ["id","code","name","type","is_active","created_at"] as const

export function AccountListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['/accounts', 'list'],
    queryFn: async () => {
      const res = await apiClient.get('/accounts')
      return normalizeList<Record<string, unknown>>(res.data)
    },
  })

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">Account (read-only)</h1>
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
