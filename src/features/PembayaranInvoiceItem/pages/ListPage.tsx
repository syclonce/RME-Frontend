import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInvoiceItemResource } from '../api'
import type { InvoiceItem } from '../types'

const columns: ColumnDef<InvoiceItem, unknown>[] = [
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('service_id'),
    accessorKey: 'service_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_id ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
  {
    header: humanizeField('unit_price'),
    accessorKey: 'unit_price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit_price ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'service_id', label: humanizeField('service_id'), type: 'number' },
  { key: 'description', label: humanizeField('description'), required: true },
  { key: 'category', label: humanizeField('category') },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
]

const emptyForm = {
  invoice_id: '',
  service_id: '',
  description: '',
  category: '',
  quantity: '',
}

export function InvoiceItemListPage() {
  const resource = useInvoiceItemResource()
  const title = humanizeModuleName('PembayaranInvoiceItem')

  return (
    <CrudDialogPage<InvoiceItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.description ?? `#${item.id}`}
      resource={resource}
    />
  )
}
