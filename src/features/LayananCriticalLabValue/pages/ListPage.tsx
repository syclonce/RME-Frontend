import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananCriticalLabValueEndpoint, useCriticalLabValueResource } from '../api'
import type { CriticalLabValue } from '../types'

const columns: ColumnDef<CriticalLabValue, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('parameter_name'),
    accessorKey: 'parameter_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).parameter_name ?? '—'),
  },
  {
    header: humanizeField('critical_value'),
    accessorKey: 'critical_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).critical_value ?? '—'),
  },
  {
    header: humanizeField('notified_to'),
    accessorKey: 'notified_to',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notified_to ?? '—'),
  },
  {
    header: humanizeField('notified_at'),
    accessorKey: 'notified_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notified_at ?? '—'),
  },
  {
    header: humanizeField('acknowledged'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).acknowledged ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'parameter_name', label: humanizeField('parameter_name'), required: true },
  { key: 'critical_value', label: humanizeField('critical_value'), required: true },
  { key: 'notified_to', label: humanizeField('notified_to') },
  { key: 'notified_at', label: humanizeField('notified_at'), type: 'date' },
  { key: 'acknowledged', label: humanizeField('acknowledged'), type: 'checkbox' },
]

const emptyForm = {
  lab_order_id: '',
  parameter_name: '',
  critical_value: '',
  notified_to: '',
  notified_at: '',
  acknowledged: false,
}

const actions: WorkflowAction<CriticalLabValue>[] = []

export function CriticalLabValueListPage() {
  const resource = useCriticalLabValueResource()
  const title = humanizeModuleName('LayananCriticalLabValue')

  return (
    <WorkflowListPage<CriticalLabValue>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananCriticalLabValueEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.parameter_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
