import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordFunctionalStatusAssessmentEndpoint, useFunctionalStatusAssessmentResource } from '../api'
import type { FunctionalStatusAssessment } from '../types'

const columns: ColumnDef<FunctionalStatusAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('bathing_status'),
    accessorKey: 'bathing_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bathing_status ?? '—'),
  },
  {
    header: humanizeField('dressing_status'),
    accessorKey: 'dressing_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dressing_status ?? '—'),
  },
  {
    header: humanizeField('toileting_status'),
    accessorKey: 'toileting_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).toileting_status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'bathing_status', label: humanizeField('bathing_status'), type: 'select', options: [{"value":"independent","label":"Independent"},{"value":"assisted","label":"Assisted"},{"value":"dependent","label":"Dependent"}] },
  { key: 'dressing_status', label: humanizeField('dressing_status'), type: 'select', options: [{"value":"independent","label":"Independent"},{"value":"assisted","label":"Assisted"},{"value":"dependent","label":"Dependent"}] },
  { key: 'toileting_status', label: humanizeField('toileting_status'), type: 'select', options: [{"value":"independent","label":"Independent"},{"value":"assisted","label":"Assisted"},{"value":"dependent","label":"Dependent"}] },
  { key: 'transferring_status', label: humanizeField('transferring_status'), type: 'select', options: [{"value":"independent","label":"Independent"},{"value":"assisted","label":"Assisted"},{"value":"dependent","label":"Dependent"}] },
  { key: 'feeding_status', label: humanizeField('feeding_status'), type: 'select', options: [{"value":"independent","label":"Independent"},{"value":"assisted","label":"Assisted"},{"value":"dependent","label":"Dependent"}] },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  assessed_by: '',
  created_by: '',
  bathing_status: '',
  dressing_status: '',
  toileting_status: '',
  transferring_status: '',
  feeding_status: '',
  total_score: '',
  assessed_at: '',
}

const actions: WorkflowAction<FunctionalStatusAssessment>[] = []

export function FunctionalStatusAssessmentListPage() {
  const resource = useFunctionalStatusAssessmentResource()
  const title = humanizeModuleName('MedicalRecordFunctionalStatusAssessment')

  return (
    <WorkflowListPage<FunctionalStatusAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordFunctionalStatusAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.bathing_status ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
