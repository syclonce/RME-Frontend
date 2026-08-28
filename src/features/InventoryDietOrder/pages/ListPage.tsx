import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryDietOrderEndpoint, useDietOrderResource } from '../api'
import type { DietOrder } from '../types'

const columns: ColumnDef<DietOrder, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('diet_type'),
    accessorKey: 'diet_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diet_type ?? '—'),
  },
  {
    header: humanizeField('calorie_target'),
    accessorKey: 'calorie_target',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).calorie_target ?? '—'),
  },
  {
    header: humanizeField('allergy_notes'),
    accessorKey: 'allergy_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).allergy_notes ?? '—'),
  },
  {
    header: humanizeField('meal_schedule'),
    accessorKey: 'meal_schedule',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).meal_schedule ?? '—'),
  },
  {
    header: humanizeField('ordered_by'),
    accessorKey: 'ordered_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordered_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'diet_type', label: humanizeField('diet_type'), required: true },
  { key: 'calorie_target', label: humanizeField('calorie_target'), type: 'number' },
  { key: 'allergy_notes', label: humanizeField('allergy_notes') },
  { key: 'meal_schedule', label: humanizeField('meal_schedule'), required: true },
  { key: 'ordered_by', label: humanizeField('ordered_by'), type: 'number', required: true },
  { key: 'order_date', label: humanizeField('order_date'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  diet_type: '',
  calorie_target: '',
  allergy_notes: '',
  meal_schedule: '',
  ordered_by: '',
  order_date: '',
}

const actions: WorkflowAction<DietOrder>[] = [
  {
    key: 'status',
    label: 'Ubah Status',
    method: 'patch',
    path: (item) => `/diet-orders/${item.id}/status`,
    fields: [
        { key: 'status', label: humanizeField('status'), required: true },
    ],
    emptyForm: {
        status: '',
    },
  },
]

export function DietOrderListPage() {
  const resource = useDietOrderResource()
  const title = humanizeModuleName('InventoryDietOrder')

  return (
    <WorkflowListPage<DietOrder>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryDietOrderEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.diet_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
