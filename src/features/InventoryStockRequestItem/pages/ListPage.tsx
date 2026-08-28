import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryStockRequestItemEndpoint, useInventoryStockRequestItemResource } from '../api'
import type { InventoryStockRequestItem } from '../types'

const columns: ColumnDef<InventoryStockRequestItem, unknown>[] = [
  {
    header: humanizeField('stock_request_id'),
    cell: ({ row }) => <RelationLabel endpoint="/stock-requests" id={(row.original as unknown as Record<string, unknown>).stock_request_id as number | null} />,
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
]

const fields: CrudField[] = [
  { key: 'stock_request_id', label: humanizeField('stock_request_id'), type: 'relation', relationEndpoint: '/stock-requests', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
]

const emptyForm = {
  stock_request_id: null,
  item_id: null,
  quantity: '',
}

const actions: WorkflowAction<InventoryStockRequestItem>[] = []

export function InventoryStockRequestItemListPage() {
  const resource = useInventoryStockRequestItemResource()
  const title = humanizeModuleName('InventoryStockRequestItem')

  return (
    <WorkflowListPage<InventoryStockRequestItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryStockRequestItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
