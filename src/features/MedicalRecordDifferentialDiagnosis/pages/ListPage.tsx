import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDifferentialDiagnosisResource } from '../api'
import type { DifferentialDiagnosis } from '../types'

const columns: ColumnDef<DifferentialDiagnosis, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('diagnosis_code_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnosis-codes" id={(row.original as unknown as Record<string, unknown>).diagnosis_code_id as number | null} />,
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('rank'),
    accessorKey: 'rank',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rank ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'diagnosis_code_id', label: humanizeField('diagnosis_code_id'), type: 'relation', relationEndpoint: '/diagnosis-codes' },
  { key: 'description', label: humanizeField('description'), required: true },
  { key: 'rank', label: humanizeField('rank'), type: 'number' },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: '',
  diagnosis_code_id: null,
  description: '',
  rank: '',
  recorded_by: '',
  recorded_at: '',
  status: '',
}

export function DifferentialDiagnosisListPage() {
  const resource = useDifferentialDiagnosisResource()
  const title = humanizeModuleName('MedicalRecordDifferentialDiagnosis')

  return (
    <CrudDialogPage<DifferentialDiagnosis>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.description ?? `#${item.id}`}
      resource={resource}
    />
  )
}
