import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useServiceResource } from '../api'
import type { Service } from '../types'

const columns: ColumnDef<Service, unknown>[] = [
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
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('type_id'),
    accessorKey: 'type_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).type_id ?? '—'),
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
  {
    header: humanizeField('current_price'),
    accessorKey: 'current_price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).current_price ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'code', label: humanizeField('code') },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'category', label: humanizeField('category') },
  { key: 'type_id', label: humanizeField('type_id'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  code: '',
  name: '',
  category: '',
  type_id: '',
  is_active: false,
}

export function ServiceListPage() {
  const resource = useServiceResource()
  const title = humanizeModuleName('GeneralService')

  return (
    <CrudDialogPage<Service>
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
