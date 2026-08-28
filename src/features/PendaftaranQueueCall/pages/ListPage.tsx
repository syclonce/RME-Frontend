import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranQueueCallEndpoint, useQueueCallResource } from '../api'
import type { QueueCall } from '../types'

const columns: ColumnDef<QueueCall, unknown>[] = [
  {
    header: humanizeField('ward_queue_id'),
    cell: ({ row }) => <RelationLabel endpoint="/ward-queues" id={(row.original as unknown as Record<string, unknown>).ward_queue_id as number | null} />,
  },
  {
    header: humanizeField('called_at'),
    accessorKey: 'called_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).called_at ?? '—'),
  },
  {
    header: humanizeField('called_by'),
    accessorKey: 'called_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).called_by ?? '—'),
  },
  {
    header: humanizeField('counter'),
    accessorKey: 'counter',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).counter ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ward_queue_id', label: humanizeField('ward_queue_id'), type: 'relation', relationEndpoint: '/ward-queues', required: true },
  { key: 'counter', label: humanizeField('counter'), required: true },
]

const emptyForm = {
  ward_queue_id: null,
  counter: '',
}

const actions: WorkflowAction<QueueCall>[] = []

export function QueueCallListPage() {
  const resource = useQueueCallResource()
  const title = humanizeModuleName('PendaftaranQueueCall')

  return (
    <WorkflowListPage<QueueCall>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranQueueCallEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.counter ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
