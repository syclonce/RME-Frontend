import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordLabResultSummaryItemEndpoint, useLabResultSummaryItemResource } from '../api'
import type { LabResultSummaryItem } from '../types'

const columns: ColumnDef<LabResultSummaryItem, unknown>[] = [
  {
    header: humanizeField('summary_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-result-summaries" id={(row.original as unknown as Record<string, unknown>).summary_id as number | null} />,
  },
  {
    header: humanizeField('lab_test_name'),
    accessorKey: 'lab_test_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_test_name ?? '—'),
  },
  {
    header: humanizeField('result_value'),
    accessorKey: 'result_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result_value ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
  {
    header: humanizeField('reference_range'),
    accessorKey: 'reference_range',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reference_range ?? '—'),
  },
  {
    header: humanizeField('flag'),
    accessorKey: 'flag',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).flag ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'summary_id', label: humanizeField('summary_id'), type: 'relation', relationEndpoint: '/lab-result-summaries', required: true },
  { key: 'lab_test_name', label: humanizeField('lab_test_name'), required: true },
  { key: 'result_value', label: humanizeField('result_value'), required: true },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'reference_range', label: humanizeField('reference_range') },
  { key: 'flag', label: humanizeField('flag'), type: 'select', options: [{"value":"normal","label":"Normal"},{"value":"high","label":"High"},{"value":"low","label":"Low"},{"value":"critical","label":"Critical"}] },
  { key: 'tested_at', label: humanizeField('tested_at'), type: 'date' },
]

const emptyForm = {
  summary_id: null,
  lab_test_name: '',
  result_value: '',
  unit: '',
  reference_range: '',
  flag: '',
  tested_at: '',
}

const actions: WorkflowAction<LabResultSummaryItem>[] = []

export function LabResultSummaryItemListPage() {
  const resource = useLabResultSummaryItemResource()
  const title = humanizeModuleName('MedicalRecordLabResultSummaryItem')

  return (
    <WorkflowListPage<LabResultSummaryItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordLabResultSummaryItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.lab_test_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
