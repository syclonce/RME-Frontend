import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useIntradialyticHdMonitoringResource } from '../api'

const COLUMNS = ["id","visit_id","patient_id","dialysis_hour","blood_pressure_systolic","blood_pressure_diastolic","blood_flow_rate","dialysate_flow_rate","ultrafiltration_rate","venous_pressure","transmembrane_pressure","symptoms","monitored_at","created_at","updated_at"] as const

export function IntradialyticHdMonitoringListPage() {
  const { list } = useIntradialyticHdMonitoringResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">IntradialyticHdMonitoring</h1>
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
