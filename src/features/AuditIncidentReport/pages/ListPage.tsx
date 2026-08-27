import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useIncidentReportResource } from '../api'

const COLUMNS = ["id","visit_id","patient_id","incident_category","description","occurred_at","reported_by","impact_score","probability_score","risk_grade","status","sla_due_at","created_at","updated_at","visit_number","patient_name","reported_by_name"] as const

export function IncidentReportListPage() {
  const { list } = useIncidentReportResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">IncidentReport</h1>
        <Button asChild>
          <Link to="/modul/audit-incident-report/tambah">Tambah</Link>
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
                  <Link to={`/modul/audit-incident-report/${row.id}/edit`} className="text-primary underline">Ubah</Link>
                  
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
