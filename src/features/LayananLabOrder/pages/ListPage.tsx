import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabOrderEndpoint, useLabOrderResource } from '../api'
import type { LabOrder } from '../types'

const columns: ColumnDef<LabOrder, unknown>[] = [
  {
    header: humanizeField('order_number'),
    accessorKey: 'order_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).order_number ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('ordered_by'),
    accessorKey: 'ordered_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordered_by ?? '—'),
  },
  {
    header: humanizeField('ordered_at'),
    accessorKey: 'ordered_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordered_at ?? '—'),
  },
  {
    header: humanizeField('destination'),
    accessorKey: 'destination',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).destination ?? '—'),
  },
  {
    header: humanizeField('is_emergency'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_emergency ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'order_number', label: humanizeField('order_number') },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'ordered_by', label: humanizeField('ordered_by'), type: 'number', required: true },
  { key: 'ordered_at', label: humanizeField('ordered_at'), type: 'date' },
  { key: 'destination', label: humanizeField('destination') },
  { key: 'is_emergency', label: humanizeField('is_emergency'), type: 'checkbox' },
  { key: 'reason', label: humanizeField('reason') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  order_number: '',
  visit_id: '',
  ordered_by: '',
  ordered_at: '',
  destination: '',
  is_emergency: false,
  reason: '',
  notes: '',
}

const actions: WorkflowAction<LabOrder>[] = []

export function LabOrderListPage() {
  const resource = useLabOrderResource()
  const title = humanizeModuleName('LayananLabOrder')

  return (
    <WorkflowListPage<LabOrder>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabOrderEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.order_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
