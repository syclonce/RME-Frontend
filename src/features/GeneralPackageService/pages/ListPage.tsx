import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePackageServiceResource } from '../api'
import type { PackageService } from '../types'

const columns: ColumnDef<PackageService, unknown>[] = [
  {
    header: humanizeField('package_id'),
    cell: ({ row }) => <RelationLabel endpoint="/packages" id={(row.original as unknown as Record<string, unknown>).package_id as number | null} />,
  },
  {
    header: humanizeField('service_id'),
    cell: ({ row }) => <RelationLabel endpoint="/services" id={(row.original as unknown as Record<string, unknown>).service_id as number | null} />,
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
  { key: 'service_id', label: humanizeField('service_id'), type: 'relation', relationEndpoint: '/services' },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  package_id: null,
  service_id: null,
  quantity: '',
  is_active: false,
}

export function PackageServiceListPage() {
  const resource = usePackageServiceResource()
  const title = humanizeModuleName('GeneralPackageService')

  return (
    <CrudDialogPage<PackageService>
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
