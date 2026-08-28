import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabCultureResultEndpoint, useLabCultureResultResource } from '../api'
import type { LabCultureResult } from '../types'

const columns: ColumnDef<LabCultureResult, unknown>[] = [
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
    header: humanizeField('organism_found'),
    accessorKey: 'organism_found',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).organism_found ?? '—'),
  },
  {
    header: humanizeField('colony_count'),
    accessorKey: 'colony_count',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).colony_count ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
  {
    header: humanizeField('result_status'),
    accessorKey: 'result_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result_status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'specimen_type', label: humanizeField('specimen_type'), required: true },
  { key: 'organism_found', label: humanizeField('organism_found') },
  { key: 'colony_count', label: humanizeField('colony_count') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
  { key: 'result_status', label: humanizeField('result_status'), required: true },
]

const emptyForm = {
  lab_order_id: '',
  specimen_type: '',
  organism_found: '',
  colony_count: '',
  examined_at: '',
  result_status: '',
}

const actions: WorkflowAction<LabCultureResult>[] = []

export function LabCultureResultListPage() {
  const resource = useLabCultureResultResource()
  const title = humanizeModuleName('LayananLabCultureResult')

  return (
    <WorkflowListPage<LabCultureResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabCultureResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.specimen_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
