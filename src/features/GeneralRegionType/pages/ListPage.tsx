import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRegionTypeResource } from '../api'
import type { RegionType } from '../types'

const columns: ColumnDef<RegionType, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('digit_count'),
    accessorKey: 'digit_count',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).digit_count ?? '—'),
  },
  {
    header: humanizeField('delimiter'),
    accessorKey: 'delimiter',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).delimiter ?? '—'),
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
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'digit_count', label: humanizeField('digit_count'), type: 'number' },
  { key: 'delimiter', label: humanizeField('delimiter') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  name: '',
  digit_count: '',
  delimiter: '',
  is_active: false,
}

export function RegionTypeListPage() {
  const resource = useRegionTypeResource()
  const title = humanizeModuleName('GeneralRegionType')

  return (
    <CrudDialogPage<RegionType>
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
