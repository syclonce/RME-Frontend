import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabOrderItemEndpoint, useLabOrderItemResource } from '../api'
import type { LabOrderItem } from '../types'

const columns: ColumnDef<LabOrderItem, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('examination_name'),
    accessorKey: 'examination_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examination_name ?? '—'),
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('price'),
    accessorKey: 'price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).price ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'examination_name', label: humanizeField('examination_name'), required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items' },
  { key: 'price', label: humanizeField('price'), type: 'number' },
]

const emptyForm = {
  lab_order_id: '',
  examination_name: '',
  item_id: null,
  price: '',
}

const actions: WorkflowAction<LabOrderItem>[] = []

export function LabOrderItemListPage() {
  const resource = useLabOrderItemResource()
  const title = humanizeModuleName('LayananLabOrderItem')

  return (
    <WorkflowListPage<LabOrderItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabOrderItemEndpoint}
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
