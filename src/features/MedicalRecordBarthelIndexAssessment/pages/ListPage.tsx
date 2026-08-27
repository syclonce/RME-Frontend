import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useBarthelIndexAssessmentResource } from '../api'

const COLUMNS = ["id","visit_id","feeding","bathing","grooming","dressing","bowel_control","bladder_control","toilet_use","transfers","mobility","stairs","total_score","interpretation","assessed_at","created_at","updated_at"] as const

export function BarthelIndexAssessmentListPage() {
  const { list } = useBarthelIndexAssessmentResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">BarthelIndexAssessment</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as unknown as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
