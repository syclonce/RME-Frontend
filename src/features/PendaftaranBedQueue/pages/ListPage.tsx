import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranBedQueueEndpoint, useBedQueueResource } from '../api'
import type { BedQueue } from '../types'

const columns: ColumnDef<BedQueue, unknown>[] = [
  {
    header: humanizeField('bed_id'),
    cell: ({ row }) => <RelationLabel endpoint="/beds" id={(row.original as unknown as Record<string, unknown>).bed_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('queue_number'),
    accessorKey: 'queue_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).queue_number ?? '—'),
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
  { key: 'bed_id', label: humanizeField('bed_id'), type: 'relation', relationEndpoint: '/beds', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'queue_number', label: humanizeField('queue_number'), type: 'number', required: true },
]

const emptyForm = {
  bed_id: null,
  patient_id: '',
  queue_number: '',
}

const actions: WorkflowAction<BedQueue>[] = []

export function BedQueueListPage() {
  const resource = useBedQueueResource()
  const title = humanizeModuleName('PendaftaranBedQueue')

  return (
    <WorkflowListPage<BedQueue>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranBedQueueEndpoint}
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
