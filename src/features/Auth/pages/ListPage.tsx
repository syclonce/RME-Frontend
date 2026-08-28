import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { AuthEndpoint, useUserResource } from '../api'
import type { User } from '../types'

const columns: ColumnDef<User, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('username'),
    accessorKey: 'username',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).username ?? '—'),
  },
  {
    header: humanizeField('email'),
    accessorKey: 'email',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).email ?? '—'),
  },
  {
    header: humanizeField('is_locked'),
    accessorKey: 'is_locked',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).is_locked ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_active ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('active_until'),
    accessorKey: 'active_until',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).active_until ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'username', label: humanizeField('username'), required: true },
  { key: 'email', label: humanizeField('email'), required: true },
  { key: 'password', label: humanizeField('password'), required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  name: '',
  username: '',
  email: '',
  password: '',
  is_active: false,
}

const actions: WorkflowAction<User>[] = []

export function UserListPage() {
  const resource = useUserResource()
  const title = humanizeModuleName('Auth')

  return (
    <WorkflowListPage<User>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={AuthEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
