import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useModifiedBarthelIndexAssessmentResource } from '../api'

const COLUMNS = ["id","visit_id","feeding","bathing","personal_hygiene","dressing","bowel_control","bladder_control","toilet_use","chair_bed_transfer","ambulation","stairs","total_score","interpretation","assessed_at","created_at","updated_at"] as const

export function ModifiedBarthelIndexAssessmentListPage() {
  const { list } = useModifiedBarthelIndexAssessmentResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">ModifiedBarthelIndexAssessment</h1>
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
