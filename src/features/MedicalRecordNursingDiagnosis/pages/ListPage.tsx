import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNursingDiagnosisResource } from '../api'
import type { NursingDiagnosis } from '../types'

const columns: ColumnDef<NursingDiagnosis, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('diagnosis_label'),
    accessorKey: 'diagnosis_label',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis_label ?? '—'),
  },
  {
    header: humanizeField('related_factors'),
    accessorKey: 'related_factors',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).related_factors ?? '—'),
  },
  {
    header: humanizeField('defining_characteristics'),
    accessorKey: 'defining_characteristics',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).defining_characteristics ?? '—'),
  },
  {
    header: humanizeField('priority'),
    accessorKey: 'priority',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).priority ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'diagnosis_label', label: humanizeField('diagnosis_label'), required: true },
  { key: 'related_factors', label: humanizeField('related_factors') },
  { key: 'defining_characteristics', label: humanizeField('defining_characteristics') },
  { key: 'priority', label: humanizeField('priority') },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: null,
  diagnosis_label: '',
  related_factors: '',
  defining_characteristics: '',
  priority: '',
  recorded_by: null,
  recorded_at: '',
  status: '',
}

export function NursingDiagnosisListPage() {
  const resource = useNursingDiagnosisResource()
  const title = humanizeModuleName('MedicalRecordNursingDiagnosis')

  return (
    <CrudDialogPage<NursingDiagnosis>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.diagnosis_label ?? `#${item.id}`}
      resource={resource}
    />
  )
}
