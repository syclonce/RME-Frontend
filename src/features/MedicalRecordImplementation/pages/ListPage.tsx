import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useImplementationResource } from '../api'
import type { Implementation } from '../types'

const columns: ColumnDef<Implementation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('order_reference'),
    accessorKey: 'order_reference',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).order_reference ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'order_reference', label: humanizeField('order_reference') },
  { key: 'description', label: humanizeField('description') },
  { key: 'performed_by', label: humanizeField('performed_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: null,
  order_reference: '',
  description: '',
  performed_by: null,
  performed_at: '',
  status: '',
}

export function ImplementationListPage() {
  const resource = useImplementationResource()
  const title = humanizeModuleName('MedicalRecordImplementation')

  return (
    <CrudDialogPage<Implementation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.order_reference ?? `#${item.id}`}
      resource={resource}
    />
  )
}
