import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordPreAnesthesiaSedationAssessmentEndpoint, usePreAnesthesiaSedationAssessmentResource } from '../api'
import type { PreAnesthesiaSedationAssessment } from '../types'

const columns: ColumnDef<PreAnesthesiaSedationAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('asa_classification'),
    accessorKey: 'asa_classification',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).asa_classification ?? '—'),
  },
  {
    header: humanizeField('mallampati_class'),
    accessorKey: 'mallampati_class',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mallampati_class ?? '—'),
  },
  {
    header: humanizeField('npo_hours'),
    accessorKey: 'npo_hours',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).npo_hours ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'asa_classification', label: humanizeField('asa_classification'), type: 'select', required: true, options: [{"value":"I","label":"I"},{"value":"II","label":"II"},{"value":"III","label":"III"},{"value":"IV","label":"IV"},{"value":"V","label":"V"},{"value":"VI","label":"VI"}] },
  { key: 'mallampati_class', label: humanizeField('mallampati_class'), type: 'number' },
  { key: 'npo_hours', label: humanizeField('npo_hours'), type: 'number' },
  { key: 'comorbidities', label: humanizeField('comorbidities') },
  { key: 'planned_anesthesia_type', label: humanizeField('planned_anesthesia_type') },
  { key: 'risk_notes', label: humanizeField('risk_notes') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  doctor_id: null,
  created_by: '',
  asa_classification: '',
  mallampati_class: '',
  npo_hours: '',
  comorbidities: '',
  planned_anesthesia_type: '',
  risk_notes: '',
  assessed_at: '',
}

const actions: WorkflowAction<PreAnesthesiaSedationAssessment>[] = []

export function PreAnesthesiaSedationAssessmentListPage() {
  const resource = usePreAnesthesiaSedationAssessmentResource()
  const title = humanizeModuleName('MedicalRecordPreAnesthesiaSedationAssessment')

  return (
    <WorkflowListPage<PreAnesthesiaSedationAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordPreAnesthesiaSedationAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.asa_classification ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
