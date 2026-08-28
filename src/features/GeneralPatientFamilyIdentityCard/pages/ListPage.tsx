import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientFamilyIdentityCardResource } from '../api'
import type { PatientFamilyIdentityCard } from '../types'

const columns: ColumnDef<PatientFamilyIdentityCard, unknown>[] = [
  {
    header: humanizeField('patient_family_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patientfamilies" id={(row.original as unknown as Record<string, unknown>).patient_family_id as number | null} />,
  },
  {
    header: humanizeField('identity_type'),
    accessorKey: 'identity_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identity_type ?? '—'),
  },
  {
    header: humanizeField('identity_number'),
    accessorKey: 'identity_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identity_number ?? '—'),
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
  { key: 'identity_type', label: humanizeField('identity_type'), required: true },
  { key: 'identity_number', label: humanizeField('identity_number'), required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  patient_family_id: null,
  identity_type: '',
  identity_number: '',
  is_active: false,
}

export function PatientFamilyIdentityCardListPage() {
  const resource = usePatientFamilyIdentityCardResource()
  const title = humanizeModuleName('GeneralPatientFamilyIdentityCard')

  return (
    <CrudDialogPage<PatientFamilyIdentityCard>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.identity_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
