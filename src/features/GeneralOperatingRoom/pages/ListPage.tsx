import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGeneralOperatingRoomResource } from '../api'
import type { GeneralOperatingRoom } from '../types'

const columns: ColumnDef<GeneralOperatingRoom, unknown>[] = [
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
    header: humanizeField('equipment_notes'),
    accessorKey: 'equipment_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).equipment_notes ?? '—'),
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
  { key: 'equipment_notes', label: humanizeField('equipment_notes') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  ward_id: null,
  room_number: '',
  equipment_notes: '',
  is_active: false,
}

export function GeneralOperatingRoomListPage() {
  const resource = useGeneralOperatingRoomResource()
  const title = humanizeModuleName('GeneralOperatingRoom')

  return (
    <CrudDialogPage<GeneralOperatingRoom>
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
