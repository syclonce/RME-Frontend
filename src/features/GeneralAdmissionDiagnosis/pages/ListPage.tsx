import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAdmissionDiagnosisResource } from '../api'
import type { AdmissionDiagnosis } from '../types'

const columns: ColumnDef<AdmissionDiagnosis, unknown>[] = [
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
    header: humanizeField('diagnosis_text'),
    accessorKey: 'diagnosis_text',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis_text ?? '—'),
  },
  {
    header: humanizeField('is_primary'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_primary ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('diagnosed_at'),
    accessorKey: 'diagnosed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'diagnosis_code_id', label: humanizeField('diagnosis_code_id'), type: 'relation', relationEndpoint: '/diagnosis-codes', required: true },
  { key: 'diagnosis_text', label: humanizeField('diagnosis_text') },
  { key: 'is_primary', label: humanizeField('is_primary'), type: 'checkbox' },
  { key: 'diagnosed_at', label: humanizeField('diagnosed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  diagnosis_code_id: null,
  diagnosis_text: '',
  is_primary: false,
  diagnosed_at: '',
}

export function AdmissionDiagnosisListPage() {
  const resource = useAdmissionDiagnosisResource()
  const title = humanizeModuleName('GeneralAdmissionDiagnosis')

  return (
    <CrudDialogPage<AdmissionDiagnosis>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.diagnosis_text ?? `#${item.id}`}
      resource={resource}
    />
  )
}
