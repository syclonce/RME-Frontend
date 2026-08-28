import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePackageInvoiceItemResource } from '../api'
import type { PackageInvoiceItem } from '../types'

const columns: ColumnDef<PackageInvoiceItem, unknown>[] = [
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('package_id'),
    cell: ({ row }) => <RelationLabel endpoint="/packages" id={(row.original as unknown as Record<string, unknown>).package_id as number | null} />,
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
  {
    header: humanizeField('subtotal'),
    accessorKey: 'subtotal',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subtotal ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'combobox', relationEndpoint: '/invoices', required: true },
  { key: 'package_id', label: humanizeField('package_id'), type: 'relation', relationEndpoint: '/packages', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number' },
  { key: 'unit_price', label: humanizeField('unit_price'), type: 'number', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  invoice_id: null,
  package_id: null,
  quantity: '',
  unit_price: '',
  notes: '',
}

export function PackageInvoiceItemListPage() {
  const resource = usePackageInvoiceItemResource()
  const title = humanizeModuleName('PembayaranPackageInvoiceItem')

  return (
    <CrudDialogPage<PackageInvoiceItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      resource={resource}
    />
  )
}
