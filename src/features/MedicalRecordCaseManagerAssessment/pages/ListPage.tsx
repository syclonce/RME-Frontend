import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useCaseManagerAssessmentResource } from '../api'
import type { CaseManagerAssessment } from '../types'

const columns: ColumnDef<CaseManagerAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('case_manager_id'),
    accessorKey: 'case_manager_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).case_manager_id ?? '—'),
  },
  {
    header: humanizeField('screening_criteria'),
    accessorKey: 'screening_criteria',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).screening_criteria ?? '—'),
  },
  {
    header: humanizeField('risk_level'),
    accessorKey: 'risk_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risk_level ?? '—'),
  },
  {
    header: humanizeField('care_plan'),
    accessorKey: 'care_plan',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).care_plan ?? '—'),
  },
  {
    header: humanizeField('follow_up_needed'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).follow_up_needed ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'case_manager_id', label: humanizeField('case_manager_id'), type: 'number' },
  { key: 'screening_criteria', label: humanizeField('screening_criteria') },
  { key: 'risk_level', label: humanizeField('risk_level'), type: 'select', options: [{"value":"low","label":"Low"},{"value":"medium","label":"Medium"},{"value":"high","label":"High"}] },
  { key: 'care_plan', label: humanizeField('care_plan') },
  { key: 'follow_up_needed', label: humanizeField('follow_up_needed'), type: 'checkbox' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  case_manager_id: '',
  screening_criteria: '',
  risk_level: '',
  care_plan: '',
  follow_up_needed: false,
  assessed_at: '',
}

export function CaseManagerAssessmentListPage() {
  const resource = useCaseManagerAssessmentResource()
  const title = humanizeModuleName('MedicalRecordCaseManagerAssessment')

  return (
    <CrudDialogPage<CaseManagerAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.screening_criteria ?? `#${item.id}`}
      resource={resource}
    />
  )
}
