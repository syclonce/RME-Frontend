import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananMortuaryRecordEndpoint, useMortuaryRecordResource } from '../api'
import type { MortuaryRecord } from '../types'

const columns: ColumnDef<MortuaryRecord, unknown>[] = [
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
    header: humanizeField('admitted_at'),
    accessorKey: 'admitted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).admitted_at ?? '—'),
  },
  {
    header: humanizeField('released_at'),
    accessorKey: 'released_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).released_at ?? '—'),
  },
  {
    header: humanizeField('cause_of_death_notes'),
    accessorKey: 'cause_of_death_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cause_of_death_notes ?? '—'),
  },
  {
    header: humanizeField('released_to_name'),
    accessorKey: 'released_to_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).released_to_name ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'admitted_at', label: humanizeField('admitted_at'), type: 'date', required: true },
  { key: 'cause_of_death_notes', label: humanizeField('cause_of_death_notes') },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  admitted_at: '',
  cause_of_death_notes: '',
}

const actions: WorkflowAction<MortuaryRecord>[] = [
  {
    key: 'release',
    label: 'Lepas',
    method: 'post',
    path: (item) => `/mortuary-records/${item.id}/release`,
    variant: 'destructive',
    fields: [
        { key: 'released_at', label: humanizeField('released_at'), type: 'date', required: true },
        { key: 'released_to_name', label: humanizeField('released_to_name'), required: true },
        { key: 'released_to_relationship', label: humanizeField('released_to_relationship') },
        { key: 'released_by', label: humanizeField('released_by'), type: 'number', required: true },
    ],
    emptyForm: {
        released_at: '',
        released_to_name: '',
        released_to_relationship: '',
        released_by: '',
    },
  },
]

export function MortuaryRecordListPage() {
  const resource = useMortuaryRecordResource()
  const title = humanizeModuleName('LayananMortuaryRecord')

  return (
    <WorkflowListPage<MortuaryRecord>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananMortuaryRecordEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.cause_of_death_notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
