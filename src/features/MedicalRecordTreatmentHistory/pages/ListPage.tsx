import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordTreatmentHistoryEndpoint, useTreatmentHistoryResource } from '../api'
import type { TreatmentHistory } from '../types'

const columns: ColumnDef<TreatmentHistory, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('treatment_description'),
    accessorKey: 'treatment_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).treatment_description ?? '—'),
  },
  {
    header: humanizeField('facility_name'),
    accessorKey: 'facility_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).facility_name ?? '—'),
  },
  {
    header: humanizeField('treatment_date'),
    accessorKey: 'treatment_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).treatment_date ?? '—'),
  },
  {
    header: humanizeField('outcome'),
    accessorKey: 'outcome',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).outcome ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'treatment_description', label: humanizeField('treatment_description'), required: true },
  { key: 'facility_name', label: humanizeField('facility_name') },
  { key: 'treatment_date', label: humanizeField('treatment_date'), type: 'date' },
  { key: 'outcome', label: humanizeField('outcome') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  treatment_description: '',
  facility_name: '',
  treatment_date: '',
  outcome: '',
}

const actions: WorkflowAction<TreatmentHistory>[] = []

export function TreatmentHistoryListPage() {
  const resource = useTreatmentHistoryResource()
  const title = humanizeModuleName('MedicalRecordTreatmentHistory')

  return (
    <WorkflowListPage<TreatmentHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordTreatmentHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.treatment_description ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
