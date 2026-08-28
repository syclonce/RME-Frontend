import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranServiceHandoverEndpoint, useServiceHandoverResource } from '../api'
import type { ServiceHandover } from '../types'

const columns: ColumnDef<ServiceHandover, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('handed_over_by'),
    accessorKey: 'handed_over_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).handed_over_by ?? '—'),
  },
  {
    header: humanizeField('received_by'),
    accessorKey: 'received_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_by ?? '—'),
  },
  {
    header: humanizeField('handed_over_at'),
    accessorKey: 'handed_over_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).handed_over_at ?? '—'),
  },
  {
    header: humanizeField('received_at'),
    accessorKey: 'received_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'handed_over_at', label: humanizeField('handed_over_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  ward_id: null,
  handed_over_at: '',
  notes: '',
}

const actions: WorkflowAction<ServiceHandover>[] = []

export function ServiceHandoverListPage() {
  const resource = useServiceHandoverResource()
  const title = humanizeModuleName('PendaftaranServiceHandover')

  return (
    <WorkflowListPage<ServiceHandover>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranServiceHandoverEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
