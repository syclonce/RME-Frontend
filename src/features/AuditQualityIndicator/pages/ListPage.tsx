// codegen:preserve — master indikator, rekaman, dan tren dipisahkan.
import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type CrudField, type WorkflowAction } from '@/shared/components/WorkflowListPage'
import { humanizeModuleName } from '@/shared/labels'
import { AuditQualityIndicatorEndpoint, useQualityIndicatorResource } from '../api'
import type { QualityIndicator } from '../types'

const columns: ColumnDef<QualityIndicator, unknown>[] = [
  {
    header: 'Kode', accessorKey: 'code',
  },
  {
    header: 'Nama Indikator', accessorKey: 'name',
  },
  {
    header: 'Kategori', accessorKey: 'category',
  },
  {
    header: 'Target', accessorKey: 'target_value',
  },
  {
    header: 'Satuan', accessorKey: 'unit_of_measure',
  },
]

const fields: CrudField[] = [
  { key: 'code', label: 'Kode', required: true }, { key: 'name', label: 'Nama Indikator', required: true },
  { key: 'unit_of_measure', label: 'Satuan', required: true }, { key: 'target_value', label: 'Target', type: 'number' },
  { key: 'category', label: 'Kategori', type: 'select', required: true, options: [
    { value: 'klinis', label: 'Klinis' }, { value: 'manajerial', label: 'Manajerial' }, { value: 'sasaran_keselamatan', label: 'Sasaran Keselamatan' },
  ] },
]

const emptyForm = {
  code: '', name: '', unit_of_measure: '', target_value: '', category: 'klinis',
}

const actions: WorkflowAction<QualityIndicator>[] = [{
  key: 'trend', label: 'Lihat Tren', method: 'get', path: (item) => `/quality-indicators/${item.id}/trend`,
  fields: [{ key: 'year', label: 'Tahun', type: 'number' }], emptyForm: { year: new Date().getFullYear() }, resultTitle: 'Tren Indikator Mutu',
}]

export function QualityIndicatorListPage() {
  const resource = useQualityIndicatorResource()
  const title = humanizeModuleName('AuditQualityIndicator')

  return (
    <WorkflowListPage<QualityIndicator>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      endpoint={AuditQualityIndicatorEndpoint}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name}
      resource={resource}
      actions={actions}
    />
  )
}
