import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDoctorResource } from '../api'
import type { Doctor } from '../types'

const columns: ColumnDef<Doctor, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('specialization'),
    accessorKey: 'specialization',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).specialization ?? '—'),
  },
  {
    header: humanizeField('sip_number'),
    accessorKey: 'sip_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sip_number ?? '—'),
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
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'number', required: true },
  { key: 'specialization', label: humanizeField('specialization') },
  { key: 'sip_number', label: humanizeField('sip_number') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  employee_id: '',
  specialization: '',
  sip_number: '',
  is_active: false,
}

export function DoctorListPage() {
  const resource = useDoctorResource()
  const title = humanizeModuleName('GeneralDoctor')

  return (
    <CrudDialogPage<Doctor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.specialization ?? `#${item.id}`}
      resource={resource}
    />
  )
}
