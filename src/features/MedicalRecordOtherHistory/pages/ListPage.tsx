import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordOtherHistoryEndpoint, useOtherHistoryResource } from '../api'
import type { OtherHistory } from '../types'

const columns: ColumnDef<OtherHistory, unknown>[] = [
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
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'category', label: humanizeField('category') },
  { key: 'description', label: humanizeField('description'), required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  recorded_by: '',
  created_by: '',
  category: '',
  description: '',
  recorded_at: '',
}

const actions: WorkflowAction<OtherHistory>[] = []

export function OtherHistoryListPage() {
  const resource = useOtherHistoryResource()
  const title = humanizeModuleName('MedicalRecordOtherHistory')

  return (
    <WorkflowListPage<OtherHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordOtherHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.category ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
