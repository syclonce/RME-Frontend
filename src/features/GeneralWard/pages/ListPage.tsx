import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useWardResource } from '../api'
import type { Ward } from '../types'

const columns: ColumnDef<Ward, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('type_id'),
    accessorKey: 'type_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).type_id ?? '—'),
  },
  {
    header: humanizeField('visit_type_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visit-types" id={(row.original as unknown as Record<string, unknown>).visit_type_id as number | null} />,
  },
  {
    header: humanizeField('allows_request'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).allows_request ? 'Ya' : 'Tidak'),
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
  { key: 'type_id', label: humanizeField('type_id'), type: 'number' },
  { key: 'visit_type_id', label: humanizeField('visit_type_id'), type: 'relation', relationEndpoint: '/visit-types' },
  { key: 'allows_request', label: humanizeField('allows_request'), type: 'checkbox' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  name: '',
  type_id: '',
  visit_type_id: null,
  allows_request: false,
  is_active: false,
}

export function WardListPage() {
  const resource = useWardResource()
  const title = humanizeModuleName('GeneralWard')

  return (
    <CrudDialogPage<Ward>
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
