import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananSurgicalSafetyEvaluationResultEndpoint, useSurgicalSafetyEvaluationResultResource } from '../api'
import type { SurgicalSafetyEvaluationResult } from '../types'

const columns: ColumnDef<SurgicalSafetyEvaluationResult, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('operating_room_id'),
    cell: ({ row }) => <RelationLabel endpoint="/operating-rooms" id={(row.original as unknown as Record<string, unknown>).operating_room_id as number | null} />,
  },
  {
    header: humanizeField('evaluator_id'),
    accessorKey: 'evaluator_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).evaluator_id ?? '—'),
  },
  {
    header: humanizeField('checklist_score'),
    accessorKey: 'checklist_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).checklist_score ?? '—'),
  },
  {
    header: humanizeField('compliant'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).compliant ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('evaluated_at'),
    accessorKey: 'evaluated_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).evaluated_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'operating_room_id', label: humanizeField('operating_room_id'), type: 'relation', relationEndpoint: '/operating-rooms' },
  { key: 'evaluator_id', label: humanizeField('evaluator_id'), type: 'number' },
  { key: 'checklist_score', label: humanizeField('checklist_score'), type: 'number', required: true },
  { key: 'compliant', label: humanizeField('compliant'), type: 'checkbox' },
  { key: 'evaluated_at', label: humanizeField('evaluated_at'), type: 'date', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  operating_room_id: null,
  evaluator_id: '',
  checklist_score: '',
  compliant: false,
  evaluated_at: '',
  notes: '',
}

const actions: WorkflowAction<SurgicalSafetyEvaluationResult>[] = []

export function SurgicalSafetyEvaluationResultListPage() {
  const resource = useSurgicalSafetyEvaluationResultResource()
  const title = humanizeModuleName('LayananSurgicalSafetyEvaluationResult')

  return (
    <WorkflowListPage<SurgicalSafetyEvaluationResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananSurgicalSafetyEvaluationResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
