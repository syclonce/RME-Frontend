import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabPcrResultEndpoint, useLabPcrResultResource } from '../api'
import type { LabPcrResult } from '../types'

const columns: ColumnDef<LabPcrResult, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('target_gene'),
    accessorKey: 'target_gene',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).target_gene ?? '—'),
  },
  {
    header: humanizeField('result'),
    accessorKey: 'result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result ?? '—'),
  },
  {
    header: humanizeField('ct_value'),
    accessorKey: 'ct_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ct_value ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'target_gene', label: humanizeField('target_gene'), required: true },
  { key: 'result', label: humanizeField('result'), required: true },
  { key: 'ct_value', label: humanizeField('ct_value'), type: 'number' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  lab_order_id: '',
  target_gene: '',
  result: '',
  ct_value: '',
  examined_at: '',
}

const actions: WorkflowAction<LabPcrResult>[] = []

export function LabPcrResultListPage() {
  const resource = useLabPcrResultResource()
  const title = humanizeModuleName('LayananLabPcrResult')

  return (
    <WorkflowListPage<LabPcrResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabPcrResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.target_gene ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
