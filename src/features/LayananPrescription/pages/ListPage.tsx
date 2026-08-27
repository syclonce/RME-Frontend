import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePrescriptionResource } from '../api'

const COLUMNS = ["id","prescription_number","visit_id","diagnosis_id","prescribed_by","prescribed_at","weight_kg","height_cm","has_drug_allergy","is_pregnant","is_breastfeeding","is_discharge_prescription","is_emergency","notes","status","items","id","drug_name","dosage","frequency","route","duration","quantity","created_at"] as const

export function PrescriptionListPage() {
  const { list } = usePrescriptionResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">Prescription</h1>
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
