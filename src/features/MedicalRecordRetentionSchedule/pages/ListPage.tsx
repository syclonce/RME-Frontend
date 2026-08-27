import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const COLUMNS = ["id","registration_id","patient_id","basis_date","retention_years","retention_due_at","status","marked_by","marked_at","notes","created_at"] as const

export function RetentionScheduleListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['/retention-schedules', 'list'],
    queryFn: async () => {
      const res = await apiClient.get('/retention-schedules')
      return normalizeList<Record<string, unknown>>(res.data)
    },
  })

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">RetentionSchedule (read-only)</h1>
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
