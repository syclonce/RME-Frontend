import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordDischargeSummaryEndpoint, useDischargeSummaryResource } from '../api'
import type { DischargeSummary } from '../types'

const columns: ColumnDef<DischargeSummary, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('admission_diagnosis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnoses" id={(row.original as unknown as Record<string, unknown>).admission_diagnosis_id as number | null} />,
  },
  {
    header: humanizeField('discharge_diagnosis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnoses" id={(row.original as unknown as Record<string, unknown>).discharge_diagnosis_id as number | null} />,
  },
  {
    header: humanizeField('treatment_summary'),
    accessorKey: 'treatment_summary',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).treatment_summary ?? '—'),
  },
  {
    header: humanizeField('condition_at_discharge'),
    accessorKey: 'condition_at_discharge',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).condition_at_discharge ?? '—'),
  },
  {
    header: humanizeField('follow_up_plan'),
    accessorKey: 'follow_up_plan',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).follow_up_plan ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'admission_diagnosis_id', label: humanizeField('admission_diagnosis_id'), type: 'relation', relationEndpoint: '/diagnoses' },
  { key: 'discharge_diagnosis_id', label: humanizeField('discharge_diagnosis_id'), type: 'relation', relationEndpoint: '/diagnoses' },
  { key: 'treatment_summary', label: humanizeField('treatment_summary') },
  { key: 'condition_at_discharge', label: humanizeField('condition_at_discharge') },
  { key: 'follow_up_plan', label: humanizeField('follow_up_plan') },
  { key: 'discharge_medication', label: humanizeField('discharge_medication') },
  { key: 'authored_by', label: humanizeField('authored_by'), type: 'number', required: true },
  { key: 'authored_at', label: humanizeField('authored_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  admission_diagnosis_id: null,
  discharge_diagnosis_id: null,
  treatment_summary: '',
  condition_at_discharge: '',
  follow_up_plan: '',
  discharge_medication: '',
  authored_by: '',
  authored_at: '',
}

const actions: WorkflowAction<DischargeSummary>[] = []

export function DischargeSummaryListPage() {
  const resource = useDischargeSummaryResource()
  const title = humanizeModuleName('MedicalRecordDischargeSummary')

  return (
    <WorkflowListPage<DischargeSummary>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordDischargeSummaryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.treatment_summary ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
