import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryGoodsReceiptCancellationEndpoint, useInventoryGoodsReceiptCancellationResource } from '../api'
import type { InventoryGoodsReceiptCancellation } from '../types'

const columns: ColumnDef<InventoryGoodsReceiptCancellation, unknown>[] = [
  {
    header: humanizeField('cancellation_number'),
    accessorKey: 'cancellation_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancellation_number ?? '—'),
  },
  {
    header: humanizeField('goods_receipt_id'),
    cell: ({ row }) => <RelationLabel endpoint="/goods-receipts" id={(row.original as unknown as Record<string, unknown>).goods_receipt_id as number | null} />,
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('cancelled_by'),
    accessorKey: 'cancelled_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancelled_by ?? '—'),
  },
  {
    header: humanizeField('cancelled_at'),
    accessorKey: 'cancelled_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancelled_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'goods_receipt_id', label: humanizeField('goods_receipt_id'), type: 'relation', relationEndpoint: '/goods-receipts', required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'cancelled_at', label: humanizeField('cancelled_at'), type: 'date' },
]

const emptyForm = {
  goods_receipt_id: null,
  reason: '',
  cancelled_at: '',
}

const actions: WorkflowAction<InventoryGoodsReceiptCancellation>[] = []

export function InventoryGoodsReceiptCancellationListPage() {
  const resource = useInventoryGoodsReceiptCancellationResource()
  const title = humanizeModuleName('InventoryGoodsReceiptCancellation')

  return (
    <WorkflowListPage<InventoryGoodsReceiptCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryGoodsReceiptCancellationEndpoint}
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
