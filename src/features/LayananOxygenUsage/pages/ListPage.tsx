import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananOxygenUsageEndpoint, useOxygenUsageResource } from '../api'
import type { OxygenUsage } from '../types'

const columns: ColumnDef<OxygenUsage, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('flow_rate_lpm'),
    accessorKey: 'flow_rate_lpm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).flow_rate_lpm ?? '—'),
  },
  {
    header: humanizeField('method'),
    accessorKey: 'method',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).method ?? '—'),
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
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'flow_rate_lpm', label: humanizeField('flow_rate_lpm'), type: 'number', required: true },
  { key: 'method', label: humanizeField('method'), required: true },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date', required: true },
  { key: 'ended_at', label: humanizeField('ended_at'), type: 'date' },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number' },
]

const emptyForm = {
  visit_id: '',
  flow_rate_lpm: '',
  method: '',
  started_at: '',
  ended_at: '',
  recorded_by: '',
}

const actions: WorkflowAction<OxygenUsage>[] = []

export function OxygenUsageListPage() {
  const resource = useOxygenUsageResource()
  const title = humanizeModuleName('LayananOxygenUsage')

  return (
    <WorkflowListPage<OxygenUsage>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananOxygenUsageEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.method ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
