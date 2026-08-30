import type { ColumnDef } from '@tanstack/react-table'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { useLinenCycleResource } from '../api'
import type { LinenCycle } from '../types'

const columns: ColumnDef<LinenCycle, unknown>[] = [
  { header: 'Item Linen', cell: ({ row }) => <RelationLabel endpoint="/linen-items" id={row.original.linen_item_id} /> },
  { header: 'Status', accessorKey: 'status' }, { header: 'Dikirim', accessorKey: 'sent_at' },
  { header: 'Diterima', accessorKey: 'received_at' }, { header: 'Jumlah', accessorKey: 'quantity' },
]
const statuses = [
  { value: 'dikirim_londri', label: 'Dikirim ke Londri' }, { value: 'dicuci', label: 'Dicuci' },
  { value: 'kembali_bersih', label: 'Kembali Bersih' }, { value: 'rusak_hilang', label: 'Rusak/Hilang' },
]
const fields: CrudField[] = [
  { key: 'linen_item_id', label: 'Item Linen', type: 'relation', relationEndpoint: '/linen-items', required: true },
  { key: 'status', label: 'Status', type: 'select', options: statuses }, { key: 'sent_at', label: 'Waktu Dikirim', type: 'date' },
  { key: 'received_at', label: 'Waktu Diterima', type: 'date' }, { key: 'quantity', label: 'Jumlah', type: 'number' },
]

export function LinenCycleListPage() {
  const resource = useLinenCycleResource()
  return <CrudDialogPage<LinenCycle> title="Siklus Pencucian Linen" description="Lacak linen dari pengiriman hingga kembali bersih."
    columns={columns} fields={fields} emptyForm={{ linen_item_id: null, status: 'dikirim_londri', sent_at: '', received_at: '', quantity: 1 }}
    itemLabel={(item) => `Siklus #${item.id}`} resource={resource} />
}
