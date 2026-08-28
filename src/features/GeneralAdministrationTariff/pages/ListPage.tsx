import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAdministrationTariffResource } from '../api'
import type { AdministrationTariff } from '../types'

const columns: ColumnDef<AdministrationTariff, unknown>[] = [
  {
    header: humanizeField('administration_id'),
    cell: ({ row }) => <RelationLabel endpoint="/administrations" id={(row.original as unknown as Record<string, unknown>).administration_id as number | null} />,
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
  { key: 'administration_id', label: humanizeField('administration_id'), type: 'relation', relationEndpoint: '/administrations' },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'price', label: humanizeField('price'), type: 'number', required: true },
  { key: 'effective_date', label: humanizeField('effective_date'), type: 'date' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  administration_id: null,
  room_class_id: null,
  price: '',
  effective_date: '',
  is_active: false,
}

export function AdministrationTariffListPage() {
  const resource = useAdministrationTariffResource()
  const title = humanizeModuleName('GeneralAdministrationTariff')

  return (
    <CrudDialogPage<AdministrationTariff>
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
