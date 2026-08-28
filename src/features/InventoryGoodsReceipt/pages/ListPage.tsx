import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryGoodsReceiptEndpoint, useGoodsReceiptResource } from '../api'
import type { GoodsReceipt } from '../types'

const columns: ColumnDef<GoodsReceipt, unknown>[] = [
  {
    header: humanizeField('receipt_number'),
    accessorKey: 'receipt_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).receipt_number ?? '—'),
  },
  {
    header: humanizeField('supplier_id'),
    cell: ({ row }) => <RelationLabel endpoint="/suppliers" id={(row.original as unknown as Record<string, unknown>).supplier_id as number | null} />,
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
    header: humanizeField('received_by'),
    accessorKey: 'received_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'supplier_id', label: humanizeField('supplier_id'), type: 'relation', relationEndpoint: '/suppliers', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit_price', label: humanizeField('unit_price'), type: 'number' },
  { key: 'received_at', label: humanizeField('received_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  supplier_id: null,
  item_id: null,
  quantity: '',
  unit_price: '',
  received_at: '',
  notes: '',
}

const actions: WorkflowAction<GoodsReceipt>[] = []

export function GoodsReceiptListPage() {
  const resource = useGoodsReceiptResource()
  const title = humanizeModuleName('InventoryGoodsReceipt')

  return (
    <WorkflowListPage<GoodsReceipt>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryGoodsReceiptEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
