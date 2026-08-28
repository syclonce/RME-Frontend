import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordPainScoreAssessmentEndpoint, usePainScoreAssessmentResource } from '../api'
import type { PainScoreAssessment } from '../types'

const columns: ColumnDef<PainScoreAssessment, unknown>[] = [
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
    header: humanizeField('scale_type'),
    accessorKey: 'scale_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scale_type ?? '—'),
  },
  {
    header: humanizeField('score'),
    accessorKey: 'score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).score ?? '—'),
  },
  {
    header: humanizeField('location'),
    accessorKey: 'location',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).location ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'scale_type', label: humanizeField('scale_type'), type: 'select', required: true, options: [{"value":"NRS","label":"NRS"},{"value":"WONG_BAKER","label":"WONG BAKER"},{"value":"FLACC","label":"FLACC"},{"value":"CRIES","label":"CRIES"}] },
  { key: 'score', label: humanizeField('score'), type: 'number', required: true },
  { key: 'location', label: humanizeField('location') },
  { key: 'character', label: humanizeField('character') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  assessed_by: '',
  created_by: '',
  scale_type: '',
  score: '',
  location: '',
  character: '',
  notes: '',
  assessed_at: '',
}

const actions: WorkflowAction<PainScoreAssessment>[] = []

export function PainScoreAssessmentListPage() {
  const resource = usePainScoreAssessmentResource()
  const title = humanizeModuleName('MedicalRecordPainScoreAssessment')

  return (
    <WorkflowListPage<PainScoreAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordPainScoreAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.scale_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
