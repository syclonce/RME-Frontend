import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDiscountResource } from '../api'
import type { Discount } from '../types'

const columns: ColumnDef<Discount, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('discount_type'),
    accessorKey: 'discount_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).discount_type ?? '—'),
  },
  {
    header: humanizeField('value'),
    accessorKey: 'value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).value ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) =>
      (row.original as unknown as Record<string, unknown>).is_active ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">Nonaktif</Badge>
      ),
  },
]

const fields: CrudField[] = [
  { key: 'code', label: humanizeField('code'), required: true },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'discount_type', label: humanizeField('discount_type'), required: true },
  { key: 'value', label: humanizeField('value'), type: 'number', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  code: '',
  name: '',
  discount_type: '',
  value: '',
  is_active: false,
}

export function DiscountListPage() {
  const resource = useDiscountResource()
  const title = humanizeModuleName('PembayaranDiscount')

  return (
    <CrudDialogPage<Discount>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
