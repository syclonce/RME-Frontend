import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInvoiceSubsidyResource } from '../api'
import type { InvoiceSubsidy } from '../types'

const columns: ColumnDef<InvoiceSubsidy, unknown>[] = [
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('subsidy_source'),
    accessorKey: 'subsidy_source',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subsidy_source ?? '—'),
  },
  {
    header: humanizeField('subsidy_amount'),
    accessorKey: 'subsidy_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subsidy_amount ?? '—'),
  },
  {
    header: humanizeField('approved_by'),
    accessorKey: 'approved_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).approved_by ?? '—'),
  },
  {
    header: humanizeField('approved_at'),
    accessorKey: 'approved_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).approved_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'subsidy_source', label: humanizeField('subsidy_source'), required: true },
  { key: 'subsidy_amount', label: humanizeField('subsidy_amount'), type: 'number', required: true },
  { key: 'status', label: humanizeField('status') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  invoice_id: '',
  subsidy_source: '',
  subsidy_amount: '',
  status: '',
  notes: '',
}

export function InvoiceSubsidyListPage() {
  const resource = useInvoiceSubsidyResource()
  const title = humanizeModuleName('PembayaranInvoiceSubsidy')

  return (
    <CrudDialogPage<InvoiceSubsidy>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.subsidy_source ?? `#${item.id}`}
      resource={resource}
    />
  )
}
