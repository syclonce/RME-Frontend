import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordInpatientCarePlanEndpoint, useInpatientCarePlanResource } from '../api'
import type { InpatientCarePlan } from '../types'

const columns: ColumnDef<InpatientCarePlan, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('planned_by'),
    accessorKey: 'planned_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).planned_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('care_goals'),
    accessorKey: 'care_goals',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).care_goals ?? '—'),
  },
  {
    header: humanizeField('planned_length_of_stay_days'),
    accessorKey: 'planned_length_of_stay_days',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).planned_length_of_stay_days ?? '—'),
  },
  {
    header: humanizeField('discharge_criteria'),
    accessorKey: 'discharge_criteria',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).discharge_criteria ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'planned_by', label: humanizeField('planned_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'care_goals', label: humanizeField('care_goals'), required: true },
  { key: 'planned_length_of_stay_days', label: humanizeField('planned_length_of_stay_days'), type: 'number' },
  { key: 'discharge_criteria', label: humanizeField('discharge_criteria') },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"active","label":"Active"},{"value":"completed","label":"Completed"},{"value":"revised","label":"Revised"}] },
  { key: 'planned_at', label: humanizeField('planned_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  planned_by: '',
  created_by: '',
  care_goals: '',
  planned_length_of_stay_days: '',
  discharge_criteria: '',
  status: '',
  planned_at: '',
}

const actions: WorkflowAction<InpatientCarePlan>[] = []

export function InpatientCarePlanListPage() {
  const resource = useInpatientCarePlanResource()
  const title = humanizeModuleName('MedicalRecordInpatientCarePlan')

  return (
    <WorkflowListPage<InpatientCarePlan>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordInpatientCarePlanEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.care_goals ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
