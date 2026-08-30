import type { ColumnDef } from '@tanstack/react-table'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { WorkflowListPage, type CrudField, type WorkflowAction } from '@/shared/components/WorkflowListPage'
import { SterilizedItemEndpoint, useSterilizedItemResource } from '../api'
import type { SterilizedItem } from '../types'

const columns: ColumnDef<SterilizedItem, unknown>[] = [
  { header: 'Siklus', cell: ({ row }) => <RelationLabel endpoint="/sterilization-cycles" id={row.original.cycle_id} /> },
  { header: 'Nama Item', accessorKey: 'item_name' }, { header: 'Jumlah', accessorKey: 'quantity' },
  { header: 'Kedaluwarsa', accessorKey: 'expiry_date' },
]
const fields: CrudField[] = [
  { key: 'cycle_id', label: 'Siklus Sterilisasi', type: 'relation', relationEndpoint: '/sterilization-cycles', required: true },
  { key: 'item_name', label: 'Nama Item', required: true }, { key: 'quantity', label: 'Jumlah', type: 'number', required: true },
]
const actions: WorkflowAction<SterilizedItem>[] = [{
  key: 'check-expiry', label: 'Cek Kedaluwarsa', method: 'get', path: (item) => `/sterilized-items/${item.id}/check-expiry`, resultTitle: 'Status Kedaluwarsa Item',
}]

export function SterilizedItemListPage() {
  const resource = useSterilizedItemResource()
  return <WorkflowListPage<SterilizedItem>
    title="Item Hasil Sterilisasi" description="Kelola item hasil siklus dan periksa masa berlakunya."
    endpoint={SterilizedItemEndpoint} columns={columns} capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
    fields={fields} emptyForm={{ cycle_id: null, item_name: '', quantity: '' }} itemLabel={(item) => item.item_name} actions={actions} resource={resource}
  />
}
