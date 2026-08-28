import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEmployeeIdentityCardResource } from '../api'
import type { EmployeeIdentityCard } from '../types'

const columns: ColumnDef<EmployeeIdentityCard, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('id_type'),
    accessorKey: 'id_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).id_type ?? '—'),
  },
  {
    header: humanizeField('id_number'),
    accessorKey: 'id_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).id_number ?? '—'),
  },
  {
    header: humanizeField('issued_at'),
    accessorKey: 'issued_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issued_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'number', required: true },
  { key: 'id_type', label: humanizeField('id_type'), type: 'select', required: true, options: [{"value":"KTP","label":"KTP"},{"value":"SIM","label":"SIM"},{"value":"Paspor","label":"Paspor"}] },
  { key: 'id_number', label: humanizeField('id_number'), required: true },
  { key: 'issued_at', label: humanizeField('issued_at'), type: 'date' },
]

const emptyForm = {
  employee_id: '',
  id_type: '',
  id_number: '',
  issued_at: '',
}

export function EmployeeIdentityCardListPage() {
  const resource = useEmployeeIdentityCardResource()
  const title = humanizeModuleName('PegawaiEmployeeIdentityCard')

  return (
    <CrudDialogPage<EmployeeIdentityCard>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.id_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
