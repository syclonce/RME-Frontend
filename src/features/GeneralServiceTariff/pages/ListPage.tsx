import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useServiceTariffResource } from '../api'
import type { ServiceTariff } from '../types'

const columns: ColumnDef<ServiceTariff, unknown>[] = [
  {
    header: humanizeField('service_id'),
    accessorKey: 'service_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_id ?? '—'),
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
    header: humanizeField('decree_number'),
    accessorKey: 'decree_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decree_number ?? '—'),
  },
  {
    header: humanizeField('decree_date'),
    accessorKey: 'decree_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decree_date ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'service_id', label: humanizeField('service_id'), type: 'combobox', relationEndpoint: '/services', required: true },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'price', label: humanizeField('price'), type: 'number', required: true },
  { key: 'effective_date', label: humanizeField('effective_date'), type: 'date', required: true },
  { key: 'decree_number', label: humanizeField('decree_number') },
  { key: 'decree_date', label: humanizeField('decree_date'), type: 'date' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  service_id: null,
  room_class_id: null,
  price: '',
  effective_date: '',
  decree_number: '',
  decree_date: '',
  is_active: false,
}

export function ServiceTariffListPage() {
  const resource = useServiceTariffResource()
  const title = humanizeModuleName('GeneralServiceTariff')

  return (
    <CrudDialogPage<ServiceTariff>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.decree_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
