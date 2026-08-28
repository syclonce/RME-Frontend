import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useApplicantResource } from '../api'
import type { Applicant } from '../types'

const columns: ColumnDef<Applicant, unknown>[] = [
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
    header: humanizeField('identity_number'),
    accessorKey: 'identity_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identity_number ?? '—'),
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
]

const fields: CrudField[] = [
  { key: 'registration_id', label: humanizeField('registration_id'), type: 'combobox', relationEndpoint: '/registrations', required: true },
  { key: 'full_name', label: humanizeField('full_name'), required: true },
  { key: 'relationship_to_patient', label: humanizeField('relationship_to_patient'), required: true },
  { key: 'identity_number', label: humanizeField('identity_number') },
  { key: 'phone_number', label: humanizeField('phone_number') },
  { key: 'address', label: humanizeField('address') },
  { key: 'application_type', label: humanizeField('application_type'), required: true },
  { key: 'application_date', label: humanizeField('application_date'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  registration_id: null,
  full_name: '',
  relationship_to_patient: '',
  identity_number: '',
  phone_number: '',
  address: '',
  application_type: '',
  application_date: '',
  notes: '',
}

export function ApplicantListPage() {
  const resource = useApplicantResource()
  const title = humanizeModuleName('PendaftaranApplicant')

  return (
    <CrudDialogPage<Applicant>
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
