import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useHealthCertificateResource } from '../api'
import type { HealthCertificate } from '../types'

const columns: ColumnDef<HealthCertificate, unknown>[] = [
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
    header: humanizeField('physical_fitness_status'),
    accessorKey: 'physical_fitness_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).physical_fitness_status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'letter_number', label: humanizeField('letter_number'), required: true, section: 'Detail' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true, section: 'Detail' },
  { key: 'issue_date', label: humanizeField('issue_date'), type: 'date', required: true, section: 'Detail' },
  { key: 'physical_fitness_status', label: humanizeField('physical_fitness_status'), section: 'Detail' },
  { key: 'purpose', label: humanizeField('purpose'), section: 'Detail Tambahan' },
  { key: 'blood_pressure', label: humanizeField('blood_pressure'), section: 'Detail Tambahan' },
  { key: 'height_cm', label: humanizeField('height_cm'), type: 'number', section: 'Detail Tambahan' },
  { key: 'weight_kg', label: humanizeField('weight_kg'), type: 'number', section: 'Detail Tambahan' },
  { key: 'remarks', label: humanizeField('remarks'), section: 'Detail Tambahan' },
]

const emptyForm = {
  letter_number: '',
  patient_id: '',
  visit_id: '',
  doctor_id: null,
  issue_date: '',
  physical_fitness_status: '',
  purpose: '',
  blood_pressure: '',
  height_cm: '',
  weight_kg: '',
  remarks: '',
}

export function HealthCertificateListPage() {
  const resource = useHealthCertificateResource()
  const title = humanizeModuleName('MedicalRecordHealthCertificate')

  return (
    <CrudDialogPage<HealthCertificate>
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
