import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAntimicrobialStewardshipGeneralExaminationResource } from '../api'

const COLUMNS = ["id","antimicrobial_stewardship_form_id","temperature","pulse","respiration_rate","blood_pressure","weight_kg","height_cm","examined_at","created_at"] as const

export function AntimicrobialStewardshipGeneralExaminationListPage() {
  const { useList } = useAntimicrobialStewardshipGeneralExaminationResource()
  const { data, isLoading } = useList()
  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">AntimicrobialStewardshipGeneralExamination</h1>
        <Button asChild>
          <Link to="/modul/layanan-antimicrobial-stewardship-general-examination/tambah">Tambah</Link>
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
