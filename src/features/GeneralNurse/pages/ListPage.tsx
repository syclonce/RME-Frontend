import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNurseResource } from '../api'
import type { Nurse } from '../types'

const columns: ColumnDef<Nurse, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('nurse_license_number'),
    accessorKey: 'nurse_license_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nurse_license_number ?? '—'),
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
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'nurse_license_number', label: humanizeField('nurse_license_number') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  employee_id: null,
  nurse_license_number: '',
  is_active: false,
}

export function NurseListPage() {
  const resource = useNurseResource()
  const title = humanizeModuleName('GeneralNurse')

  return (
    <CrudDialogPage<Nurse>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.nurse_license_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
