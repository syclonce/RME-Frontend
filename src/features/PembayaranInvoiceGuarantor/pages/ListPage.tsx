import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInvoiceGuarantorResource } from '../api'
import type { InvoiceGuarantor } from '../types'

const columns: ColumnDef<InvoiceGuarantor, unknown>[] = [
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('guarantor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/guarantors" id={(row.original as unknown as Record<string, unknown>).guarantor_id as number | null} />,
  },
  {
    header: humanizeField('sequence'),
    accessorKey: 'sequence',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sequence ?? '—'),
  },
  {
    header: humanizeField('room_class_id'),
    accessorKey: 'room_class_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).room_class_id ?? '—'),
  },
  {
    header: humanizeField('covered_amount'),
    accessorKey: 'covered_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).covered_amount ?? '—'),
  },
  {
    header: humanizeField('coverage_percentage'),
    accessorKey: 'coverage_percentage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).coverage_percentage ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'combobox', relationEndpoint: '/invoices', required: true },
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors', required: true },
  { key: 'covered_amount', label: humanizeField('covered_amount'), type: 'number' },
  { key: 'coverage_percentage', label: humanizeField('coverage_percentage'), type: 'number' },
  { key: 'verification_status', label: humanizeField('verification_status') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  invoice_id: null,
  guarantor_id: null,
  covered_amount: '',
  coverage_percentage: '',
  verification_status: '',
  notes: '',
}

export function InvoiceGuarantorListPage() {
  const resource = useInvoiceGuarantorResource()
  const title = humanizeModuleName('PembayaranInvoiceGuarantor')

  return (
    <CrudDialogPage<InvoiceGuarantor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.verification_status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
