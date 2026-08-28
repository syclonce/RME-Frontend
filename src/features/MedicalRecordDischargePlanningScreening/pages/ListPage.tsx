import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDischargePlanningScreeningResource } from '../api'
import type { DischargePlanningScreening } from '../types'

const columns: ColumnDef<DischargePlanningScreening, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('screening_criteria'),
    accessorKey: 'screening_criteria',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).screening_criteria ?? '—'),
  },
  {
    header: humanizeField('total_score'),
    accessorKey: 'total_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).total_score ?? '—'),
  },
  {
    header: humanizeField('requires_planning'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_planning ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('screened_by'),
    accessorKey: 'screened_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).screened_by ?? '—'),
  },
  {
    header: humanizeField('screened_at'),
    accessorKey: 'screened_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).screened_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'screening_criteria', label: humanizeField('screening_criteria') },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number' },
  { key: 'requires_planning', label: humanizeField('requires_planning'), type: 'checkbox' },
  { key: 'screened_by', label: humanizeField('screened_by'), type: 'number', required: true },
  { key: 'screened_at', label: humanizeField('screened_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  screening_criteria: '',
  total_score: '',
  requires_planning: false,
  screened_by: '',
  screened_at: '',
}

export function DischargePlanningScreeningListPage() {
  const resource = useDischargePlanningScreeningResource()
  const title = humanizeModuleName('MedicalRecordDischargePlanningScreening')

  return (
    <CrudDialogPage<DischargePlanningScreening>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.screening_criteria ?? `#${item.id}`}
      resource={resource}
    />
  )
}
