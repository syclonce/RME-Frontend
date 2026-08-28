import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananRadiologyOrderItemEndpoint, useRadiologyOrderItemResource } from '../api'
import type { RadiologyOrderItem } from '../types'

const columns: ColumnDef<RadiologyOrderItem, unknown>[] = [
  {
    header: humanizeField('radiology_order_id'),
    accessorKey: 'radiology_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).radiology_order_id ?? '—'),
  },
  {
    header: humanizeField('examination_name'),
    accessorKey: 'examination_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examination_name ?? '—'),
  },
  {
    header: humanizeField('body_part'),
    accessorKey: 'body_part',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).body_part ?? '—'),
  },
  {
    header: humanizeField('price'),
    accessorKey: 'price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).price ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'radiology_order_id', label: humanizeField('radiology_order_id'), type: 'number', required: true },
  { key: 'examination_name', label: humanizeField('examination_name'), required: true },
  { key: 'body_part', label: humanizeField('body_part') },
  { key: 'price', label: humanizeField('price'), type: 'number' },
]

const emptyForm = {
  radiology_order_id: '',
  examination_name: '',
  body_part: '',
  price: '',
}

const actions: WorkflowAction<RadiologyOrderItem>[] = []

export function RadiologyOrderItemListPage() {
  const resource = useRadiologyOrderItemResource()
  const title = humanizeModuleName('LayananRadiologyOrderItem')

  return (
    <WorkflowListPage<RadiologyOrderItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananRadiologyOrderItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.examination_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
