import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiClient } from '@/api/client'
import { useQueryClient } from '@tanstack/react-query'
import { useMedicineDeliveryResource } from '../api'

const COLUMNS = ["id","pharmacy_dispense_id","patient_address","courier_employee_id","status","requested_at","delivered_at","created_at"] as const

const WF_ACTIONS = [{"label":"Assign Courier","verb":"post","prefix":"medicine-deliveries","action":"assign-courier"},{"label":"Mark Delivered","verb":"post","prefix":"medicine-deliveries","action":"mark-delivered"}] as const

export function MedicineDeliveryListPage() {
  const { useList, remove } = useMedicineDeliveryResource()
  const { data, isLoading } = useList()
  const queryClient = useQueryClient()
  const [wfLoading, setWfLoading] = useState<string | null>(null)

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  const handleWorkflow = async (wf: typeof WF_ACTIONS[number], id: number) => {
    setWfLoading(wf.label)
    try {
      await apiClient({ method: wf.verb, url: `/${wf.prefix}/${id}/${wf.action}` })
      queryClient.invalidateQueries({ queryKey: ['/medicine-deliveries'] })
    } finally {
      setWfLoading(null)
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">MedicineDelivery</h1>
        <Button asChild>
          <Link to="/modul/layanan-medicine-delivery/tambah">Tambah</Link>
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
                  <Link to={`/modul/layanan-medicine-delivery/${row.id}/edit`} className="text-primary underline">Ubah</Link>
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
                    disabled={wfLoading === 'Assign Courier'}
                    onClick={() => handleWorkflow(WF_ACTIONS[0], row.id)}
                  >
                    Assign Courier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={wfLoading === 'Mark Delivered'}
                    onClick={() => handleWorkflow(WF_ACTIONS[1], row.id)}
                  >
                    Mark Delivered
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
