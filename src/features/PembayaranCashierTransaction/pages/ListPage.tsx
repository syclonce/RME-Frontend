import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranCashierTransactionEndpoint, useCashierTransactionResource } from '../api'
import type { CashierTransaction } from '../types'

const columns: ColumnDef<CashierTransaction, unknown>[] = [
  {
    header: humanizeField('cashier_id'),
    cell: ({ row }) => <RelationLabel endpoint="/cashiers" id={(row.original as unknown as Record<string, unknown>).cashier_id as number | null} />,
  },
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
  {
    header: humanizeField('transaction_type'),
    accessorKey: 'transaction_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).transaction_type ?? '—'),
  },
  {
    header: humanizeField('transacted_at'),
    accessorKey: 'transacted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).transacted_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'cashier_id', label: humanizeField('cashier_id'), type: 'relation', relationEndpoint: '/cashiers', required: true },
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'transaction_type', label: humanizeField('transaction_type'), required: true },
  { key: 'transacted_at', label: humanizeField('transacted_at'), type: 'date' },
]

const emptyForm = {
  cashier_id: null,
  invoice_id: '',
  amount: '',
  transaction_type: '',
  transacted_at: '',
}

const actions: WorkflowAction<CashierTransaction>[] = []

export function CashierTransactionListPage() {
  const resource = useCashierTransactionResource()
  const title = humanizeModuleName('PembayaranCashierTransaction')

  return (
    <WorkflowListPage<CashierTransaction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranCashierTransactionEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.transaction_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
