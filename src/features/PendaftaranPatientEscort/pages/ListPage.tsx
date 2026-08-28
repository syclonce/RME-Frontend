import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientEscortResource } from '../api'
import type { PatientEscort } from '../types'

const columns: ColumnDef<PatientEscort, unknown>[] = [
  {
    header: humanizeField('registration_id'),
    accessorKey: 'registration_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registration_id ?? '—'),
  },
  {
    header: humanizeField('full_name'),
    accessorKey: 'full_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).full_name ?? '—'),
  },
  {
    header: humanizeField('relationship_to_patient'),
    accessorKey: 'relationship_to_patient',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).relationship_to_patient ?? '—'),
  },
  {
    header: humanizeField('phone_number'),
    accessorKey: 'phone_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).phone_number ?? '—'),
  },
  {
    header: humanizeField('address'),
    accessorKey: 'address',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).address ?? '—'),
  },
  {
    header: humanizeField('arrival_mode'),
    accessorKey: 'arrival_mode',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).arrival_mode ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'registration_id', label: humanizeField('registration_id'), type: 'number', required: true },
  { key: 'full_name', label: humanizeField('full_name'), required: true },
  { key: 'relationship_to_patient', label: humanizeField('relationship_to_patient'), required: true },
  { key: 'phone_number', label: humanizeField('phone_number') },
  { key: 'address', label: humanizeField('address') },
  { key: 'arrival_mode', label: humanizeField('arrival_mode') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  registration_id: '',
  full_name: '',
  relationship_to_patient: '',
  phone_number: '',
  address: '',
  arrival_mode: '',
  notes: '',
}

export function PatientEscortListPage() {
  const resource = usePatientEscortResource()
  const title = humanizeModuleName('PendaftaranPatientEscort')

  return (
    <CrudDialogPage<PatientEscort>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.full_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
