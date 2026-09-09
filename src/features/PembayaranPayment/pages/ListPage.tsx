import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranPaymentEndpoint, usePaymentResource } from '../api'
import { OrderStatusBadge } from '@/shared/components/OrderStatusBadge'
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

const statusColumn: ColumnDef<Payment, unknown> = {
  header: 'Status',
  accessorKey: 'status',
  cell: ({ row }) => <OrderStatusBadge status={(row.original as Payment).status} />,
}

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

/**
 * Pembatalan pembayaran.
 *
 * Menuntut shift kasir yang MASIH TERBUKA — bukan shift asal pembayaran itu.
 * Backend menolak shift tertutup ("Shift kasir sudah ditutup."), karena
 * pembatalan mengubah kas yang sudah dihitung dan diserahterimakan.
 *
 * Sebelum ini POST /payments/{id}/reverse tidak dipanggil dari mana pun di
 * frontend: pembayaran yang salah nominal tidak dapat dikoreksi lewat layar.
 */
const actions: WorkflowAction<Payment>[] = [
  {
    key: 'reverse',
    label: 'Batalkan',
    method: 'post',
    path: (item) => `/payments/${item.id}/reverse`,
    variant: 'destructive',
    // Pembayaran yang sudah dibatalkan tidak dapat dibatalkan lagi.
    visibleWhen: (item) => item.status !== 'reversed',
    fields: [
      {
        key: 'cashier_shift_id',
        label: 'Shift kasir (harus masih terbuka)',
        type: 'relation',
        relationEndpoint: '/cashier-shifts',
        required: true,
      },
      { key: 'reason', label: 'Alasan pembatalan', type: 'textarea', required: true },
    ],
    emptyForm: { cashier_shift_id: null, reason: '' },
    confirmDescription: (item, label) =>
      `Pembayaran ${label(item)} akan dibatalkan dan tagihannya dibuka kembali.`,
  },
]

export function PaymentListPage() {
  const resource = usePaymentResource()
  const title = humanizeModuleName('PembayaranPayment')

  return (
    <WorkflowListPage<Payment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranPaymentEndpoint}
      columns={[...columns, statusColumn]}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.payment_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
