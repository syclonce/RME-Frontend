import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useStaffMemberResource } from '../api'
import type { StaffMember } from '../types'

const columns: ColumnDef<StaffMember, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('staff_role'),
    accessorKey: 'staff_role',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).staff_role ?? '—'),
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
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'staff_role', label: humanizeField('staff_role') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  employee_id: null,
  staff_role: '',
  is_active: false,
}

export function StaffMemberListPage() {
  const resource = useStaffMemberResource()
  const title = humanizeModuleName('GeneralStaffMember')

  return (
    <CrudDialogPage<StaffMember>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.staff_role ?? `#${item.id}`}
      resource={resource}
    />
  )
}
