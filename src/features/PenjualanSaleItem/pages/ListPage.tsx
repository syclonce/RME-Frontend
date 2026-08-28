import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PenjualanSaleItemEndpoint, useSaleItemResource } from '../api'
import type { SaleItem } from '../types'

const columns: ColumnDef<SaleItem, unknown>[] = [
  {
    header: humanizeField('sale_id'),
    cell: ({ row }) => <RelationLabel endpoint="/sales" id={(row.original as unknown as Record<string, unknown>).sale_id as number | null} />,
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
    header: humanizeField('subtotal'),
    accessorKey: 'subtotal',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subtotal ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'sale_id', label: humanizeField('sale_id'), type: 'relation', relationEndpoint: '/sales', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit_price', label: humanizeField('unit_price'), type: 'number', required: true },
  { key: 'subtotal', label: humanizeField('subtotal'), type: 'number', required: true },
]

const emptyForm = {
  sale_id: null,
  item_id: null,
  quantity: '',
  unit_price: '',
  subtotal: '',
}

const actions: WorkflowAction<SaleItem>[] = []

export function SaleItemListPage() {
  const resource = useSaleItemResource()
  const title = humanizeModuleName('PenjualanSaleItem')

  return (
    <WorkflowListPage<SaleItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PenjualanSaleItemEndpoint}
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
