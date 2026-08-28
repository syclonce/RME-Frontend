import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordHumptyDumptyFallScaleAssessmentEndpoint, useHumptyDumptyFallScaleAssessmentResource } from '../api'
import type { HumptyDumptyFallScaleAssessment } from '../types'

const columns: ColumnDef<HumptyDumptyFallScaleAssessment, unknown>[] = [
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
    header: humanizeField('age_score'),
    accessorKey: 'age_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).age_score ?? '—'),
  },
  {
    header: humanizeField('gender_score'),
    accessorKey: 'gender_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gender_score ?? '—'),
  },
  {
    header: humanizeField('diagnosis_score'),
    accessorKey: 'diagnosis_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis_score ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true, section: 'Detail' },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number', section: 'Detail' },
  { key: 'age_score', label: humanizeField('age_score'), type: 'number', required: true, section: 'Detail' },
  { key: 'gender_score', label: humanizeField('gender_score'), type: 'number', required: true, section: 'Detail' },
  { key: 'diagnosis_score', label: humanizeField('diagnosis_score'), type: 'number', required: true, section: 'Detail' },
  { key: 'cognitive_impairment_score', label: humanizeField('cognitive_impairment_score'), type: 'number', required: true, section: 'Detail' },
  { key: 'environmental_score', label: humanizeField('environmental_score'), type: 'number', required: true, section: 'Detail Tambahan' },
  { key: 'surgery_sedation_score', label: humanizeField('surgery_sedation_score'), type: 'number', required: true, section: 'Detail Tambahan' },
  { key: 'medication_score', label: humanizeField('medication_score'), type: 'number', required: true, section: 'Detail Tambahan' },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number', required: true, section: 'Detail Tambahan' },
  { key: 'risk_level', label: humanizeField('risk_level'), type: 'select', required: true, options: [{"value":"LOW","label":"LOW"},{"value":"HIGH","label":"HIGH"}], section: 'Detail Tambahan' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: '',
  assessed_by: '',
  created_by: '',
  age_score: '',
  gender_score: '',
  diagnosis_score: '',
  cognitive_impairment_score: '',
  environmental_score: '',
  surgery_sedation_score: '',
  medication_score: '',
  total_score: '',
  risk_level: '',
  assessed_at: '',
}

const actions: WorkflowAction<HumptyDumptyFallScaleAssessment>[] = []

export function HumptyDumptyFallScaleAssessmentListPage() {
  const resource = useHumptyDumptyFallScaleAssessmentResource()
  const title = humanizeModuleName('MedicalRecordHumptyDumptyFallScaleAssessment')

  return (
    <WorkflowListPage<HumptyDumptyFallScaleAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordHumptyDumptyFallScaleAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.risk_level ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
