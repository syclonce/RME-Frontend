import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryReceivingItemEndpoint, useReceivingItemResource } from '../api'
import type { ReceivingItem } from '../types'

const columns: ColumnDef<ReceivingItem, unknown>[] = [
  {
    header: humanizeField('receiving_record_id'),
    cell: ({ row }) => <RelationLabel endpoint="/receiving-records" id={(row.original as unknown as Record<string, unknown>).receiving_record_id as number | null} />,
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
    header: humanizeField('unit_price'),
    accessorKey: 'unit_price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit_price ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'receiving_record_id', label: humanizeField('receiving_record_id'), type: 'relation', relationEndpoint: '/receiving-records', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit_price', label: humanizeField('unit_price'), type: 'number' },
]

const emptyForm = {
  receiving_record_id: null,
  item_id: null,
  quantity: '',
  unit_price: '',
}

const actions: WorkflowAction<ReceivingItem>[] = []

export function ReceivingItemListPage() {
  const resource = useReceivingItemResource()
  const title = humanizeModuleName('InventoryReceivingItem')

  return (
    <WorkflowListPage<ReceivingItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryReceivingItemEndpoint}
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
