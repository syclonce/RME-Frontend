import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useOtherServiceTariffResource } from '../api'
import type { OtherServiceTariff } from '../types'

const columns: ColumnDef<OtherServiceTariff, unknown>[] = [
  {
    header: humanizeField('other_service_id'),
    cell: ({ row }) => <RelationLabel endpoint="/other-services" id={(row.original as unknown as Record<string, unknown>).other_service_id as number | null} />,
  },
  {
    header: humanizeField('room_class_id'),
    cell: ({ row }) => <RelationLabel endpoint="/room-classes" id={(row.original as unknown as Record<string, unknown>).room_class_id as number | null} />,
  },
  {
    header: humanizeField('price'),
    accessorKey: 'price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).price ?? '—'),
  },
  {
    header: humanizeField('effective_date'),
    accessorKey: 'effective_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).effective_date ?? '—'),
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
  { key: 'other_service_id', label: humanizeField('other_service_id'), type: 'relation', relationEndpoint: '/other-services', required: true },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'price', label: humanizeField('price'), type: 'number', required: true },
  { key: 'effective_date', label: humanizeField('effective_date'), type: 'date' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  other_service_id: null,
  room_class_id: null,
  price: '',
  effective_date: '',
  is_active: false,
}

export function OtherServiceTariffListPage() {
  const resource = useOtherServiceTariffResource()
  const title = humanizeModuleName('GeneralOtherServiceTariff')

  return (
    <CrudDialogPage<OtherServiceTariff>
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
