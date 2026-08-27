import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useBaepInterventionProtocolResource } from '../api'

const COLUMNS = ["id","visit_id","performed_by","created_by","indication","stimulation_ear","click_rate_hz","stimulus_intensity_db","wave_i_latency_ms","wave_iii_latency_ms","wave_v_latency_ms","interpretation","status","performed_at","created_at"] as const

export function BaepInterventionProtocolListPage() {
  const { list } = useBaepInterventionProtocolResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">BaepInterventionProtocol</h1>
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
