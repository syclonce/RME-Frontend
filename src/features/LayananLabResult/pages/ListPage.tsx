import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabResultEndpoint, useLabResultResource } from '../api'
import type { LabResult } from '../types'

const columns: ColumnDef<LabResult, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('test_name'),
    accessorKey: 'test_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_name ?? '—'),
  },
  {
    header: humanizeField('result_value'),
    accessorKey: 'result_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result_value ?? '—'),
  },
  {
    header: humanizeField('normal_range'),
    accessorKey: 'normal_range',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).normal_range ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
  {
    header: humanizeField('is_abnormal'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_abnormal ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'test_name', label: humanizeField('test_name'), required: true },
  { key: 'result_value', label: humanizeField('result_value'), required: true },
  { key: 'normal_range', label: humanizeField('normal_range') },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'is_abnormal', label: humanizeField('is_abnormal'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  lab_order_id: '',
  test_name: '',
  result_value: '',
  normal_range: '',
  unit: '',
  is_abnormal: false,
  notes: '',
  recorded_at: '',
}

const actions: WorkflowAction<LabResult>[] = []

export function LabResultListPage() {
  const resource = useLabResultResource()
  const title = humanizeModuleName('LayananLabResult')

  return (
    <WorkflowListPage<LabResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
