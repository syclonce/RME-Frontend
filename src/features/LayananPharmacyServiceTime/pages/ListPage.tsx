import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePharmacyServiceTimeResource } from '../api'
import type { PharmacyServiceTime } from '../types'

const columns: ColumnDef<PharmacyServiceTime, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('received_at'),
    accessorKey: 'received_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_at ?? '—'),
  },
  {
    header: humanizeField('prepared_at'),
    accessorKey: 'prepared_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prepared_at ?? '—'),
  },
  {
    header: humanizeField('dispensed_at'),
    accessorKey: 'dispensed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dispensed_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'combobox', relationEndpoint: '/prescriptions', required: true },
  { key: 'received_at', label: humanizeField('received_at'), type: 'date' },
  { key: 'prepared_at', label: humanizeField('prepared_at'), type: 'date' },
  { key: 'dispensed_at', label: humanizeField('dispensed_at'), type: 'date' },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  prescription_id: null,
  received_at: '',
  prepared_at: '',
  dispensed_at: '',
  status: '',
}

export function PharmacyServiceTimeListPage() {
  const resource = usePharmacyServiceTimeResource()
  const title = humanizeModuleName('LayananPharmacyServiceTime')

  return (
    <CrudDialogPage<PharmacyServiceTime>
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
