import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGraceRiskScoreAssessmentResource } from '../api'
import type { GraceRiskScoreAssessment } from '../types'

const columns: ColumnDef<GraceRiskScoreAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('age'),
    accessorKey: 'age',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).age ?? '—'),
  },
  {
    header: humanizeField('heart_rate'),
    accessorKey: 'heart_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).heart_rate ?? '—'),
  },
  {
    header: humanizeField('systolic_bp'),
    accessorKey: 'systolic_bp',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).systolic_bp ?? '—'),
  },
  {
    header: humanizeField('creatinine_mg_dl'),
    accessorKey: 'creatinine_mg_dl',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).creatinine_mg_dl ?? '—'),
  },
  {
    header: humanizeField('cardiac_arrest_at_admission'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).cardiac_arrest_at_admission ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true, section: 'Detail' },
  { key: 'age', label: humanizeField('age'), type: 'number', required: true, section: 'Detail' },
  { key: 'heart_rate', label: humanizeField('heart_rate'), type: 'number', required: true, section: 'Detail' },
  { key: 'systolic_bp', label: humanizeField('systolic_bp'), type: 'number', required: true, section: 'Detail' },
  { key: 'creatinine_mg_dl', label: humanizeField('creatinine_mg_dl'), type: 'number', required: true, section: 'Detail' },
  { key: 'cardiac_arrest_at_admission', label: humanizeField('cardiac_arrest_at_admission'), type: 'checkbox', section: 'Detail' },
  { key: 'st_segment_deviation', label: humanizeField('st_segment_deviation'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'elevated_cardiac_enzymes', label: humanizeField('elevated_cardiac_enzymes'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'killip_class', label: humanizeField('killip_class'), type: 'number', section: 'Detail Tambahan' },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number', section: 'Detail Tambahan' },
  { key: 'risk_category', label: humanizeField('risk_category'), type: 'select', options: [{"value":"low","label":"Low"},{"value":"intermediate","label":"Intermediate"},{"value":"high","label":"High"}], section: 'Detail Tambahan' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: null,
  age: '',
  heart_rate: '',
  systolic_bp: '',
  creatinine_mg_dl: '',
  cardiac_arrest_at_admission: false,
  st_segment_deviation: false,
  elevated_cardiac_enzymes: false,
  killip_class: '',
  total_score: '',
  risk_category: '',
  assessed_at: '',
}

export function GraceRiskScoreAssessmentListPage() {
  const resource = useGraceRiskScoreAssessmentResource()
  const title = humanizeModuleName('MedicalRecordGraceRiskScoreAssessment')

  return (
    <CrudDialogPage<GraceRiskScoreAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.risk_category ?? `#${item.id}`}
      resource={resource}
    />
  )
}
