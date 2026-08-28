import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranDepositEndpoint, useDepositResource } from '../api'
import type { Deposit } from '../types'

const columns: ColumnDef<Deposit, unknown>[] = [
  {
    header: humanizeField('deposit_number'),
    accessorKey: 'deposit_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).deposit_number ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
  {
    header: humanizeField('paid_at'),
    accessorKey: 'paid_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).paid_at ?? '—'),
  },
  {
    header: humanizeField('received_by'),
    accessorKey: 'received_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_by ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'paid_at', label: humanizeField('paid_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  amount: '',
  paid_at: '',
  notes: '',
}

const actions: WorkflowAction<Deposit>[] = []

export function DepositListPage() {
  const resource = useDepositResource()
  const title = humanizeModuleName('PembayaranDeposit')

  return (
    <WorkflowListPage<Deposit>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranDepositEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
