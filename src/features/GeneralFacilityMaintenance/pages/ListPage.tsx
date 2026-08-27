import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiClient } from '@/api/client'
import { useQueryClient } from '@tanstack/react-query'
import { useMaintenanceAssetResource } from '../api'

const COLUMNS = ["id","asset_code","asset_name","location","ward_id","status"] as const

const WF_ACTIONS = [{"label":"Assign","verb":"post","prefix":"work-orders","action":"assign"},{"label":"Complete","verb":"post","prefix":"work-orders","action":"complete"}] as const

export function MaintenanceAssetListPage() {
  const { useList, remove } = useMaintenanceAssetResource()
  const { data, isLoading } = useList()
  const queryClient = useQueryClient()
  const [wfLoading, setWfLoading] = useState<string | null>(null)

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  const handleWorkflow = async (wf: typeof WF_ACTIONS[number], id: number) => {
    setWfLoading(wf.label)
    try {
      await apiClient({ method: wf.verb, url: `/${wf.prefix}/${id}/${wf.action}` })
      queryClient.invalidateQueries({ queryKey: ['/maintenance-assets'] })
    } finally {
      setWfLoading(null)
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">MaintenanceAsset</h1>
        <Button asChild>
          <Link to="/modul/general-facility-maintenance/tambah">Tambah</Link>
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
                  <Link to={`/modul/general-facility-maintenance/${row.id}/edit`} className="text-primary underline">Ubah</Link>
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
                    disabled={wfLoading === 'Assign'}
                    onClick={() => handleWorkflow(WF_ACTIONS[0], row.id)}
                  >
                    Assign
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={wfLoading === 'Complete'}
                    onClick={() => handleWorkflow(WF_ACTIONS[1], row.id)}
                  >
                    Complete
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
