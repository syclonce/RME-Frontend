import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananTelemedicineSessionEndpoint, useTelemedicineSessionResource } from '../api'
import type { TelemedicineSession } from '../types'

const columns: ColumnDef<TelemedicineSession, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_employee_id'),
    accessorKey: 'doctor_employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).doctor_employee_id ?? '—'),
  },
  {
    header: humanizeField('scheduled_at'),
    accessorKey: 'scheduled_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scheduled_at ?? '—'),
  },
  {
    header: humanizeField('started_at'),
    accessorKey: 'started_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).started_at ?? '—'),
  },
  {
    header: humanizeField('ended_at'),
    accessorKey: 'ended_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ended_at ?? '—'),
  },
  {
    header: humanizeField('session_url'),
    accessorKey: 'session_url',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).session_url ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'doctor_employee_id', label: humanizeField('doctor_employee_id'), type: 'number', required: true },
  { key: 'scheduled_at', label: humanizeField('scheduled_at'), type: 'date', required: true },
  { key: 'session_url', label: humanizeField('session_url') },
]

const emptyForm = {
  visit_id: '',
  doctor_employee_id: '',
  scheduled_at: '',
  session_url: '',
}

const actions: WorkflowAction<TelemedicineSession>[] = [
  {
    key: 'start',
    label: 'Mulai',
    method: 'post',
    path: (item) => `/telemedicine-sessions/${item.id}/start`,
  },
  {
    key: 'complete',
    label: 'Selesaikan',
    method: 'post',
    path: (item) => `/telemedicine-sessions/${item.id}/complete`,
    fields: [
        { key: 'consultation_notes', label: humanizeField('consultation_notes') },
    ],
    emptyForm: {
        consultation_notes: '',
    },
  },
]

export function TelemedicineSessionListPage() {
  const resource = useTelemedicineSessionResource()
  const title = humanizeModuleName('LayananTelemedicineSession')

  return (
    <WorkflowListPage<TelemedicineSession>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananTelemedicineSessionEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.session_url ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
