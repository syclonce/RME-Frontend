import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryReceivingRecordEndpoint, useReceivingRecordResource } from '../api'
import type { ReceivingRecord } from '../types'

const columns: ColumnDef<ReceivingRecord, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('received_by'),
    accessorKey: 'received_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_by ?? '—'),
  },
  {
    header: humanizeField('received_at'),
    accessorKey: 'received_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_at ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'received_by', label: humanizeField('received_by'), type: 'number', required: true },
  { key: 'received_at', label: humanizeField('received_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  ward_id: null,
  received_by: '',
  received_at: '',
  notes: '',
}

const actions: WorkflowAction<ReceivingRecord>[] = []

export function ReceivingRecordListPage() {
  const resource = useReceivingRecordResource()
  const title = humanizeModuleName('InventoryReceivingRecord')

  return (
    <WorkflowListPage<ReceivingRecord>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryReceivingRecordEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
