import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordPatientNutritionProblemEndpoint, usePatientNutritionProblemResource } from '../api'
import type { PatientNutritionProblem } from '../types'

const columns: ColumnDef<PatientNutritionProblem, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('identified_by'),
    accessorKey: 'identified_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identified_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('problem_category'),
    accessorKey: 'problem_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).problem_category ?? '—'),
  },
  {
    header: humanizeField('problem_description'),
    accessorKey: 'problem_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).problem_description ?? '—'),
  },
  {
    header: humanizeField('intervention_plan'),
    accessorKey: 'intervention_plan',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).intervention_plan ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'identified_by', label: humanizeField('identified_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'problem_category', label: humanizeField('problem_category'), required: true },
  { key: 'problem_description', label: humanizeField('problem_description'), required: true },
  { key: 'intervention_plan', label: humanizeField('intervention_plan') },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"open","label":"Open"},{"value":"in_progress","label":"In Progress"},{"value":"resolved","label":"Resolved"}] },
  { key: 'identified_at', label: humanizeField('identified_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  identified_by: '',
  created_by: '',
  problem_category: '',
  problem_description: '',
  intervention_plan: '',
  status: '',
  identified_at: '',
}

const actions: WorkflowAction<PatientNutritionProblem>[] = []

export function PatientNutritionProblemListPage() {
  const resource = usePatientNutritionProblemResource()
  const title = humanizeModuleName('MedicalRecordPatientNutritionProblem')

  return (
    <WorkflowListPage<PatientNutritionProblem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordPatientNutritionProblemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.problem_category ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
