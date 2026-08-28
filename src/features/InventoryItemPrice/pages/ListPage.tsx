import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryItemPriceEndpoint, useInventoryItemPriceResource } from '../api'
import type { InventoryItemPrice } from '../types'

const columns: ColumnDef<InventoryItemPrice, unknown>[] = [
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('price'),
    accessorKey: 'price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).price ?? '—'),
  },
  {
    header: humanizeField('effective_date'),
    accessorKey: 'effective_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).effective_date ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    accessorKey: 'is_active',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).is_active ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'price', label: humanizeField('price'), type: 'number', required: true },
  { key: 'effective_date', label: humanizeField('effective_date'), type: 'date', required: true },
]

const emptyForm = {
  item_id: null,
  price: '',
  effective_date: '',
}

const actions: WorkflowAction<InventoryItemPrice>[] = []

export function InventoryItemPriceListPage() {
  const resource = useInventoryItemPriceResource()
  const title = humanizeModuleName('InventoryItemPrice')

  return (
    <WorkflowListPage<InventoryItemPrice>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryItemPriceEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
