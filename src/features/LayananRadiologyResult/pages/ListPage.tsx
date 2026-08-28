import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananRadiologyResultEndpoint, useRadiologyResultResource } from '../api'
import type { RadiologyResult } from '../types'

const columns: ColumnDef<RadiologyResult, unknown>[] = [
  {
    header: humanizeField('radiology_order_id'),
    accessorKey: 'radiology_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).radiology_order_id ?? '—'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
  {
    header: humanizeField('impression'),
    accessorKey: 'impression',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).impression ?? '—'),
  },
  {
    header: humanizeField('radiologist_id'),
    accessorKey: 'radiologist_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).radiologist_id ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
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
  { key: 'radiology_order_id', label: humanizeField('radiology_order_id'), type: 'number', required: true },
  { key: 'findings', label: humanizeField('findings'), required: true },
  { key: 'impression', label: humanizeField('impression') },
  { key: 'radiologist_id', label: humanizeField('radiologist_id'), type: 'number' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status'), required: true },
]

const emptyForm = {
  radiology_order_id: '',
  findings: '',
  impression: '',
  radiologist_id: '',
  examined_at: '',
  status: '',
}

const actions: WorkflowAction<RadiologyResult>[] = []

export function RadiologyResultListPage() {
  const resource = useRadiologyResultResource()
  const title = humanizeModuleName('LayananRadiologyResult')

  return (
    <WorkflowListPage<RadiologyResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananRadiologyResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.findings ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
