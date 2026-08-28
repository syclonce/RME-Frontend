import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordIllnessProgressionHistoryEndpoint, useIllnessProgressionHistoryResource } from '../api'
import type { IllnessProgressionHistory } from '../types'

const columns: ColumnDef<IllnessProgressionHistory, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('symptom_onset_date'),
    accessorKey: 'symptom_onset_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).symptom_onset_date ?? '—'),
  },
  {
    header: humanizeField('progression_description'),
    accessorKey: 'progression_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).progression_description ?? '—'),
  },
  {
    header: humanizeField('prior_treatment'),
    accessorKey: 'prior_treatment',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prior_treatment ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'symptom_onset_date', label: humanizeField('symptom_onset_date'), type: 'date' },
  { key: 'progression_description', label: humanizeField('progression_description'), required: true },
  { key: 'prior_treatment', label: humanizeField('prior_treatment') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  symptom_onset_date: '',
  progression_description: '',
  prior_treatment: '',
}

const actions: WorkflowAction<IllnessProgressionHistory>[] = []

export function IllnessProgressionHistoryListPage() {
  const resource = useIllnessProgressionHistoryResource()
  const title = humanizeModuleName('MedicalRecordIllnessProgressionHistory')

  return (
    <WorkflowListPage<IllnessProgressionHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordIllnessProgressionHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.progression_description ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
