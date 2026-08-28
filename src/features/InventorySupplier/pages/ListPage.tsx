import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSupplierResource } from '../api'
import type { Supplier } from '../types'

const columns: ColumnDef<Supplier, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('contact_person'),
    accessorKey: 'contact_person',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_person ?? '—'),
  },
  {
    header: humanizeField('phone'),
    accessorKey: 'phone',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).phone ?? '—'),
  },
  {
    header: humanizeField('email'),
    accessorKey: 'email',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).email ?? '—'),
  },
  {
    header: humanizeField('address'),
    accessorKey: 'address',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).address ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'code', label: humanizeField('code') },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'contact_person', label: humanizeField('contact_person') },
  { key: 'phone', label: humanizeField('phone') },
  { key: 'email', label: humanizeField('email') },
  { key: 'address', label: humanizeField('address') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  code: '',
  name: '',
  contact_person: '',
  phone: '',
  email: '',
  address: '',
  is_active: false,
}

export function SupplierListPage() {
  const resource = useSupplierResource()
  const title = humanizeModuleName('InventorySupplier')

  return (
    <CrudDialogPage<Supplier>
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
