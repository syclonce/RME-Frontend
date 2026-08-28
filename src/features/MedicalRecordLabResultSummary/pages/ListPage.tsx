import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordLabResultSummaryEndpoint, useLabResultSummaryResource } from '../api'
import type { LabResultSummary } from '../types'

const columns: ColumnDef<LabResultSummary, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('summarized_by'),
    accessorKey: 'summarized_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).summarized_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('overall_impression'),
    accessorKey: 'overall_impression',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).overall_impression ?? '—'),
  },
  {
    header: humanizeField('summarized_at'),
    accessorKey: 'summarized_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).summarized_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'summarized_by', label: humanizeField('summarized_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'overall_impression', label: humanizeField('overall_impression') },
  { key: 'summarized_at', label: humanizeField('summarized_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  summarized_by: '',
  created_by: '',
  overall_impression: '',
  summarized_at: '',
}

const actions: WorkflowAction<LabResultSummary>[] = []

export function LabResultSummaryListPage() {
  const resource = useLabResultSummaryResource()
  const title = humanizeModuleName('MedicalRecordLabResultSummary')

  return (
    <WorkflowListPage<LabResultSummary>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordLabResultSummaryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.overall_impression ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
