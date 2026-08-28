import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFunctionalAssessmentResource } from '../api'
import type { FunctionalAssessment } from '../types'

const columns: ColumnDef<FunctionalAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('assessment_date'),
    accessorKey: 'assessment_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessment_date ?? '—'),
  },
  {
    header: humanizeField('mobility_status'),
    accessorKey: 'mobility_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mobility_status ?? '—'),
  },
  {
    header: humanizeField('adl_score'),
    accessorKey: 'adl_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).adl_score ?? '—'),
  },
  {
    header: humanizeField('assistive_device'),
    accessorKey: 'assistive_device',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assistive_device ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'assessment_date', label: humanizeField('assessment_date'), type: 'date', required: true },
  { key: 'mobility_status', label: humanizeField('mobility_status') },
  { key: 'adl_score', label: humanizeField('adl_score'), type: 'number' },
  { key: 'assistive_device', label: humanizeField('assistive_device') },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: null,
  assessment_date: '',
  mobility_status: '',
  adl_score: '',
  assistive_device: '',
  assessed_by: null,
  notes: '',
}

export function FunctionalAssessmentListPage() {
  const resource = useFunctionalAssessmentResource()
  const title = humanizeModuleName('MedicalRecordFunctionalAssessment')

  return (
    <CrudDialogPage<FunctionalAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.mobility_status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
