import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMedicalCheckupResultResource } from '../api'
import type { MedicalCheckupResult } from '../types'

const columns: ColumnDef<MedicalCheckupResult, unknown>[] = [
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
    header: humanizeField('checkup_date'),
    accessorKey: 'checkup_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).checkup_date ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('summary'),
    accessorKey: 'summary',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).summary ?? '—'),
  },
  {
    header: humanizeField('recommendation'),
    accessorKey: 'recommendation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommendation ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
  { key: 'checkup_date', label: humanizeField('checkup_date'), type: 'date', required: true },
  { key: 'category', label: humanizeField('category') },
  { key: 'summary', label: humanizeField('summary') },
  { key: 'recommendation', label: humanizeField('recommendation') },
  { key: 'examined_by', label: humanizeField('examined_by'), type: 'number', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  patient_id: '',
  visit_id: '',
  checkup_date: '',
  category: '',
  summary: '',
  recommendation: '',
  examined_by: '',
  status: '',
}

export function MedicalCheckupResultListPage() {
  const resource = useMedicalCheckupResultResource()
  const title = humanizeModuleName('MedicalRecordMedicalCheckupResult')

  return (
    <CrudDialogPage<MedicalCheckupResult>
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
