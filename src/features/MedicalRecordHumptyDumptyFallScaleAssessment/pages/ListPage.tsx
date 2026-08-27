import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useHumptyDumptyFallScaleAssessmentResource } from '../api'

const COLUMNS = ["id","visit_id","assessed_by","created_by","age_score","gender_score","diagnosis_score","cognitive_impairment_score","environmental_score","surgery_sedation_score","medication_score","total_score","risk_level","assessed_at","created_at"] as const

export function HumptyDumptyFallScaleAssessmentListPage() {
  const { list } = useHumptyDumptyFallScaleAssessmentResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">HumptyDumptyFallScaleAssessment</h1>
        <Button asChild>
          <Link to="/modul/medical-record-humpty-dumpty-fall-scale-assessment/tambah">Tambah</Link>
        </Button>
      </div>
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
