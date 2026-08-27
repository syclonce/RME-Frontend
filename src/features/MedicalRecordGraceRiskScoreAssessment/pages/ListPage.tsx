import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGraceRiskScoreAssessmentResource } from '../api'

const COLUMNS = ["id","visit_id","age","heart_rate","systolic_bp","creatinine_mg_dl","cardiac_arrest_at_admission","st_segment_deviation","elevated_cardiac_enzymes","killip_class","total_score","risk_category","assessed_at","created_at","updated_at"] as const

export function GraceRiskScoreAssessmentListPage() {
  const { useList, remove } = useGraceRiskScoreAssessmentResource()
  const { data, isLoading } = useList()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">GraceRiskScoreAssessment</h1>
        <Button asChild>
          <Link to="/modul/medical-record-grace-risk-score-assessment/tambah">Tambah</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as unknown as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link to={`/modul/medical-record-grace-risk-score-assessment/${row.id}/edit`} className="text-primary underline">Ubah</Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('Hapus data ini?')) remove.mutate(row.id)
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
