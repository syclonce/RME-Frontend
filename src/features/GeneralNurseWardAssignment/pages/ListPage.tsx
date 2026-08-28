import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNurseWardAssignmentResource } from '../api'
import type { NurseWardAssignment } from '../types'

const columns: ColumnDef<NurseWardAssignment, unknown>[] = [
  {
    header: humanizeField('nurse_id'),
    accessorKey: 'nurse_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nurse_id ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('shift'),
    accessorKey: 'shift',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shift ?? '—'),
  },
  {
    header: humanizeField('assigned_at'),
    accessorKey: 'assigned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assigned_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'nurse_id', label: humanizeField('nurse_id'), type: 'combobox', relationEndpoint: '/nurses', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'shift', label: humanizeField('shift') },
  { key: 'assigned_at', label: humanizeField('assigned_at'), type: 'date' },
]

const emptyForm = {
  nurse_id: null,
  ward_id: null,
  shift: '',
  assigned_at: '',
}

export function NurseWardAssignmentListPage() {
  const resource = useNurseWardAssignmentResource()
  const title = humanizeModuleName('GeneralNurseWardAssignment')

  return (
    <CrudDialogPage<NurseWardAssignment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.shift ?? `#${item.id}`}
      resource={resource}
    />
  )
}
