import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordRadiologyResultSummaryItemEndpoint, useRadiologyResultSummaryItemResource } from '../api'
import type { RadiologyResultSummaryItem } from '../types'

const columns: ColumnDef<RadiologyResultSummaryItem, unknown>[] = [
  {
    header: humanizeField('summary_id'),
    cell: ({ row }) => <RelationLabel endpoint="/radiology-result-summaries" id={(row.original as unknown as Record<string, unknown>).summary_id as number | null} />,
  },
  {
    header: humanizeField('exam_name'),
    accessorKey: 'exam_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).exam_name ?? '—'),
  },
  {
    header: humanizeField('finding'),
    accessorKey: 'finding',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).finding ?? '—'),
  },
  {
    header: humanizeField('impression'),
    accessorKey: 'impression',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).impression ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'summary_id', label: humanizeField('summary_id'), type: 'relation', relationEndpoint: '/radiology-result-summaries', required: true },
  { key: 'exam_name', label: humanizeField('exam_name'), required: true },
  { key: 'finding', label: humanizeField('finding') },
  { key: 'impression', label: humanizeField('impression') },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date' },
]

const emptyForm = {
  summary_id: null,
  exam_name: '',
  finding: '',
  impression: '',
  performed_at: '',
}

const actions: WorkflowAction<RadiologyResultSummaryItem>[] = []

export function RadiologyResultSummaryItemListPage() {
  const resource = useRadiologyResultSummaryItemResource()
  const title = humanizeModuleName('MedicalRecordRadiologyResultSummaryItem')

  return (
    <WorkflowListPage<RadiologyResultSummaryItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordRadiologyResultSummaryItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.exam_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
