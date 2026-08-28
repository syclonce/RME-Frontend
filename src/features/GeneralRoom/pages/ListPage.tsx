import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRoomResource } from '../api'
import type { Room } from '../types'

const columns: ColumnDef<Room, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('room_number'),
    accessorKey: 'room_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).room_number ?? '—'),
  },
  {
    header: humanizeField('class_id'),
    cell: ({ row }) => <RelationLabel endpoint="/room-classes" id={(row.original as unknown as Record<string, unknown>).class_id as number | null} />,
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
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'room_number', label: humanizeField('room_number'), required: true },
  { key: 'class_id', label: humanizeField('class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  ward_id: null,
  room_number: '',
  class_id: null,
  is_active: false,
}

export function RoomListPage() {
  const resource = useRoomResource()
  const title = humanizeModuleName('GeneralRoom')

  return (
    <CrudDialogPage<Room>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.room_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
