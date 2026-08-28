import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLinenItemResource } from '../api'
import type { LinenItem } from '../types'

const columns: ColumnDef<LinenItem, unknown>[] = [
  {
    header: humanizeField('linen_item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/linen-items" id={(row.original as unknown as Record<string, unknown>).linen_item_id as number | null} />,
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
  {
    header: humanizeField('sent_at'),
    accessorKey: 'sent_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sent_at ?? '—'),
  },
  {
    header: humanizeField('received_at'),
    accessorKey: 'received_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_at ?? '—'),
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'linen_item_id', label: humanizeField('linen_item_id'), type: 'relation', relationEndpoint: '/linen-items', required: true },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"dikirim_londri","label":"Dikirim Londri"},{"value":"dicuci","label":"Dicuci"},{"value":"kembali_bersih","label":"Kembali Bersih"},{"value":"rusak_hilang","label":"Rusak Hilang"}] },
  { key: 'sent_at', label: humanizeField('sent_at'), type: 'date' },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number' },
]

const emptyForm = {
  linen_item_id: null,
  status: '',
  sent_at: '',
  quantity: '',
}

export function LinenItemListPage() {
  const resource = useLinenItemResource()
  const title = humanizeModuleName('InventoryLinenTracking')

  return (
    <CrudDialogPage<LinenItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
