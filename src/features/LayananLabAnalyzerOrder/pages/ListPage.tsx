import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLabAnalyzerVendorResource } from '../api'

const COLUMNS = ["id","visit_id","vendor_id","test_code","ordered_by","ordered_at","status","raw_result_text","verified_by","verified_at","visit","id","visit_number","status","vendor","id","vendor_name","created_at"] as const

export function LabAnalyzerVendorListPage() {
  const { list } = useLabAnalyzerVendorResource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">LabAnalyzerVendor</h1>
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
