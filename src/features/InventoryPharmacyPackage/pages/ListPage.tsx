import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInventoryPharmacyPackageResource } from '../api'
import type { InventoryPharmacyPackage } from '../types'

const columns: ColumnDef<InventoryPharmacyPackage, unknown>[] = [
  {
    header: humanizeField('package_code'),
    accessorKey: 'package_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).package_code ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('pharmacy_service_room_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pharmacy-service-rooms" id={(row.original as unknown as Record<string, unknown>).pharmacy_service_room_id as number | null} />,
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('price'),
    accessorKey: 'price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).price ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'package_code', label: humanizeField('package_code'), required: true },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'pharmacy_service_room_id', label: humanizeField('pharmacy_service_room_id'), type: 'relation', relationEndpoint: '/pharmacy-service-rooms' },
  { key: 'category', label: humanizeField('category'), type: 'select', required: true, options: [{"value":"obat","label":"Obat"},{"value":"alkes","label":"Alkes"},{"value":"campuran","label":"Campuran"}] },
  { key: 'price', label: humanizeField('price'), type: 'number', required: true },
  { key: 'description', label: humanizeField('description') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  package_code: '',
  name: '',
  pharmacy_service_room_id: null,
  category: '',
  price: '',
  description: '',
  is_active: false,
}

export function InventoryPharmacyPackageListPage() {
  const resource = useInventoryPharmacyPackageResource()
  const title = humanizeModuleName('InventoryPharmacyPackage')

  return (
    <CrudDialogPage<InventoryPharmacyPackage>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
