import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePressureUlcerRiskAssessmentResource } from '../api'
import type { PressureUlcerRiskAssessment } from '../types'

const columns: ColumnDef<PressureUlcerRiskAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('sensory_perception'),
    accessorKey: 'sensory_perception',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensory_perception ?? '—'),
  },
  {
    header: humanizeField('moisture'),
    accessorKey: 'moisture',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).moisture ?? '—'),
  },
  {
    header: humanizeField('activity'),
    accessorKey: 'activity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).activity ?? '—'),
  },
  {
    header: humanizeField('mobility'),
    accessorKey: 'mobility',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mobility ?? '—'),
  },
  {
    header: humanizeField('nutrition'),
    accessorKey: 'nutrition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nutrition ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'sensory_perception', label: humanizeField('sensory_perception'), type: 'number' },
  { key: 'moisture', label: humanizeField('moisture'), type: 'number' },
  { key: 'activity', label: humanizeField('activity'), type: 'number' },
  { key: 'mobility', label: humanizeField('mobility'), type: 'number' },
  { key: 'nutrition', label: humanizeField('nutrition'), type: 'number' },
  { key: 'friction_shear', label: humanizeField('friction_shear'), type: 'number' },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number' },
  { key: 'risk_level', label: humanizeField('risk_level'), type: 'select', options: [{"value":"no_risk","label":"No Risk"},{"value":"mild_risk","label":"Mild Risk"},{"value":"moderate_risk","label":"Moderate Risk"},{"value":"high_risk","label":"High Risk"}] },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  sensory_perception: '',
  moisture: '',
  activity: '',
  mobility: '',
  nutrition: '',
  friction_shear: '',
  total_score: '',
  risk_level: '',
  assessed_at: '',
}

export function PressureUlcerRiskAssessmentListPage() {
  const resource = usePressureUlcerRiskAssessmentResource()
  const title = humanizeModuleName('MedicalRecordPressureUlcerRiskAssessment')

  return (
    <CrudDialogPage<PressureUlcerRiskAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.risk_level ?? `#${item.id}`}
      resource={resource}
    />
  )
}
