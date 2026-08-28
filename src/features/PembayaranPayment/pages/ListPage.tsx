import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranPaymentEndpoint, usePaymentResource } from '../api'
import type { Payment } from '../types'

const columns: ColumnDef<Payment, unknown>[] = [
  {
    header: humanizeField('payment_number'),
    accessorKey: 'payment_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).payment_number ?? '—'),
  },
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('payment_method'),
    accessorKey: 'payment_method',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).payment_method ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
  {
    header: humanizeField('admin_fee'),
    accessorKey: 'admin_fee',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).admin_fee ?? '—'),
  },
  {
    header: humanizeField('paid_at'),
    accessorKey: 'paid_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).paid_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'payment_number', label: humanizeField('payment_number') },
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'payment_method', label: humanizeField('payment_method'), type: 'select', required: true, options: [{"value":"cash","label":"Cash"},{"value":"debit","label":"Debit"},{"value":"credit","label":"Credit"},{"value":"transfer","label":"Transfer"}] },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'admin_fee', label: humanizeField('admin_fee'), type: 'number' },
  { key: 'paid_at', label: humanizeField('paid_at'), type: 'date' },
]

const emptyForm = {
  payment_number: '',
  invoice_id: '',
  payment_method: '',
  amount: '',
  admin_fee: '',
  paid_at: '',
}

const actions: WorkflowAction<Payment>[] = []

export function PaymentListPage() {
  const resource = usePaymentResource()
  const title = humanizeModuleName('PembayaranPayment')

  return (
    <WorkflowListPage<Payment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranPaymentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.payment_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
