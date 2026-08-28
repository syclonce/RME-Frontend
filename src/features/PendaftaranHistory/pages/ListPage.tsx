import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranHistoryEndpoint, usePendaftaranHistoryResource } from '../api'
import type { PendaftaranHistory } from '../types'

const columns: ColumnDef<PendaftaranHistory, unknown>[] = [
  {
    header: humanizeField('registration_id'),
    accessorKey: 'registration_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registration_id ?? '—'),
  },
  {
    header: humanizeField('old_status'),
    accessorKey: 'old_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).old_status ?? '—'),
  },
  {
    header: humanizeField('new_status'),
    accessorKey: 'new_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).new_status ?? '—'),
  },
  {
    header: humanizeField('changed_by'),
    accessorKey: 'changed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).changed_by ?? '—'),
  },
  {
    header: humanizeField('changed_at'),
    accessorKey: 'changed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).changed_at ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'registration_id', label: humanizeField('registration_id'), type: 'number', required: true },
  { key: 'old_status', label: humanizeField('old_status') },
  { key: 'new_status', label: humanizeField('new_status'), required: true },
  { key: 'changed_at', label: humanizeField('changed_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  registration_id: '',
  old_status: '',
  new_status: '',
  changed_at: '',
  notes: '',
}

const actions: WorkflowAction<PendaftaranHistory>[] = []

export function PendaftaranHistoryListPage() {
  const resource = usePendaftaranHistoryResource()
  const title = humanizeModuleName('PendaftaranHistory')

  return (
    <WorkflowListPage<PendaftaranHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.old_status ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
