import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePharmacyReturnResource } from '../api'
import type { PharmacyReturn } from '../types'

const columns: ColumnDef<PharmacyReturn, unknown>[] = [
  {
    header: humanizeField('prescription_item_id'),
    accessorKey: 'prescription_item_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_item_id ?? '—'),
  },
  {
    header: humanizeField('quantity_returned'),
    accessorKey: 'quantity_returned',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity_returned ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('returned_by'),
    accessorKey: 'returned_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).returned_by ?? '—'),
  },
  {
    header: humanizeField('returned_at'),
    accessorKey: 'returned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).returned_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_item_id', label: humanizeField('prescription_item_id'), type: 'combobox', relationEndpoint: '/prescription-items', required: true },
  { key: 'quantity_returned', label: humanizeField('quantity_returned'), type: 'number', required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'returned_by', label: humanizeField('returned_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'returned_at', label: humanizeField('returned_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  prescription_item_id: null,
  quantity_returned: '',
  reason: '',
  returned_by: null,
  returned_at: '',
  status: '',
}

export function PharmacyReturnListPage() {
  const resource = usePharmacyReturnResource()
  const title = humanizeModuleName('LayananPharmacyReturn')

  return (
    <CrudDialogPage<PharmacyReturn>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      resource={resource}
    />
  )
}
