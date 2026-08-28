import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useWardServiceResource } from '../api'
import type { WardService } from '../types'

const columns: ColumnDef<WardService, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('service_id'),
    accessorKey: 'service_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_id ?? '—'),
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
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'service_id', label: humanizeField('service_id'), type: 'combobox', relationEndpoint: '/services', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  ward_id: null,
  service_id: null,
  is_active: false,
}

export function WardServiceListPage() {
  const resource = useWardServiceResource()
  const title = humanizeModuleName('GeneralWardService')

  return (
    <CrudDialogPage<WardService>
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
