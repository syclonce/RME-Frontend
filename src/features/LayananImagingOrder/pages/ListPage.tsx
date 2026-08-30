// codegen:preserve — studi imaging memiliki lifecycle berbeda dari order.
import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananImagingOrderEndpoint, useImagingOrderResource } from '../api'
import type { ImagingOrder } from '../types'

const columns: ColumnDef<ImagingOrder, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('modality'),
    accessorKey: 'modality',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).modality ?? '—'),
  },
  {
    header: humanizeField('body_part'),
    accessorKey: 'body_part',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).body_part ?? '—'),
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
    header: humanizeField('scheduled_at'),
    accessorKey: 'scheduled_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scheduled_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'modality', label: humanizeField('modality'), required: true },
  { key: 'body_part', label: humanizeField('body_part'), required: true },
  { key: 'ordered_by', label: humanizeField('ordered_by'), type: 'number', required: true },
  { key: 'ordered_at', label: humanizeField('ordered_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  modality: '',
  body_part: '',
  ordered_by: '',
  ordered_at: '',
}

const actions: WorkflowAction<ImagingOrder>[] = [
  {
    key: 'schedule',
    label: 'Jadwalkan',
    method: 'post',
    path: (item) => `/imaging-orders/${item.id}/schedule`,
    fields: [
        { key: 'scheduled_at', label: humanizeField('scheduled_at'), type: 'date', required: true },
    ],
    emptyForm: {
        scheduled_at: '',
    },
  },
  {
    key: 'cancel',
    label: 'Batalkan',
    method: 'post',
    path: (item) => `/imaging-orders/${item.id}/cancel`,
    variant: 'destructive',
  },
]

export function ImagingOrderListPage() {
  const resource = useImagingOrderResource()
  const title = humanizeModuleName('LayananImagingOrder')

  return (
    <WorkflowListPage<ImagingOrder>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananImagingOrderEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.modality ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
