import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRegistrationResource } from '../api'

const COLUMNS = ["id","registration_number","patient_id","registered_at","admission_diagnosis_id","referral_id","package_id","is_emergency","has_fall_risk","newborn_weight_grams","newborn_length_cm","birth_time","found_location","found_at","satu_sehat_consent","registered_by","status","created_at","updated_at"] as const

export function RegistrationListPage() {
  const { list } = useRegistrationResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">Registration</h1>
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
