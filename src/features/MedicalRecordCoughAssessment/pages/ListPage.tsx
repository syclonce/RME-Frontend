import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useCoughAssessmentResource } from '../api'
import type { CoughAssessment } from '../types'

const columns: ColumnDef<CoughAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('has_cough'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).has_cough ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('duration_weeks'),
    accessorKey: 'duration_weeks',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).duration_weeks ?? '—'),
  },
  {
    header: humanizeField('cough_type'),
    accessorKey: 'cough_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cough_type ?? '—'),
  },
  {
    header: humanizeField('other_symptoms'),
    accessorKey: 'other_symptoms',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).other_symptoms ?? '—'),
  },
  {
    header: humanizeField('is_referred_tb_screening'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_referred_tb_screening ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'has_cough', label: humanizeField('has_cough'), type: 'checkbox' },
  { key: 'duration_weeks', label: humanizeField('duration_weeks'), type: 'number' },
  { key: 'cough_type', label: humanizeField('cough_type') },
  { key: 'other_symptoms', label: humanizeField('other_symptoms') },
  { key: 'is_referred_tb_screening', label: humanizeField('is_referred_tb_screening'), type: 'checkbox' },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: null,
  has_cough: false,
  duration_weeks: '',
  cough_type: '',
  other_symptoms: '',
  is_referred_tb_screening: false,
  assessed_by: null,
  assessed_at: '',
}

export function CoughAssessmentListPage() {
  const resource = useCoughAssessmentResource()
  const title = humanizeModuleName('MedicalRecordCoughAssessment')

  return (
    <CrudDialogPage<CoughAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.cough_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
