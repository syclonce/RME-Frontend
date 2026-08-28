import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePackageItemResource } from '../api'
import type { PackageItem } from '../types'

const columns: ColumnDef<PackageItem, unknown>[] = [
  {
    header: humanizeField('package_id'),
    cell: ({ row }) => <RelationLabel endpoint="/packages" id={(row.original as unknown as Record<string, unknown>).package_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
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
  { key: 'package_id', label: humanizeField('package_id'), type: 'relation', relationEndpoint: '/packages' },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items' },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  package_id: null,
  item_id: null,
  quantity: '',
  is_active: false,
}

export function PackageItemListPage() {
  const resource = usePackageItemResource()
  const title = humanizeModuleName('GeneralPackageItem')

  return (
    <CrudDialogPage<PackageItem>
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
