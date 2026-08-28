import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGeneralWardClassAssignmentResource } from '../api'
import type { GeneralWardClassAssignment } from '../types'

const columns: ColumnDef<GeneralWardClassAssignment, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('room_class_id'),
    cell: ({ row }) => <RelationLabel endpoint="/room-classes" id={(row.original as unknown as Record<string, unknown>).room_class_id as number | null} />,
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes', required: true },
]

const emptyForm = {
  ward_id: null,
  room_class_id: null,
}

export function GeneralWardClassAssignmentListPage() {
  const resource = useGeneralWardClassAssignmentResource()
  const title = humanizeModuleName('GeneralWardClassAssignment')

  return (
    <CrudDialogPage<GeneralWardClassAssignment>
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
