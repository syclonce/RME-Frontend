import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMchatAssessmentExaminationResource } from '../api'
import type { MchatAssessmentExamination } from '../types'

const columns: ColumnDef<MchatAssessmentExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('total_score'),
    accessorKey: 'total_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).total_score ?? '—'),
  },
  {
    header: humanizeField('risk_level'),
    accessorKey: 'risk_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risk_level ?? '—'),
  },
  {
    header: humanizeField('responses_json'),
    accessorKey: 'responses_json',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).responses_json ?? '—'),
  },
  {
    header: humanizeField('recommendation'),
    accessorKey: 'recommendation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommendation ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number' },
  { key: 'risk_level', label: humanizeField('risk_level') },
  { key: 'responses_json', label: humanizeField('responses_json') },
  { key: 'recommendation', label: humanizeField('recommendation') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  total_score: '',
  risk_level: '',
  responses_json: '',
  recommendation: '',
  assessed_at: '',
}

export function MchatAssessmentExaminationListPage() {
  const resource = useMchatAssessmentExaminationResource()
  const title = humanizeModuleName('MedicalRecordMchatAssessmentExamination')

  return (
    <CrudDialogPage<MchatAssessmentExamination>
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
