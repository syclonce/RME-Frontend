import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordParentalHealthHistoryScreeningEndpoint, useParentalHealthHistoryScreeningResource } from '../api'
import type { ParentalHealthHistoryScreening } from '../types'

const columns: ColumnDef<ParentalHealthHistoryScreening, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('screened_by'),
    accessorKey: 'screened_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).screened_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('father_health_conditions'),
    accessorKey: 'father_health_conditions',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).father_health_conditions ?? '—'),
  },
  {
    header: humanizeField('mother_health_conditions'),
    accessorKey: 'mother_health_conditions',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mother_health_conditions ?? '—'),
  },
  {
    header: humanizeField('consanguinity'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).consanguinity ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'screened_by', label: humanizeField('screened_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'father_health_conditions', label: humanizeField('father_health_conditions') },
  { key: 'mother_health_conditions', label: humanizeField('mother_health_conditions') },
  { key: 'consanguinity', label: humanizeField('consanguinity'), type: 'checkbox' },
  { key: 'genetic_disorder_history', label: humanizeField('genetic_disorder_history') },
  { key: 'screened_at', label: humanizeField('screened_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  screened_by: '',
  created_by: '',
  father_health_conditions: '',
  mother_health_conditions: '',
  consanguinity: false,
  genetic_disorder_history: '',
  screened_at: '',
}

const actions: WorkflowAction<ParentalHealthHistoryScreening>[] = []

export function ParentalHealthHistoryScreeningListPage() {
  const resource = useParentalHealthHistoryScreeningResource()
  const title = humanizeModuleName('MedicalRecordParentalHealthHistoryScreening')

  return (
    <WorkflowListPage<ParentalHealthHistoryScreening>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordParentalHealthHistoryScreeningEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.father_health_conditions ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
