import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryItemEndpoint, useItemResource } from '../api'
import type { Item } from '../types'

const columns: ColumnDef<Item, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
  {
    header: humanizeField('brand'),
    accessorKey: 'brand',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).brand ?? '—'),
  },
  {
    header: humanizeField('is_generic'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_generic ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'code', label: humanizeField('code'), section: 'Detail' },
  { key: 'name', label: humanizeField('name'), required: true, section: 'Detail' },
  { key: 'category', label: humanizeField('category'), section: 'Detail' },
  { key: 'unit', label: humanizeField('unit'), required: true, section: 'Detail' },
  { key: 'brand', label: humanizeField('brand'), section: 'Detail' },
  { key: 'is_generic', label: humanizeField('is_generic'), type: 'checkbox', section: 'Detail' },
  { key: 'is_formulary', label: humanizeField('is_formulary'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'buy_price', label: humanizeField('buy_price'), type: 'number', section: 'Detail Tambahan' },
  { key: 'sell_price', label: humanizeField('sell_price'), type: 'number', section: 'Detail Tambahan' },
  { key: 'stock_quantity', label: humanizeField('stock_quantity'), type: 'number', section: 'Detail Tambahan' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox', section: 'Detail Tambahan' },
]

const emptyForm = {
  code: '',
  name: '',
  category: '',
  unit: '',
  brand: '',
  is_generic: false,
  is_formulary: false,
  buy_price: '',
  sell_price: '',
  stock_quantity: '',
  is_active: false,
}

const actions: WorkflowAction<Item>[] = [
  {
    key: 'adjust-stock',
    label: 'Sesuaikan Stok',
    method: 'post',
    path: (item) => `/items/${item.id}/adjust-stock`,
    fields: [
        { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
        { key: 'reason', label: humanizeField('reason') },
    ],
    emptyForm: {
        quantity: '',
        reason: '',
    },
  },
]

export function ItemListPage() {
  const resource = useItemResource()
  const title = humanizeModuleName('InventoryItem')

  return (
    <WorkflowListPage<Item>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
