import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInvoiceMergeResource } from '../api'
import type { InvoiceMerge } from '../types'

const columns: ColumnDef<InvoiceMerge, unknown>[] = [
  {
    header: humanizeField('merge_number'),
    accessorKey: 'merge_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).merge_number ?? '—'),
  },
  {
    header: humanizeField('payment_id'),
    cell: ({ row }) => <RelationLabel endpoint="/payments" id={(row.original as unknown as Record<string, unknown>).payment_id as number | null} />,
  },
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('allocated_amount'),
    accessorKey: 'allocated_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).allocated_amount ?? '—'),
  },
  {
    header: humanizeField('merged_by'),
    accessorKey: 'merged_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).merged_by ?? '—'),
  },
  {
    header: humanizeField('merged_at'),
    accessorKey: 'merged_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).merged_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'merge_number', label: humanizeField('merge_number') },
  { key: 'payment_id', label: humanizeField('payment_id'), type: 'relation', relationEndpoint: '/payments', required: true },
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'allocated_amount', label: humanizeField('allocated_amount'), type: 'number', required: true },
  { key: 'merged_at', label: humanizeField('merged_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  merge_number: '',
  payment_id: null,
  invoice_id: '',
  allocated_amount: '',
  merged_at: '',
  notes: '',
}

export function InvoiceMergeListPage() {
  const resource = useInvoiceMergeResource()
  const title = humanizeModuleName('PembayaranInvoiceMerge')

  return (
    <CrudDialogPage<InvoiceMerge>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.merge_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
