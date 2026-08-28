import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordTumorAssessmentEndpoint, useTumorAssessmentResource } from '../api'
import type { TumorAssessment } from '../types'

const columns: ColumnDef<TumorAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('diagnosis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnoses" id={(row.original as unknown as Record<string, unknown>).diagnosis_id as number | null} />,
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
    header: humanizeField('tumor_location'),
    accessorKey: 'tumor_location',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).tumor_location ?? '—'),
  },
  {
    header: humanizeField('size_cm'),
    accessorKey: 'size_cm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).size_cm ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'diagnosis_id', label: humanizeField('diagnosis_id'), type: 'relation', relationEndpoint: '/diagnoses', section: 'Detail' },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true, section: 'Detail' },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number', section: 'Detail' },
  { key: 'tumor_location', label: humanizeField('tumor_location'), required: true, section: 'Detail' },
  { key: 'size_cm', label: humanizeField('size_cm'), type: 'number', section: 'Detail' },
  { key: 'tnm_t', label: humanizeField('tnm_t'), section: 'Detail Tambahan' },
  { key: 'tnm_n', label: humanizeField('tnm_n'), section: 'Detail Tambahan' },
  { key: 'tnm_m', label: humanizeField('tnm_m'), section: 'Detail Tambahan' },
  { key: 'grade', label: humanizeField('grade'), section: 'Detail Tambahan' },
  { key: 'notes', label: humanizeField('notes'), section: 'Detail Tambahan' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: '',
  diagnosis_id: null,
  assessed_by: '',
  created_by: '',
  tumor_location: '',
  size_cm: '',
  tnm_t: '',
  tnm_n: '',
  tnm_m: '',
  grade: '',
  notes: '',
  assessed_at: '',
}

const actions: WorkflowAction<TumorAssessment>[] = []

export function TumorAssessmentListPage() {
  const resource = useTumorAssessmentResource()
  const title = humanizeModuleName('MedicalRecordTumorAssessment')

  return (
    <WorkflowListPage<TumorAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordTumorAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.tumor_location ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
