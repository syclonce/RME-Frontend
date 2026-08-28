import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordMorseFallScaleAssessmentEndpoint, useMorseFallScaleAssessmentResource } from '../api'
import type { MorseFallScaleAssessment } from '../types'

const columns: ColumnDef<MorseFallScaleAssessment, unknown>[] = [
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
    header: humanizeField('history_of_falling'),
    accessorKey: 'history_of_falling',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).history_of_falling ?? '—'),
  },
  {
    header: humanizeField('secondary_diagnosis'),
    accessorKey: 'secondary_diagnosis',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).secondary_diagnosis ?? '—'),
  },
  {
    header: humanizeField('ambulatory_aid'),
    accessorKey: 'ambulatory_aid',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ambulatory_aid ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true, section: 'Detail' },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number', section: 'Detail' },
  { key: 'history_of_falling', label: humanizeField('history_of_falling'), type: 'select', required: true, options: [{"value":"0","label":"0"},{"value":"25","label":"25"}], section: 'Detail' },
  { key: 'secondary_diagnosis', label: humanizeField('secondary_diagnosis'), type: 'select', required: true, options: [{"value":"0","label":"0"},{"value":"15","label":"15"}], section: 'Detail' },
  { key: 'ambulatory_aid', label: humanizeField('ambulatory_aid'), type: 'select', required: true, options: [{"value":"0","label":"0"},{"value":"15","label":"15"},{"value":"30","label":"30"}], section: 'Detail' },
  { key: 'iv_therapy', label: humanizeField('iv_therapy'), type: 'select', required: true, options: [{"value":"0","label":"0"},{"value":"20","label":"20"}], section: 'Detail Tambahan' },
  { key: 'gait', label: humanizeField('gait'), type: 'select', required: true, options: [{"value":"0","label":"0"},{"value":"10","label":"10"},{"value":"20","label":"20"}], section: 'Detail Tambahan' },
  { key: 'mental_status', label: humanizeField('mental_status'), type: 'select', required: true, options: [{"value":"0","label":"0"},{"value":"15","label":"15"}], section: 'Detail Tambahan' },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number', required: true, section: 'Detail Tambahan' },
  { key: 'risk_level', label: humanizeField('risk_level'), type: 'select', required: true, options: [{"value":"LOW","label":"LOW"},{"value":"MODERATE","label":"MODERATE"},{"value":"HIGH","label":"HIGH"}], section: 'Detail Tambahan' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: '',
  assessed_by: '',
  created_by: '',
  history_of_falling: '',
  secondary_diagnosis: '',
  ambulatory_aid: '',
  iv_therapy: '',
  gait: '',
  mental_status: '',
  total_score: '',
  risk_level: '',
  assessed_at: '',
}

const actions: WorkflowAction<MorseFallScaleAssessment>[] = []

export function MorseFallScaleAssessmentListPage() {
  const resource = useMorseFallScaleAssessmentResource()
  const title = humanizeModuleName('MedicalRecordMorseFallScaleAssessment')

  return (
    <WorkflowListPage<MorseFallScaleAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordMorseFallScaleAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.history_of_falling ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
