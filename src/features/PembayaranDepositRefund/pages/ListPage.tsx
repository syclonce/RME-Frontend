import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranDepositRefundEndpoint, useDepositRefundResource } from '../api'
import type { DepositRefund } from '../types'

const columns: ColumnDef<DepositRefund, unknown>[] = [
  {
    header: humanizeField('deposit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/deposits" id={(row.original as unknown as Record<string, unknown>).deposit_id as number | null} />,
  },
  {
    header: humanizeField('refunded_amount'),
    accessorKey: 'refunded_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).refunded_amount ?? '—'),
  },
  {
    header: humanizeField('refunded_at'),
    accessorKey: 'refunded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).refunded_at ?? '—'),
  },
  {
    header: humanizeField('refunded_by'),
    accessorKey: 'refunded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).refunded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'deposit_id', label: humanizeField('deposit_id'), type: 'relation', relationEndpoint: '/deposits', required: true },
  { key: 'refunded_amount', label: humanizeField('refunded_amount'), type: 'number', required: true },
]

const emptyForm = {
  deposit_id: null,
  refunded_amount: '',
}

const actions: WorkflowAction<DepositRefund>[] = []

export function DepositRefundListPage() {
  const resource = useDepositRefundResource()
  const title = humanizeModuleName('PembayaranDepositRefund')

  return (
    <WorkflowListPage<DepositRefund>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranDepositRefundEndpoint}
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
