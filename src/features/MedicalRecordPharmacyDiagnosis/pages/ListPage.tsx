import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePharmacyDiagnosisResource } from '../api'
import type { PharmacyDiagnosis } from '../types'

const columns: ColumnDef<PharmacyDiagnosis, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('problem_category'),
    accessorKey: 'problem_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).problem_category ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('recommendation'),
    accessorKey: 'recommendation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommendation ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'combobox', relationEndpoint: '/prescriptions' },
  { key: 'problem_category', label: humanizeField('problem_category'), required: true },
  { key: 'description', label: humanizeField('description') },
  { key: 'recommendation', label: humanizeField('recommendation') },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: null,
  prescription_id: null,
  problem_category: '',
  description: '',
  recommendation: '',
  assessed_by: null,
  assessed_at: '',
  status: '',
}

export function PharmacyDiagnosisListPage() {
  const resource = usePharmacyDiagnosisResource()
  const title = humanizeModuleName('MedicalRecordPharmacyDiagnosis')

  return (
    <CrudDialogPage<PharmacyDiagnosis>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.problem_category ?? `#${item.id}`}
      resource={resource}
    />
  )
}
