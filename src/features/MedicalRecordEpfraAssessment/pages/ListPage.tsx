import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEpfraAssessmentResource } from '../api'
import type { EpfraAssessment } from '../types'

const columns: ColumnDef<EpfraAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('assessor_id'),
    accessorKey: 'assessor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessor_id ?? '—'),
  },
  {
    header: humanizeField('criteria_notes'),
    accessorKey: 'criteria_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).criteria_notes ?? '—'),
  },
  {
    header: humanizeField('score'),
    accessorKey: 'score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).score ?? '—'),
  },
  {
    header: humanizeField('risk_level'),
    accessorKey: 'risk_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risk_level ?? '—'),
  },
  {
    header: humanizeField('assessed_at'),
    accessorKey: 'assessed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'assessor_id', label: humanizeField('assessor_id'), type: 'number' },
  { key: 'criteria_notes', label: humanizeField('criteria_notes') },
  { key: 'score', label: humanizeField('score'), type: 'number' },
  { key: 'risk_level', label: humanizeField('risk_level'), type: 'select', options: [{"value":"low","label":"Low"},{"value":"medium","label":"Medium"},{"value":"high","label":"High"}] },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  assessor_id: '',
  criteria_notes: '',
  score: '',
  risk_level: '',
  assessed_at: '',
}

export function EpfraAssessmentListPage() {
  const resource = useEpfraAssessmentResource()
  const title = humanizeModuleName('MedicalRecordEpfraAssessment')

  return (
    <CrudDialogPage<EpfraAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.criteria_notes ?? `#${item.id}`}
      resource={resource}
    />
  )
}
