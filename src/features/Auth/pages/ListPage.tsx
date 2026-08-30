// codegen:preserve — pemuatan role dan validasi penugasan dibuat khusus.
import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { AuthEndpoint, useUserResource, useRoleList } from '../api'
import type { User } from '../types'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { apiClient } from '@/api/client'

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

const actions: WorkflowAction<User>[] = [
  {
    key: 'manage-roles',
    label: 'Kelola Role',
    method: 'put',
    path: (item) => `/users/${item.id}/roles`,
    fields: [
      {
        key: 'roles',
        label: humanizeField('roles'),
        type: 'custom',
        render: (value: unknown, onChange: (v: unknown) => void) => <RoleAssignmentCheckboxes value={value} onChange={onChange} />,
      },
    ],
    emptyForm: {
      roles: [] as string[],
    },
    loadInitialForm: async (item) => {
      const response = await apiClient.get(`/users/${item.id}/roles`)
      return { roles: (response.data?.roles ?? []) as string[] }
    },
    confirmDescription: (item, label) =>
      `Atur role untuk "${label(item)}". Role yang dipilih akan menggantikan role sebelumnya.`,
  },
]

function RoleAssignmentCheckboxes({
  value,
  onChange,
}: {
  value: unknown
  onChange: (v: unknown) => void
}) {
  const { data: allRoles, isLoading } = useRoleList()

  const selected = (Array.isArray(value) ? value : []) as string[]

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-36" />
      </div>
    )
  }

  const availableRoles = allRoles ?? []

  const toggle = (roleName: string) => {
    const next = selected.includes(roleName)
      ? selected.filter((r) => r !== roleName)
      : [...selected, roleName]
    onChange(next)
  }

  const cannotRemoveLast = selected.length === 1

  if (availableRoles.length === 0) {
    return <p className="text-muted-foreground text-sm">Belum ada role tersedia. Buat role di modul Otorisasi terlebih dahulu.</p>
  }

  return (
    <div className="border rounded-md p-3 max-h-56 overflow-y-auto space-y-1.5">
      {availableRoles.map((role) => (
        <div key={role} className="flex items-center gap-2">
          <Checkbox
            id={`action-role-${role}`}
            checked={selected.includes(role)}
            disabled={cannotRemoveLast && selected.includes(role)}
            onCheckedChange={() => toggle(role)}
          />
          <Label htmlFor={`action-role-${role}`} className="text-sm cursor-pointer">{role}</Label>
        </div>
      ))}
    </div>
  )
}

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
