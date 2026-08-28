import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientPortalAccountResource } from '../api'
import type { PatientPortalAccount } from '../types'

const columns: ColumnDef<PatientPortalAccount, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('username'),
    accessorKey: 'username',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).username ?? '—'),
  },
  {
    header: humanizeField('email'),
    accessorKey: 'email',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).email ?? '—'),
  },
  {
    header: humanizeField('phone'),
    accessorKey: 'phone',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).phone ?? '—'),
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
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'username', label: humanizeField('username'), required: true },
  { key: 'email', label: humanizeField('email') },
  { key: 'phone', label: humanizeField('phone') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  patient_id: '',
  username: '',
  email: '',
  phone: '',
  is_active: false,
}

export function PatientPortalAccountListPage() {
  const resource = usePatientPortalAccountResource()
  const title = humanizeModuleName('PasienPatientPortalAccount')

  return (
    <CrudDialogPage<PatientPortalAccount>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.username ?? `#${item.id}`}
      resource={resource}
    />
  )
}
