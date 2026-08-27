import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiClient } from '@/api/client'
import { useQueryClient } from '@tanstack/react-query'
import { useLabAnalyzerVendorResource } from '../api'

const COLUMNS = ["id","visit_id","vendor_id","test_code","ordered_by","ordered_at","status","raw_result_text","verified_by","verified_at","visit","visit_number","vendor","vendor_name","created_at"] as const

const WF_ACTIONS = [{"label":"Send To Analyzer","verb":"post","prefix":"lab-analyzer-orders","action":"send-to-analyzer"},{"label":"Result","verb":"post","prefix":"lab-analyzer-orders","action":"result"},{"label":"Verify","verb":"post","prefix":"lab-analyzer-orders","action":"verify"}] as const

export function LabAnalyzerVendorListPage() {
  const { useList, remove } = useLabAnalyzerVendorResource()
  const { data, isLoading } = useList()
  const queryClient = useQueryClient()
  const [wfLoading, setWfLoading] = useState<string | null>(null)

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  const handleWorkflow = async (wf: typeof WF_ACTIONS[number], id: number) => {
    setWfLoading(wf.label)
    try {
      await apiClient({ method: wf.verb, url: `/${wf.prefix}/${id}/${wf.action}` })
      queryClient.invalidateQueries({ queryKey: ['/lab-analyzer-vendors'] })
    } finally {
      setWfLoading(null)
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">LabAnalyzerVendor</h1>
        <Button asChild>
          <Link to="/modul/layanan-lab-analyzer-order/tambah">Tambah</Link>
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
                  <Link to={`/modul/layanan-lab-analyzer-order/${row.id}/edit`} className="text-primary underline">Ubah</Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('Hapus data ini?')) remove.mutate(row.id)
                    }}
                  >
                    Hapus
                  </Button>
                                    <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={wfLoading === 'Send To Analyzer'}
                    onClick={() => handleWorkflow(WF_ACTIONS[0], row.id)}
                  >
                    Send To Analyzer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={wfLoading === 'Result'}
                    onClick={() => handleWorkflow(WF_ACTIONS[1], row.id)}
                  >
                    Result
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={wfLoading === 'Verify'}
                    onClick={() => handleWorkflow(WF_ACTIONS[2], row.id)}
                  >
                    Verify
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
