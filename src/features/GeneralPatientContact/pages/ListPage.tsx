import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientContactResource } from '../api'
import type { PatientContact } from '../types'

const columns: ColumnDef<PatientContact, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('contact_type'),
    accessorKey: 'contact_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_type ?? '—'),
  },
  {
    header: humanizeField('contact_value'),
    accessorKey: 'contact_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_value ?? '—'),
  },
  {
    header: humanizeField('is_primary'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_primary ? 'Ya' : 'Tidak'),
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
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'contact_type', label: humanizeField('contact_type'), required: true },
  { key: 'contact_value', label: humanizeField('contact_value'), required: true },
  { key: 'is_primary', label: humanizeField('is_primary'), type: 'checkbox' },
]

const emptyForm = {
  patient_id: null,
  contact_type: '',
  contact_value: '',
  is_primary: false,
}

export function PatientContactListPage() {
  const resource = usePatientContactResource()
  const title = humanizeModuleName('GeneralPatientContact')

  return (
    <CrudDialogPage<PatientContact>
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
