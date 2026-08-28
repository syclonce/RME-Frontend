import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananMedicalSupplyUsageEndpoint, useMedicalSupplyUsageResource } from '../api'
import type { MedicalSupplyUsage } from '../types'

const columns: ColumnDef<MedicalSupplyUsage, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
  {
    header: humanizeField('used_at'),
    accessorKey: 'used_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).used_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number' },
  { key: 'used_at', label: humanizeField('used_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status'), required: true },
]

const emptyForm = {
  visit_id: '',
  recorded_by: '',
  used_at: '',
  status: '',
}

const actions: WorkflowAction<MedicalSupplyUsage>[] = []

export function MedicalSupplyUsageListPage() {
  const resource = useMedicalSupplyUsageResource()
  const title = humanizeModuleName('LayananMedicalSupplyUsage')

  return (
    <WorkflowListPage<MedicalSupplyUsage>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananMedicalSupplyUsageEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.status ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
