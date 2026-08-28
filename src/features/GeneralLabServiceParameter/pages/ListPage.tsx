import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLabServiceParameterResource } from '../api'
import type { LabServiceParameter } from '../types'

const columns: ColumnDef<LabServiceParameter, unknown>[] = [
  {
    header: humanizeField('lab_service_group_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-service-groups" id={(row.original as unknown as Record<string, unknown>).lab_service_group_id as number | null} />,
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
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
  { key: 'lab_service_group_id', label: humanizeField('lab_service_group_id'), type: 'relation', relationEndpoint: '/lab-service-groups' },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'code', label: humanizeField('code') },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  lab_service_group_id: null,
  name: '',
  code: '',
  unit: '',
  is_active: false,
}

export function LabServiceParameterListPage() {
  const resource = useLabServiceParameterResource()
  const title = humanizeModuleName('GeneralLabServiceParameter')

  return (
    <CrudDialogPage<LabServiceParameter>
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
