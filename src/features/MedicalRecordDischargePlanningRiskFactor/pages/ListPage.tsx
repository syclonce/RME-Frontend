import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDischargePlanningRiskFactorResource } from '../api'
import type { DischargePlanningRiskFactor } from '../types'

const columns: ColumnDef<DischargePlanningRiskFactor, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('risk_factor'),
    accessorKey: 'risk_factor',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risk_factor ?? '—'),
  },
  {
    header: humanizeField('score'),
    accessorKey: 'score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).score ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
  {
    header: humanizeField('assessed_at'),
    accessorKey: 'assessed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'risk_factor', label: humanizeField('risk_factor'), required: true },
  { key: 'score', label: humanizeField('score'), type: 'number' },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  risk_factor: '',
  score: '',
  assessed_by: '',
  assessed_at: '',
}

export function DischargePlanningRiskFactorListPage() {
  const resource = useDischargePlanningRiskFactorResource()
  const title = humanizeModuleName('MedicalRecordDischargePlanningRiskFactor')

  return (
    <CrudDialogPage<DischargePlanningRiskFactor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.risk_factor ?? `#${item.id}`}
      resource={resource}
    />
  )
}
