import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBirthCertificateLetterResource } from '../api'
import type { BirthCertificateLetter } from '../types'

const columns: ColumnDef<BirthCertificateLetter, unknown>[] = [
  {
    header: humanizeField('letter_number'),
    accessorKey: 'letter_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).letter_number ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('mother_patient_id'),
    accessorKey: 'mother_patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mother_patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('issue_date'),
    accessorKey: 'issue_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issue_date ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'letter_number', label: humanizeField('letter_number'), required: true, section: 'Detail' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'mother_patient_id', label: humanizeField('mother_patient_id'), type: 'number', section: 'Detail' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true, section: 'Detail' },
  { key: 'issue_date', label: humanizeField('issue_date'), type: 'date', required: true, section: 'Detail' },
  { key: 'child_name', label: humanizeField('child_name'), section: 'Detail Tambahan' },
  { key: 'birth_date_time', label: humanizeField('birth_date_time'), type: 'date', section: 'Detail Tambahan' },
  { key: 'birth_weight_grams', label: humanizeField('birth_weight_grams'), type: 'number', section: 'Detail Tambahan' },
  { key: 'birth_length_cm', label: humanizeField('birth_length_cm'), type: 'number', section: 'Detail Tambahan' },
  { key: 'gender', label: humanizeField('gender'), section: 'Detail Tambahan' },
  { key: 'remarks', label: humanizeField('remarks'), section: 'Detail Tambahan' },
]

const emptyForm = {
  letter_number: '',
  patient_id: '',
  mother_patient_id: '',
  visit_id: '',
  doctor_id: null,
  issue_date: '',
  child_name: '',
  birth_date_time: '',
  birth_weight_grams: '',
  birth_length_cm: '',
  gender: '',
  remarks: '',
}

export function BirthCertificateLetterListPage() {
  const resource = useBirthCertificateLetterResource()
  const title = humanizeModuleName('MedicalRecordBirthCertificateLetter')

  return (
    <CrudDialogPage<BirthCertificateLetter>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.letter_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
