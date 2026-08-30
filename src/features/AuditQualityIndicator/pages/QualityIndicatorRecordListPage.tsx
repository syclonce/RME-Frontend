import type { ColumnDef } from '@tanstack/react-table'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { useQualityIndicatorRecordResource } from '../api'
import type { QualityIndicatorRecord } from '../types'

const columns: ColumnDef<QualityIndicatorRecord, unknown>[] = [
  { header: 'Indikator', cell: ({ row }) => <RelationLabel endpoint="/quality-indicators" id={row.original.indicator_id} /> },
  { header: 'Bulan', accessorKey: 'period_month' }, { header: 'Tahun', accessorKey: 'period_year' },
  { header: 'Numerator', accessorKey: 'numerator' }, { header: 'Denominator', accessorKey: 'denominator' },
  { header: 'Capaian (%)', accessorKey: 'achieved_value' },
]
const fields: CrudField[] = [
  { key: 'indicator_id', label: 'Indikator', type: 'relation', relationEndpoint: '/quality-indicators', required: true },
  { key: 'period_month', label: 'Bulan', type: 'number', required: true }, { key: 'period_year', label: 'Tahun', type: 'number', required: true },
  { key: 'numerator', label: 'Numerator', type: 'number', required: true }, { key: 'denominator', label: 'Denominator', type: 'number', required: true },
  { key: 'recorded_by', label: 'Dicatat Oleh', type: 'combobox', relationEndpoint: '/employees' },
]

export function QualityIndicatorRecordListPage() {
  const resource = useQualityIndicatorRecordResource()
  return <CrudDialogPage<QualityIndicatorRecord> title="Capaian Indikator Mutu" description="Catat numerator dan denominator indikator setiap bulan."
    columns={columns} fields={fields} emptyForm={{ indicator_id: null, period_month: new Date().getMonth() + 1, period_year: new Date().getFullYear(), numerator: '', denominator: '', recorded_by: null }}
    itemLabel={(item) => `${item.period_month}/${item.period_year}`} resource={resource} />
}
