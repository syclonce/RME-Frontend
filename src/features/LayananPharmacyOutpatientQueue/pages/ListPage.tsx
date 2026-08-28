import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPharmacyOutpatientQueueEndpoint, usePharmacyOutpatientQueueResource } from '../api'
import type { PharmacyOutpatientQueue } from '../types'

const columns: ColumnDef<PharmacyOutpatientQueue, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
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
  {
    header: humanizeField('called_at'),
    accessorKey: 'called_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).called_at ?? '—'),
  },
  {
    header: humanizeField('completed_at'),
    accessorKey: 'completed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).completed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'number', required: true },
  { key: 'queue_number', label: humanizeField('queue_number'), required: true },
  { key: 'status', label: humanizeField('status'), required: true },
  { key: 'called_at', label: humanizeField('called_at'), type: 'date' },
  { key: 'completed_at', label: humanizeField('completed_at'), type: 'date' },
]

const emptyForm = {
  prescription_id: '',
  queue_number: '',
  status: '',
  called_at: '',
  completed_at: '',
}

const actions: WorkflowAction<PharmacyOutpatientQueue>[] = []

export function PharmacyOutpatientQueueListPage() {
  const resource = usePharmacyOutpatientQueueResource()
  const title = humanizeModuleName('LayananPharmacyOutpatientQueue')

  return (
    <WorkflowListPage<PharmacyOutpatientQueue>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPharmacyOutpatientQueueEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.queue_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
