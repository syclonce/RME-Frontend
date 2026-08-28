import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRoleResource } from '../api'
import type { Role } from '../types'

const columns: ColumnDef<Role, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'name', label: humanizeField('name'), required: true },
]

const emptyForm = {
  name: '',
}

export function RoleListPage() {
  const resource = useRoleResource()
  const title = humanizeModuleName('Authorization')

  return (
    <CrudDialogPage<Role>
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
