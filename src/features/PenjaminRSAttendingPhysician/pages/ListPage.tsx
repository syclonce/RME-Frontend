import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePenjaminRSAttendingPhysicianResource } from '../api'
import type { PenjaminRSAttendingPhysician } from '../types'

const columns: ColumnDef<PenjaminRSAttendingPhysician, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('assigned_at'),
    accessorKey: 'assigned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assigned_at ?? '—'),
  },
  {
    header: humanizeField('is_primary'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_primary ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'assigned_at', label: humanizeField('assigned_at'), type: 'date' },
  { key: 'is_primary', label: humanizeField('is_primary'), type: 'checkbox' },
]

const emptyForm = {
  visit_id: null,
  employee_id: null,
  assigned_at: '',
  is_primary: false,
}

export function PenjaminRSAttendingPhysicianListPage() {
  const resource = usePenjaminRSAttendingPhysicianResource()
  const title = humanizeModuleName('PenjaminRSAttendingPhysician')

  return (
    <CrudDialogPage<PenjaminRSAttendingPhysician>
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
