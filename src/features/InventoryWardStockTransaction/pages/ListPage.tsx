import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryWardStockTransactionEndpoint, useInventoryWardStockTransactionResource } from '../api'
import type { InventoryWardStockTransaction } from '../types'

const columns: ColumnDef<InventoryWardStockTransaction, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('type'),
    accessorKey: 'type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).type ?? '—'),
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'type', label: humanizeField('type'), required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  ward_id: null,
  item_id: null,
  type: '',
  quantity: '',
  performed_at: '',
  notes: '',
}

const actions: WorkflowAction<InventoryWardStockTransaction>[] = []

export function InventoryWardStockTransactionListPage() {
  const resource = useInventoryWardStockTransactionResource()
  const title = humanizeModuleName('InventoryWardStockTransaction')

  return (
    <WorkflowListPage<InventoryWardStockTransaction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryWardStockTransactionEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
