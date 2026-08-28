import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PenjualanSaleReturnEndpoint, useSaleReturnResource } from '../api'
import type { SaleReturn } from '../types'

const columns: ColumnDef<SaleReturn, unknown>[] = [
  {
    header: humanizeField('sale_id'),
    cell: ({ row }) => <RelationLabel endpoint="/sales" id={(row.original as unknown as Record<string, unknown>).sale_id as number | null} />,
  },
  {
    header: humanizeField('returned_at'),
    accessorKey: 'returned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).returned_at ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('refund_amount'),
    accessorKey: 'refund_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).refund_amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'sale_id', label: humanizeField('sale_id'), type: 'relation', relationEndpoint: '/sales', required: true },
  { key: 'returned_at', label: humanizeField('returned_at'), type: 'date' },
  { key: 'reason', label: humanizeField('reason') },
  { key: 'items', label: humanizeField('items'), required: true },
]

const emptyForm = {
  sale_id: null,
  returned_at: '',
  reason: '',
  items: '',
}

const actions: WorkflowAction<SaleReturn>[] = []

export function SaleReturnListPage() {
  const resource = useSaleReturnResource()
  const title = humanizeModuleName('PenjualanSaleReturn')

  return (
    <WorkflowListPage<SaleReturn>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PenjualanSaleReturnEndpoint}
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
