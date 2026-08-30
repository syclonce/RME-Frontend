// codegen:preserve — coverage dan penjamin mengikuti status invoice.
import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranInvoiceEndpoint, useInvoiceResource } from '../api'
import type { Invoice } from '../types'

const columns: ColumnDef<Invoice, unknown>[] = [
  {
    header: humanizeField('invoice_number'),
    accessorKey: 'invoice_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_number ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('invoice_date'),
    accessorKey: 'invoice_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_date ?? '—'),
  },
  {
    header: humanizeField('subtotal'),
    accessorKey: 'subtotal',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subtotal ?? '—'),
  },
  {
    header: humanizeField('rounding_adjustment'),
    accessorKey: 'rounding_adjustment',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rounding_adjustment ?? '—'),
  },
  {
    header: humanizeField('total_amount'),
    accessorKey: 'total_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).total_amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'invoice_number', label: humanizeField('invoice_number') },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'invoice_date', label: humanizeField('invoice_date'), type: 'date' },
  { key: 'rounding_adjustment', label: humanizeField('rounding_adjustment'), type: 'number' },
]

const emptyForm = {
  invoice_number: '',
  visit_id: '',
  invoice_date: '',
  rounding_adjustment: '',
}

const actions: WorkflowAction<Invoice>[] = [
  {
    key: 'guarantors',
    label: 'Guarantors',
    method: 'post',
    path: (item) => `/invoices/${item.id}/guarantors`,
    fields: [
      { key: 'guarantor_id', label: 'Penjamin', type: 'relation', relationEndpoint: '/guarantors', required: true },
      { key: 'room_class_id', label: 'Kelas Klaim', type: 'relation', relationEndpoint: '/room-classes' },
    ],
    emptyForm: { guarantor_id: null, room_class_id: null },
    visibleWhen: (item) => !item.is_locked,
  },
  {
    key: 'coverage', label: 'Rincian Tanggungan', method: 'get', path: (item) => `/invoices/${item.id}/coverage`, resultTitle: 'Rincian Tanggungan Invoice',
  },
  {
    key: 'redistribute',
    label: 'Redistribute',
    method: 'post',
    path: (item) => `/invoices/${item.id}/redistribute`,
    visibleWhen: (item) => !item.is_locked,
  },
  {
    key: 'lock',
    label: 'Kunci',
    method: 'post',
    path: (item) => `/invoices/${item.id}/lock`,
    visibleWhen: (item) => !item.is_locked,
  },
  {
    key: 'unlock',
    label: 'Buka Kunci',
    method: 'post',
    path: (item) => `/invoices/${item.id}/unlock`,
    visibleWhen: (item) => Boolean(item.is_locked),
  },
]

export function InvoiceListPage() {
  const resource = useInvoiceResource()
  const title = humanizeModuleName('PembayaranInvoice')

  return (
    <WorkflowListPage<Invoice>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranInvoiceEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.invoice_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
