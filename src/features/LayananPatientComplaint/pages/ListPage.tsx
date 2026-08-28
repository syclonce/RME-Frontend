import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientComplaintResource } from '../api'
import type { PatientComplaint } from '../types'

const columns: ColumnDef<PatientComplaint, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('submitted_at'),
    accessorKey: 'submitted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).submitted_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
  { key: 'category', label: humanizeField('category'), required: true },
  { key: 'description', label: humanizeField('description'), required: true },
  { key: 'submitted_at', label: humanizeField('submitted_at'), type: 'date', required: true },
]

const emptyForm = {
  patient_id: '',
  visit_id: '',
  category: '',
  description: '',
  submitted_at: '',
}

export function PatientComplaintListPage() {
  const resource = usePatientComplaintResource()
  const title = humanizeModuleName('LayananPatientComplaint')

  return (
    <CrudDialogPage<PatientComplaint>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.category ?? `#${item.id}`}
      resource={resource}
    />
  )
}
