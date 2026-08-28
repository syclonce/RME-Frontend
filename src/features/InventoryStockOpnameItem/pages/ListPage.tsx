import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryStockOpnameItemEndpoint, useInventoryStockOpnameItemResource } from '../api'
import type { InventoryStockOpnameItem } from '../types'

const columns: ColumnDef<InventoryStockOpnameItem, unknown>[] = [
  {
    header: humanizeField('stock_opname_id'),
    cell: ({ row }) => <RelationLabel endpoint="/inventorystockopnames" id={(row.original as unknown as Record<string, unknown>).stock_opname_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('system_quantity'),
    accessorKey: 'system_quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).system_quantity ?? '—'),
  },
  {
    header: humanizeField('physical_quantity'),
    accessorKey: 'physical_quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).physical_quantity ?? '—'),
  },
  {
    header: humanizeField('difference'),
    accessorKey: 'difference',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).difference ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'stock_opname_id', label: humanizeField('stock_opname_id'), type: 'relation', relationEndpoint: '/inventorystockopnames', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'system_quantity', label: humanizeField('system_quantity'), type: 'number', required: true },
  { key: 'physical_quantity', label: humanizeField('physical_quantity'), type: 'number', required: true },
]

const emptyForm = {
  stock_opname_id: null,
  item_id: null,
  system_quantity: '',
  physical_quantity: '',
}

const actions: WorkflowAction<InventoryStockOpnameItem>[] = []

export function InventoryStockOpnameItemListPage() {
  const resource = useInventoryStockOpnameItemResource()
  const title = humanizeModuleName('InventoryStockOpnameItem')

  return (
    <WorkflowListPage<InventoryStockOpnameItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryStockOpnameItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
