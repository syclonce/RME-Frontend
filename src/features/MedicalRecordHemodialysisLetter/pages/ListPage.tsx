import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useHemodialysisLetterResource } from '../api'
import type { HemodialysisLetter } from '../types'

const columns: ColumnDef<HemodialysisLetter, unknown>[] = [
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
    header: humanizeField('diagnosis'),
    accessorKey: 'diagnosis',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'letter_number', label: humanizeField('letter_number'), required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'issue_date', label: humanizeField('issue_date'), type: 'date', required: true },
  { key: 'diagnosis', label: humanizeField('diagnosis') },
  { key: 'hd_frequency_per_week', label: humanizeField('hd_frequency_per_week'), type: 'number' },
  { key: 'vascular_access', label: humanizeField('vascular_access') },
  { key: 'remarks', label: humanizeField('remarks') },
]

const emptyForm = {
  letter_number: '',
  patient_id: '',
  visit_id: '',
  doctor_id: null,
  issue_date: '',
  diagnosis: '',
  hd_frequency_per_week: '',
  vascular_access: '',
  remarks: '',
}

export function HemodialysisLetterListPage() {
  const resource = useHemodialysisLetterResource()
  const title = humanizeModuleName('MedicalRecordHemodialysisLetter')

  return (
    <CrudDialogPage<HemodialysisLetter>
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
