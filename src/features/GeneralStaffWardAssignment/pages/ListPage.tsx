import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useStaffWardAssignmentResource } from '../api'
import type { StaffWardAssignment } from '../types'

const columns: ColumnDef<StaffWardAssignment, unknown>[] = [
  {
    header: humanizeField('staff_member_id'),
    cell: ({ row }) => <RelationLabel endpoint="/staff-members" id={(row.original as unknown as Record<string, unknown>).staff_member_id as number | null} />,
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('assigned_at'),
    accessorKey: 'assigned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assigned_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'staff_member_id', label: humanizeField('staff_member_id'), type: 'relation', relationEndpoint: '/staff-members', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'assigned_at', label: humanizeField('assigned_at'), type: 'date' },
]

const emptyForm = {
  staff_member_id: null,
  ward_id: null,
  assigned_at: '',
}

export function StaffWardAssignmentListPage() {
  const resource = useStaffWardAssignmentResource()
  const title = humanizeModuleName('GeneralStaffWardAssignment')

  return (
    <CrudDialogPage<StaffWardAssignment>
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
