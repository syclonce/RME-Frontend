import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGraceRiskScoreAssessmentResource } from '../api'

const COLUMNS = ["id","visit_id","age","heart_rate","systolic_bp","creatinine_mg_dl","cardiac_arrest_at_admission","st_segment_deviation","elevated_cardiac_enzymes","killip_class","total_score","risk_category","assessed_at","created_at","updated_at"] as const

export function GraceRiskScoreAssessmentListPage() {
  const { list } = useGraceRiskScoreAssessmentResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">GraceRiskScoreAssessment</h1>
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
