import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordTriageEndpoint, useTriageResource } from '../api'
import type { Triage } from '../types'

const columns: ColumnDef<Triage, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('level'),
    accessorKey: 'level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).level ?? '—'),
  },
  {
    header: humanizeField('chief_complaint'),
    accessorKey: 'chief_complaint',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).chief_complaint ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
  {
    header: humanizeField('assessed_at'),
    accessorKey: 'assessed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_at ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'level', label: humanizeField('level'), type: 'number', required: true },
  { key: 'chief_complaint', label: humanizeField('chief_complaint') },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  level: '',
  chief_complaint: '',
  assessed_by: '',
  assessed_at: '',
  notes: '',
}

const actions: WorkflowAction<Triage>[] = []

export function TriageListPage() {
  const resource = useTriageResource()
  const title = humanizeModuleName('MedicalRecordTriage')

  return (
    <WorkflowListPage<Triage>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordTriageEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.chief_complaint ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
