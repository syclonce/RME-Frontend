import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientFamilyContactResource } from '../api'
import type { PatientFamilyContact } from '../types'

const columns: ColumnDef<PatientFamilyContact, unknown>[] = [
  {
    header: humanizeField('patient_family_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patientfamilies" id={(row.original as unknown as Record<string, unknown>).patient_family_id as number | null} />,
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
    header: humanizeField('is_active'),
    cell: ({ row }) =>
      (row.original as unknown as Record<string, unknown>).is_active ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">Nonaktif</Badge>
      ),
  },
]

const fields: CrudField[] = [
  { key: 'patient_family_id', label: humanizeField('patient_family_id'), type: 'relation', relationEndpoint: '/patientfamilies', required: true },
  { key: 'contact_type', label: humanizeField('contact_type'), required: true },
  { key: 'contact_value', label: humanizeField('contact_value'), required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  patient_family_id: null,
  contact_type: '',
  contact_value: '',
  is_active: false,
}

export function PatientFamilyContactListPage() {
  const resource = usePatientFamilyContactResource()
  const title = humanizeModuleName('GeneralPatientFamilyContact')

  return (
    <CrudDialogPage<PatientFamilyContact>
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
