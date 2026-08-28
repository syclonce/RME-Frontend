import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useOxygenTariffResource } from '../api'
import type { OxygenTariff } from '../types'

const columns: ColumnDef<OxygenTariff, unknown>[] = [
  {
    header: humanizeField('oxygen_id'),
    accessorKey: 'oxygen_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).oxygen_id ?? '—'),
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
  { key: 'oxygen_id', label: humanizeField('oxygen_id'), type: 'number' },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'price', label: humanizeField('price'), type: 'number', required: true },
  { key: 'effective_date', label: humanizeField('effective_date'), type: 'date' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  oxygen_id: '',
  room_class_id: null,
  price: '',
  effective_date: '',
  is_active: false,
}

export function OxygenTariffListPage() {
  const resource = useOxygenTariffResource()
  const title = humanizeModuleName('GeneralOxygenTariff')

  return (
    <CrudDialogPage<OxygenTariff>
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
