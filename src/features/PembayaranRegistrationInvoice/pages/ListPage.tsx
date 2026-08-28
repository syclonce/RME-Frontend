import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRegistrationInvoiceResource } from '../api'
import type { RegistrationInvoice } from '../types'

const columns: ColumnDef<RegistrationInvoice, unknown>[] = [
  {
    header: humanizeField('registration_id'),
    accessorKey: 'registration_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registration_id ?? '—'),
  },
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('invoice_category'),
    accessorKey: 'invoice_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_category ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'registration_id', label: humanizeField('registration_id'), type: 'number', required: true },
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'invoice_category', label: humanizeField('invoice_category') },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  registration_id: '',
  invoice_id: '',
  invoice_category: '',
  amount: '',
  notes: '',
}

export function RegistrationInvoiceListPage() {
  const resource = useRegistrationInvoiceResource()
  const title = humanizeModuleName('PembayaranRegistrationInvoice')

  return (
    <CrudDialogPage<RegistrationInvoice>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.invoice_category ?? `#${item.id}`}
      resource={resource}
    />
  )
}
