import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiClient } from '@/api/client'
import { useQueryClient } from '@tanstack/react-query'
import { useItemResource } from '../api'

const COLUMNS = ["id","code","name","category","unit","brand","is_generic","is_formulary","buy_price","sell_price","stock_quantity","is_active","created_at","updated_at"] as const

const WF_ACTIONS = [{"label":"Adjust Stock","verb":"post","prefix":"items","action":"adjust-stock"}] as const

export function ItemListPage() {
  const { useList, remove } = useItemResource()
  const { data, isLoading } = useList()
  const queryClient = useQueryClient()
  const [wfLoading, setWfLoading] = useState<string | null>(null)

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  const handleWorkflow = async (wf: typeof WF_ACTIONS[number], id: number) => {
    setWfLoading(wf.label)
    try {
      await apiClient({ method: wf.verb, url: `/${wf.prefix}/${id}/${wf.action}` })
      queryClient.invalidateQueries({ queryKey: ['/items'] })
    } finally {
      setWfLoading(null)
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Item</h1>
        <Button asChild>
          <Link to="/modul/inventory-item/tambah">Tambah</Link>
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
                  <Link to={`/modul/inventory-item/${row.id}/edit`} className="text-primary underline">Ubah</Link>
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
                    disabled={wfLoading === 'Adjust Stock'}
                    onClick={() => handleWorkflow(WF_ACTIONS[0], row.id)}
                  >
                    Adjust Stock
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
