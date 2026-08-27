import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePatientResource } from '../api'

const COLUMNS = ["id","medical_record_number","name","nickname","title_prefix","title_suffix","birth_place","birth_date","gender_id","religion_id","address","rt","rw","postal_code","village_id","education_id","occupation_id","marital_status_id","blood_type_id","nationality_id","ethnicity_id","language_id","is_unidentified","registered_by","is_active","created_at","updated_at"] as const

export function PatientListPage() {
  const { list } = usePatientResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">Patient</h1>
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
