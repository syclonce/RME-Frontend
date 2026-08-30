// codegen:preserve — matriks role-permission membutuhkan seluruh halaman data.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRoleResource, usePermissionList } from '../api'
import type { Role } from '../types'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useMemo } from 'react'

const columns: ColumnDef<Role, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('permissions'),
    id: 'permissions',
    cell: ({ row }) => {
      const perms = (row.original as unknown as Record<string, unknown>).permissions as string[] | undefined
      if (!perms || perms.length === 0) return <span className="text-muted-foreground text-xs">—</span>
      return (
        <div className="flex flex-wrap gap-1">
          {perms.slice(0, 3).map((p) => (
            <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
          ))}
          {perms.length > 3 && (
            <Badge variant="outline" className="text-xs">+{perms.length - 3}</Badge>
          )}
        </div>
      )
    },
  },
]

const emptyForm = {
  name: '',
  permissions: [] as string[],
}

export function RoleListPage() {
  const resource = useRoleResource()
  const title = humanizeModuleName('Authorization')

  const { data: allPermissions } = usePermissionList()
  const permissionOptions = useMemo(
    () => (allPermissions ?? []).map((p) => p.name).filter(Boolean) as string[],
    [allPermissions],
  )

  const fields: CrudField[] = [
    { key: 'name', label: humanizeField('name'), required: true },
    {
      key: 'permissions',
      label: humanizeField('permissions'),
      type: 'custom',
      render: (_value: unknown, onChange: (v: unknown) => void) => {
        const selected = (Array.isArray(_value) ? _value : []) as string[]
        const toggle = (permName: string) => {
          const next = selected.includes(permName)
            ? selected.filter((p) => p !== permName)
            : [...selected, permName]
          onChange(next)
        }
        if (permissionOptions.length === 0) {
          return <p className="text-muted-foreground text-sm">Memuat daftar permission...</p>
        }
        return (
          <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-1.5">
            {permissionOptions.map((perm) => (
              <div key={perm} className="flex items-center gap-2">
                <Checkbox
                  id={`perm-${perm}`}
                  checked={selected.includes(perm)}
                  onCheckedChange={() => toggle(perm)}
                />
                <Label htmlFor={`perm-${perm}`} className="text-sm cursor-pointer">{perm}</Label>
              </div>
            ))}
          </div>
        )
      },
    },
  ]

  return (
    <CrudDialogPage<Role>
      title={title}
      description={`Kelola data ${title.toLowerCase()} beserta permission yang dimiliki.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
