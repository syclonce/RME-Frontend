import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useQualityIndicatorResource } from '../api'
import type { QualityIndicator } from '../types'

const columns: ColumnDef<QualityIndicator, unknown>[] = [
  {
    header: humanizeField('indicator_id'),
    cell: ({ row }) => <RelationLabel endpoint="/quality-indicators" id={(row.original as unknown as Record<string, unknown>).indicator_id as number | null} />,
  },
  {
    header: humanizeField('period_month'),
    accessorKey: 'period_month',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).period_month ?? '—'),
  },
  {
    header: humanizeField('period_year'),
    accessorKey: 'period_year',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).period_year ?? '—'),
  },
  {
    header: humanizeField('numerator'),
    accessorKey: 'numerator',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).numerator ?? '—'),
  },
  {
    header: humanizeField('denominator'),
    accessorKey: 'denominator',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).denominator ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'indicator_id', label: humanizeField('indicator_id'), type: 'relation', relationEndpoint: '/quality-indicators', required: true },
  { key: 'period_month', label: humanizeField('period_month'), type: 'number', required: true },
  { key: 'period_year', label: humanizeField('period_year'), type: 'number', required: true },
  { key: 'numerator', label: humanizeField('numerator'), type: 'number', required: true },
  { key: 'denominator', label: humanizeField('denominator'), type: 'number', required: true },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number' },
]

const emptyForm = {
  indicator_id: null,
  period_month: '',
  period_year: '',
  numerator: '',
  denominator: '',
  recorded_by: '',
}

export function QualityIndicatorListPage() {
  const resource = useQualityIndicatorResource()
  const title = humanizeModuleName('AuditQualityIndicator')

  return (
    <CrudDialogPage<QualityIndicator>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      resource={resource}
    />
  )
}
