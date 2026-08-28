import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSickLeaveCertificateResource } from '../api'
import type { SickLeaveCertificate } from '../types'

const columns: ColumnDef<SickLeaveCertificate, unknown>[] = [
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
    accessorKey: 'doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).doctor_id ?? '—'),
  },
  {
    header: humanizeField('issue_date'),
    accessorKey: 'issue_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issue_date ?? '—'),
  },
  {
    header: humanizeField('start_date'),
    accessorKey: 'start_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).start_date ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'letter_number', label: humanizeField('letter_number'), required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'combobox', relationEndpoint: '/doctors', required: true },
  { key: 'issue_date', label: humanizeField('issue_date'), type: 'date', required: true },
  { key: 'start_date', label: humanizeField('start_date'), type: 'date', required: true },
  { key: 'end_date', label: humanizeField('end_date'), type: 'date', required: true },
  { key: 'duration_days', label: humanizeField('duration_days'), type: 'number', required: true },
  { key: 'diagnosis', label: humanizeField('diagnosis') },
  { key: 'remarks', label: humanizeField('remarks') },
]

const emptyForm = {
  letter_number: '',
  patient_id: null,
  visit_id: null,
  doctor_id: null,
  issue_date: '',
  start_date: '',
  end_date: '',
  duration_days: '',
  diagnosis: '',
  remarks: '',
}

export function SickLeaveCertificateListPage() {
  const resource = useSickLeaveCertificateResource()
  const title = humanizeModuleName('MedicalRecordSickLeaveCertificate')

  return (
    <CrudDialogPage<SickLeaveCertificate>
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
