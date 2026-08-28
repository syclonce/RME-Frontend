import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInventoryMinimumStockLevelResource } from '../api'
import type { InventoryMinimumStockLevel } from '../types'

const columns: ColumnDef<InventoryMinimumStockLevel, unknown>[] = [
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('minimum_quantity'),
    accessorKey: 'minimum_quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).minimum_quantity ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards' },
  { key: 'minimum_quantity', label: humanizeField('minimum_quantity'), type: 'number', required: true },
]

const emptyForm = {
  item_id: null,
  ward_id: null,
  minimum_quantity: '',
}

export function InventoryMinimumStockLevelListPage() {
  const resource = useInventoryMinimumStockLevelResource()
  const title = humanizeModuleName('InventoryMinimumStockLevel')

  return (
    <CrudDialogPage<InventoryMinimumStockLevel>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      resource={resource}
    />
  )
}
