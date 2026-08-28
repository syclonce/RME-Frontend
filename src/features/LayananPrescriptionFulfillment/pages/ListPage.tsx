import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePrescriptionFulfillmentResource } from '../api'
import type { PrescriptionFulfillment } from '../types'

const columns: ColumnDef<PrescriptionFulfillment, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('served_by'),
    accessorKey: 'served_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).served_by ?? '—'),
  },
  {
    header: humanizeField('served_at'),
    accessorKey: 'served_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).served_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'combobox', relationEndpoint: '/prescriptions', required: true },
  { key: 'served_by', label: humanizeField('served_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'served_at', label: humanizeField('served_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  prescription_id: null,
  served_by: null,
  served_at: '',
  status: '',
  notes: '',
}

export function PrescriptionFulfillmentListPage() {
  const resource = usePrescriptionFulfillmentResource()
  const title = humanizeModuleName('LayananPrescriptionFulfillment')

  return (
    <CrudDialogPage<PrescriptionFulfillment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
