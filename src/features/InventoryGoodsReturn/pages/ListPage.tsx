import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInventoryGoodsReturnResource } from '../api'
import type { InventoryGoodsReturn } from '../types'

const columns: ColumnDef<InventoryGoodsReturn, unknown>[] = [
  {
    header: humanizeField('return_number'),
    accessorKey: 'return_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).return_number ?? '—'),
  },
  {
    header: humanizeField('supplier_id'),
    cell: ({ row }) => <RelationLabel endpoint="/suppliers" id={(row.original as unknown as Record<string, unknown>).supplier_id as number | null} />,
  },
  {
    header: humanizeField('returned_by'),
    accessorKey: 'returned_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).returned_by ?? '—'),
  },
  {
    header: humanizeField('returned_at'),
    accessorKey: 'returned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).returned_at ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'supplier_id', label: humanizeField('supplier_id'), type: 'relation', relationEndpoint: '/suppliers', required: true },
  { key: 'returned_at', label: humanizeField('returned_at'), type: 'date' },
  { key: 'reason', label: humanizeField('reason'), required: true },
]

const emptyForm = {
  supplier_id: null,
  returned_at: '',
  reason: '',
}

export function InventoryGoodsReturnListPage() {
  const resource = useInventoryGoodsReturnResource()
  const title = humanizeModuleName('InventoryGoodsReturn')

  return (
    <CrudDialogPage<InventoryGoodsReturn>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      resource={resource}
    />
  )
}
