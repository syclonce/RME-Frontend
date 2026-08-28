import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePediatricStatusResource } from '../api'
import type { PediatricStatus } from '../types'

const columns: ColumnDef<PediatricStatus, unknown>[] = [
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
    header: humanizeField('birth_weight_grams'),
    accessorKey: 'birth_weight_grams',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).birth_weight_grams ?? '—'),
  },
  {
    header: humanizeField('birth_length_cm'),
    accessorKey: 'birth_length_cm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).birth_length_cm ?? '—'),
  },
  {
    header: humanizeField('head_circumference_cm'),
    accessorKey: 'head_circumference_cm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).head_circumference_cm ?? '—'),
  },
  {
    header: humanizeField('gestational_age_weeks'),
    accessorKey: 'gestational_age_weeks',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gestational_age_weeks ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'birth_weight_grams', label: humanizeField('birth_weight_grams'), type: 'number' },
  { key: 'birth_length_cm', label: humanizeField('birth_length_cm'), type: 'number' },
  { key: 'head_circumference_cm', label: humanizeField('head_circumference_cm'), type: 'number' },
  { key: 'gestational_age_weeks', label: humanizeField('gestational_age_weeks'), type: 'number' },
  { key: 'immunization_status', label: humanizeField('immunization_status') },
  { key: 'developmental_milestones', label: humanizeField('developmental_milestones') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  birth_weight_grams: '',
  birth_length_cm: '',
  head_circumference_cm: '',
  gestational_age_weeks: '',
  immunization_status: '',
  developmental_milestones: '',
  notes: '',
  recorded_at: '',
}

export function PediatricStatusListPage() {
  const resource = usePediatricStatusResource()
  const title = humanizeModuleName('MedicalRecordPediatricStatus')

  return (
    <CrudDialogPage<PediatricStatus>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.immunization_status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
