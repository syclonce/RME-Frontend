import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEmployeeContactResource } from '../api'
import type { EmployeeContact } from '../types'

const columns: ColumnDef<EmployeeContact, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('contact_type'),
    accessorKey: 'contact_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_type ?? '—'),
  },
  {
    header: humanizeField('value'),
    accessorKey: 'value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).value ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'contact_type', label: humanizeField('contact_type'), type: 'select', required: true, options: [{"value":"phone","label":"Phone"},{"value":"email","label":"Email"},{"value":"emergency","label":"Emergency"}] },
  { key: 'value', label: humanizeField('value'), required: true },
]

const emptyForm = {
  employee_id: null,
  contact_type: '',
  value: '',
}

export function EmployeeContactListPage() {
  const resource = useEmployeeContactResource()
  const title = humanizeModuleName('PegawaiEmployeeContact')

  return (
    <CrudDialogPage<EmployeeContact>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.contact_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
