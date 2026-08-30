import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField } from '@/shared/labels'
import { PermissionEndpoint, usePermissionResource } from '../api'
import type { Permission } from '../types'

const columns: ColumnDef<Permission, unknown>[] = [
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

export function PermissionListPage() {
  const resource = usePermissionResource()
  const title = 'Otorisasi Permission'

  return (
    <WorkflowListPage<Permission>
      title={title}
      description="Kelola daftar permission (hak akses) sistem."
      columns={columns}
      endpoint={PermissionEndpoint}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
      actions={[]}
    />
  )
}
