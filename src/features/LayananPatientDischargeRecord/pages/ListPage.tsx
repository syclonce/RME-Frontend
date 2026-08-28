import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPatientDischargeRecordEndpoint, usePatientDischargeRecordResource } from '../api'
import type { PatientDischargeRecord } from '../types'

const columns: ColumnDef<PatientDischargeRecord, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('discharged_at'),
    accessorKey: 'discharged_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).discharged_at ?? '—'),
  },
  {
    header: humanizeField('discharge_method'),
    accessorKey: 'discharge_method',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).discharge_method ?? '—'),
  },
  {
    header: humanizeField('discharged_by'),
    accessorKey: 'discharged_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).discharged_by ?? '—'),
  },
  {
    header: humanizeField('follow_up_notes'),
    accessorKey: 'follow_up_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).follow_up_notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'discharged_at', label: humanizeField('discharged_at'), type: 'date', required: true },
  { key: 'discharge_method', label: humanizeField('discharge_method'), required: true },
  { key: 'discharged_by', label: humanizeField('discharged_by'), type: 'number' },
  { key: 'follow_up_notes', label: humanizeField('follow_up_notes') },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  discharged_at: '',
  discharge_method: '',
  discharged_by: '',
  follow_up_notes: '',
}

const actions: WorkflowAction<PatientDischargeRecord>[] = []

export function PatientDischargeRecordListPage() {
  const resource = usePatientDischargeRecordResource()
  const title = humanizeModuleName('LayananPatientDischargeRecord')

  return (
    <WorkflowListPage<PatientDischargeRecord>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPatientDischargeRecordEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.discharge_method ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
