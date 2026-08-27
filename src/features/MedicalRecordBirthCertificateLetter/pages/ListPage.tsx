import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useBirthCertificateLetterResource } from '../api'

const COLUMNS = ["id","letter_number","patient_id","mother_patient_id","visit_id","doctor_id","issue_date","child_name","birth_date_time","birth_weight_grams","birth_length_cm","gender","remarks","created_by","created_at","updated_at"] as const

export function BirthCertificateLetterListPage() {
  const { list } = useBirthCertificateLetterResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">BirthCertificateLetter</h1>
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
