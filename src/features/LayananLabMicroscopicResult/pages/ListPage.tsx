import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabMicroscopicResultEndpoint, useLabMicroscopicResultResource } from '../api'
import type { LabMicroscopicResult } from '../types'

const columns: ColumnDef<LabMicroscopicResult, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('specimen_type'),
    accessorKey: 'specimen_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).specimen_type ?? '—'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
  {
    header: humanizeField('examined_by'),
    accessorKey: 'examined_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_by ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'specimen_type', label: humanizeField('specimen_type'), required: true },
  { key: 'findings', label: humanizeField('findings'), required: true },
  { key: 'examined_by', label: humanizeField('examined_by'), type: 'number' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  lab_order_id: '',
  specimen_type: '',
  findings: '',
  examined_by: '',
  examined_at: '',
}

const actions: WorkflowAction<LabMicroscopicResult>[] = []

export function LabMicroscopicResultListPage() {
  const resource = useLabMicroscopicResultResource()
  const title = humanizeModuleName('LayananLabMicroscopicResult')

  return (
    <WorkflowListPage<LabMicroscopicResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabMicroscopicResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.specimen_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
