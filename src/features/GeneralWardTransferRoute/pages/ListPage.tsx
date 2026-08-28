import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useWardTransferRouteResource } from '../api'
import type { WardTransferRoute } from '../types'

const columns: ColumnDef<WardTransferRoute, unknown>[] = [
  {
    header: humanizeField('from_ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).from_ward_id as number | null} />,
  },
  {
    header: humanizeField('to_ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).to_ward_id as number | null} />,
  },
  {
    header: humanizeField('requires_approval'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_approval ? 'Ya' : 'Tidak'),
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
  { key: 'from_ward_id', label: humanizeField('from_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'to_ward_id', label: humanizeField('to_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'requires_approval', label: humanizeField('requires_approval'), type: 'checkbox' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  from_ward_id: null,
  to_ward_id: null,
  requires_approval: false,
  is_active: false,
}

export function WardTransferRouteListPage() {
  const resource = useWardTransferRouteResource()
  const title = humanizeModuleName('GeneralWardTransferRoute')

  return (
    <CrudDialogPage<WardTransferRoute>
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
