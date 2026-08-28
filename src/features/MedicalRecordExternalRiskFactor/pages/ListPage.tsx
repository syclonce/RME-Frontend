import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useExternalRiskFactorResource } from '../api'
import type { ExternalRiskFactor } from '../types'

const columns: ColumnDef<ExternalRiskFactor, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('factor_type'),
    accessorKey: 'factor_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).factor_type ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('impact_level'),
    accessorKey: 'impact_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).impact_level ?? '—'),
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
  { key: 'factor_type', label: humanizeField('factor_type'), required: true },
  { key: 'description', label: humanizeField('description') },
  { key: 'impact_level', label: humanizeField('impact_level') },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  factor_type: '',
  description: '',
  impact_level: '',
  recorded_by: '',
  recorded_at: '',
}

export function ExternalRiskFactorListPage() {
  const resource = useExternalRiskFactorResource()
  const title = humanizeModuleName('MedicalRecordExternalRiskFactor')

  return (
    <CrudDialogPage<ExternalRiskFactor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.factor_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
