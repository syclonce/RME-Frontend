import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRiskFactorResource } from '../api'
import type { RiskFactor } from '../types'

const columns: ColumnDef<RiskFactor, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('risk_category'),
    accessorKey: 'risk_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risk_category ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('risk_level'),
    accessorKey: 'risk_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risk_level ?? '—'),
  },
  {
    header: humanizeField('identified_by'),
    accessorKey: 'identified_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identified_by ?? '—'),
  },
  {
    header: humanizeField('identified_at'),
    accessorKey: 'identified_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identified_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'risk_category', label: humanizeField('risk_category'), required: true },
  { key: 'description', label: humanizeField('description') },
  { key: 'risk_level', label: humanizeField('risk_level') },
  { key: 'identified_by', label: humanizeField('identified_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'identified_at', label: humanizeField('identified_at'), type: 'date', required: true },
  { key: 'mitigation_plan', label: humanizeField('mitigation_plan') },
]

const emptyForm = {
  visit_id: null,
  risk_category: '',
  description: '',
  risk_level: '',
  identified_by: null,
  identified_at: '',
  mitigation_plan: '',
}

export function RiskFactorListPage() {
  const resource = useRiskFactorResource()
  const title = humanizeModuleName('MedicalRecordRiskFactor')

  return (
    <CrudDialogPage<RiskFactor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.risk_category ?? `#${item.id}`}
      resource={resource}
    />
  )
}
