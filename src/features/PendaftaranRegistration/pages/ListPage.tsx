import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRegistrationResource } from '../api'
import type { Registration } from '../types'

const columns: ColumnDef<Registration, unknown>[] = [
  {
    header: humanizeField('registration_number'),
    accessorKey: 'registration_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registration_number ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('registered_at'),
    accessorKey: 'registered_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registered_at ?? '—'),
  },
  {
    header: humanizeField('admission_diagnosis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnosis-codes" id={(row.original as unknown as Record<string, unknown>).admission_diagnosis_id as number | null} />,
  },
  {
    header: humanizeField('referral_id'),
    cell: ({ row }) => <RelationLabel endpoint="/referrals" id={(row.original as unknown as Record<string, unknown>).referral_id as number | null} />,
  },
  {
    header: humanizeField('package_id'),
    cell: ({ row }) => <RelationLabel endpoint="/packages" id={(row.original as unknown as Record<string, unknown>).package_id as number | null} />,
  },
]

const fields: CrudField[] = [
  { key: 'registration_number', label: humanizeField('registration_number'), section: 'Detail' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'registered_at', label: humanizeField('registered_at'), type: 'date', section: 'Detail' },
  { key: 'admission_diagnosis_id', label: humanizeField('admission_diagnosis_id'), type: 'relation', relationEndpoint: '/diagnosis-codes', section: 'Detail' },
  { key: 'referral_id', label: humanizeField('referral_id'), type: 'relation', relationEndpoint: '/referrals', section: 'Detail' },
  { key: 'package_id', label: humanizeField('package_id'), type: 'relation', relationEndpoint: '/packages', section: 'Detail' },
  { key: 'is_emergency', label: humanizeField('is_emergency'), type: 'checkbox', section: 'Detail' },
  { key: 'has_fall_risk', label: humanizeField('has_fall_risk'), type: 'checkbox', section: 'Detail' },
  { key: 'newborn_weight_grams', label: humanizeField('newborn_weight_grams'), type: 'number', section: 'Detail Tambahan' },
  { key: 'newborn_length_cm', label: humanizeField('newborn_length_cm'), type: 'number', section: 'Detail Tambahan' },
  { key: 'birth_time', label: humanizeField('birth_time'), type: 'date', section: 'Detail Tambahan' },
  { key: 'found_location', label: humanizeField('found_location'), section: 'Detail Tambahan' },
  { key: 'found_at', label: humanizeField('found_at'), type: 'date', section: 'Detail Tambahan' },
  { key: 'satu_sehat_consent', label: humanizeField('satu_sehat_consent'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'status', label: humanizeField('status'), section: 'Detail Tambahan' },
]

const emptyForm = {
  registration_number: '',
  patient_id: '',
  registered_at: '',
  admission_diagnosis_id: null,
  referral_id: null,
  package_id: null,
  is_emergency: false,
  has_fall_risk: false,
  newborn_weight_grams: '',
  newborn_length_cm: '',
  birth_time: '',
  found_location: '',
  found_at: '',
  satu_sehat_consent: false,
  status: '',
}

export function RegistrationListPage() {
  const resource = useRegistrationResource()
  const title = humanizeModuleName('PendaftaranRegistration')

  return (
    <CrudDialogPage<Registration>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.registration_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
