import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useHospitalizationCertificateResource } from '../api'
import type { HospitalizationCertificate } from '../types'

const columns: ColumnDef<HospitalizationCertificate, unknown>[] = [
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
  {
    header: humanizeField('admission_date'),
    accessorKey: 'admission_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).admission_date ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'letter_number', label: humanizeField('letter_number'), required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'issue_date', label: humanizeField('issue_date'), type: 'date', required: true },
  { key: 'admission_date', label: humanizeField('admission_date'), type: 'date' },
  { key: 'estimated_duration_days', label: humanizeField('estimated_duration_days'), type: 'number' },
  { key: 'ward_name', label: humanizeField('ward_name') },
  { key: 'diagnosis', label: humanizeField('diagnosis') },
  { key: 'remarks', label: humanizeField('remarks') },
]

const emptyForm = {
  letter_number: '',
  patient_id: '',
  visit_id: '',
  doctor_id: null,
  issue_date: '',
  admission_date: '',
  estimated_duration_days: '',
  ward_name: '',
  diagnosis: '',
  remarks: '',
}

export function HospitalizationCertificateListPage() {
  const resource = useHospitalizationCertificateResource()
  const title = humanizeModuleName('MedicalRecordHospitalizationCertificate')

  return (
    <CrudDialogPage<HospitalizationCertificate>
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
