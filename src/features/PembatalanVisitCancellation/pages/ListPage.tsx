import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembatalanVisitCancellationEndpoint, useVisitCancellationResource } from '../api'
import type { VisitCancellation } from '../types'

const columns: ColumnDef<VisitCancellation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('cancelled_by'),
    accessorKey: 'cancelled_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancelled_by ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('cancelled_at'),
    accessorKey: 'cancelled_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancelled_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'cancelled_by', label: humanizeField('cancelled_by'), type: 'number', required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'cancelled_at', label: humanizeField('cancelled_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  cancelled_by: '',
  reason: '',
  cancelled_at: '',
}

const actions: WorkflowAction<VisitCancellation>[] = []

export function VisitCancellationListPage() {
  const resource = useVisitCancellationResource()
  const title = humanizeModuleName('PembatalanVisitCancellation')

  return (
    <WorkflowListPage<VisitCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembatalanVisitCancellationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
