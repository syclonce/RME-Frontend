import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { GeneralBedEndpoint, useBedResource } from '../api'
import type { Bed } from '../types'

const columns: ColumnDef<Bed, unknown>[] = [
  {
    header: humanizeField('room_id'),
    cell: ({ row }) => <RelationLabel endpoint="/rooms" id={(row.original as unknown as Record<string, unknown>).room_id as number | null} />,
  },
  {
    header: humanizeField('bed_number'),
    accessorKey: 'bed_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bed_number ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_active ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'room_id', label: humanizeField('room_id'), type: 'relation', relationEndpoint: '/rooms', required: true },
  { key: 'bed_number', label: humanizeField('bed_number'), required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  room_id: null,
  bed_number: '',
  is_active: false,
}

const actions: WorkflowAction<Bed>[] = [
  {
    key: 'reserve',
    label: 'Pesan',
    method: 'post',
    path: (item) => `/beds/${item.id}/reserve`,
  },
  {
    key: 'release-reservation',
    label: 'Lepas Reservasi',
    method: 'post',
    path: (item) => `/beds/${item.id}/release-reservation`,
    variant: 'destructive',
  },
]

export function BedListPage() {
  const resource = useBedResource()
  const title = humanizeModuleName('GeneralBed')

  return (
    <WorkflowListPage<Bed>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={GeneralBedEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.bed_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
