import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPatientDeathRecordEndpoint, usePatientDeathRecordResource } from '../api'
import type { PatientDeathRecord } from '../types'

const columns: ColumnDef<PatientDeathRecord, unknown>[] = [
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
    header: humanizeField('died_at'),
    accessorKey: 'died_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).died_at ?? '—'),
  },
  {
    header: humanizeField('cause_of_death'),
    accessorKey: 'cause_of_death',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cause_of_death ?? '—'),
  },
  {
    header: humanizeField('declared_by'),
    accessorKey: 'declared_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).declared_by ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'died_at', label: humanizeField('died_at'), type: 'date', required: true },
  { key: 'cause_of_death', label: humanizeField('cause_of_death') },
  { key: 'declared_by', label: humanizeField('declared_by'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  died_at: '',
  cause_of_death: '',
  declared_by: '',
  notes: '',
}

const actions: WorkflowAction<PatientDeathRecord>[] = []

export function PatientDeathRecordListPage() {
  const resource = usePatientDeathRecordResource()
  const title = humanizeModuleName('LayananPatientDeathRecord')

  return (
    <WorkflowListPage<PatientDeathRecord>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPatientDeathRecordEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.cause_of_death ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
