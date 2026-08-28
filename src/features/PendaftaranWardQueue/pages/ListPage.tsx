import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranWardQueueEndpoint, useWardQueueResource } from '../api'
import type { WardQueue } from '../types'

const columns: ColumnDef<WardQueue, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('queue_number'),
    accessorKey: 'queue_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).queue_number ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('called_at'),
    accessorKey: 'called_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).called_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'queue_number', label: humanizeField('queue_number'), type: 'number', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
]

const emptyForm = {
  ward_id: null,
  queue_number: '',
  visit_id: '',
}

const actions: WorkflowAction<WardQueue>[] = []

export function WardQueueListPage() {
  const resource = useWardQueueResource()
  const title = humanizeModuleName('PendaftaranWardQueue')

  return (
    <WorkflowListPage<WardQueue>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranWardQueueEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
