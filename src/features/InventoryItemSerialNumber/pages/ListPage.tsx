import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInventoryItemSerialNumberResource } from '../api'
import type { InventoryItemSerialNumber } from '../types'

const columns: ColumnDef<InventoryItemSerialNumber, unknown>[] = [
  {
    header: humanizeField('ward_item_stock_id'),
    cell: ({ row }) => <RelationLabel endpoint="/inventorywarditemstocks" id={(row.original as unknown as Record<string, unknown>).ward_item_stock_id as number | null} />,
  },
  {
    header: humanizeField('serial_number'),
    accessorKey: 'serial_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).serial_number ?? '—'),
  },
  {
    header: humanizeField('expiry_date'),
    accessorKey: 'expiry_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).expiry_date ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ward_item_stock_id', label: humanizeField('ward_item_stock_id'), type: 'relation', relationEndpoint: '/inventorywarditemstocks', required: true },
  { key: 'serial_number', label: humanizeField('serial_number'), required: true },
  { key: 'expiry_date', label: humanizeField('expiry_date'), type: 'date' },
]

const emptyForm = {
  ward_item_stock_id: null,
  serial_number: '',
  expiry_date: '',
}

export function InventoryItemSerialNumberListPage() {
  const resource = useInventoryItemSerialNumberResource()
  const title = humanizeModuleName('InventoryItemSerialNumber')

  return (
    <CrudDialogPage<InventoryItemSerialNumber>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.serial_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
