import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientEscortContactResource } from '../api'
import type { PatientEscortContact } from '../types'

const columns: ColumnDef<PatientEscortContact, unknown>[] = [
  {
    header: humanizeField('patient_escort_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patient-escorts" id={(row.original as unknown as Record<string, unknown>).patient_escort_id as number | null} />,
  },
  {
    header: humanizeField('contact_type'),
    accessorKey: 'contact_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_type ?? '—'),
  },
  {
    header: humanizeField('contact_value'),
    accessorKey: 'contact_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_value ?? '—'),
  },
  {
    header: humanizeField('is_primary'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_primary ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_escort_id', label: humanizeField('patient_escort_id'), type: 'relation', relationEndpoint: '/patient-escorts', required: true },
  { key: 'contact_type', label: humanizeField('contact_type'), required: true },
  { key: 'contact_value', label: humanizeField('contact_value'), required: true },
  { key: 'is_primary', label: humanizeField('is_primary'), type: 'checkbox' },
]

const emptyForm = {
  patient_escort_id: null,
  contact_type: '',
  contact_value: '',
  is_primary: false,
}

export function PatientEscortContactListPage() {
  const resource = usePatientEscortContactResource()
  const title = humanizeModuleName('PendaftaranPatientEscortContact')

  return (
    <CrudDialogPage<PatientEscortContact>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.contact_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
