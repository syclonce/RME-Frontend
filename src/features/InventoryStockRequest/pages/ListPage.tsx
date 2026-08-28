import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryStockRequestEndpoint, useStockRequestResource } from '../api'
import type { StockRequest } from '../types'

const columns: ColumnDef<StockRequest, unknown>[] = [
  {
    header: humanizeField('request_number'),
    accessorKey: 'request_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).request_number ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
  {
    header: humanizeField('requested_by'),
    accessorKey: 'requested_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).requested_by ?? '—'),
  },
  {
    header: humanizeField('requested_at'),
    accessorKey: 'requested_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).requested_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'requested_at', label: humanizeField('requested_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  ward_id: null,
  item_id: null,
  quantity: '',
  requested_at: '',
  notes: '',
}

const actions: WorkflowAction<StockRequest>[] = []

export function StockRequestListPage() {
  const resource = useStockRequestResource()
  const title = humanizeModuleName('InventoryStockRequest')

  return (
    <WorkflowListPage<StockRequest>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryStockRequestEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
