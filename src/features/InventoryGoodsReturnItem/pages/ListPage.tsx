import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryGoodsReturnItemEndpoint, useInventoryGoodsReturnItemResource } from '../api'
import type { InventoryGoodsReturnItem } from '../types'

const columns: ColumnDef<InventoryGoodsReturnItem, unknown>[] = [
  {
    header: humanizeField('goods_return_id'),
    cell: ({ row }) => <RelationLabel endpoint="/goods-returns" id={(row.original as unknown as Record<string, unknown>).goods_return_id as number | null} />,
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
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'goods_return_id', label: humanizeField('goods_return_id'), type: 'relation', relationEndpoint: '/goods-returns', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit_price', label: humanizeField('unit_price'), type: 'number' },
  { key: 'reason', label: humanizeField('reason') },
]

const emptyForm = {
  goods_return_id: null,
  item_id: null,
  quantity: '',
  unit_price: '',
  reason: '',
}

const actions: WorkflowAction<InventoryGoodsReturnItem>[] = []

export function InventoryGoodsReturnItemListPage() {
  const resource = useInventoryGoodsReturnItemResource()
  const title = humanizeModuleName('InventoryGoodsReturnItem')

  return (
    <WorkflowListPage<InventoryGoodsReturnItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryGoodsReturnItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
