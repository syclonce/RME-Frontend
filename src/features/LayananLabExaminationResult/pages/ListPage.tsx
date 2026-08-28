import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabExaminationResultEndpoint, useLabExaminationResultResource } from '../api'
import type { LabExaminationResult } from '../types'

const columns: ColumnDef<LabExaminationResult, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('parameter_name'),
    accessorKey: 'parameter_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).parameter_name ?? '—'),
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
    header: humanizeField('is_abnormal'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_abnormal ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'parameter_name', label: humanizeField('parameter_name'), required: true },
  { key: 'result_value', label: humanizeField('result_value'), required: true },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'reference_range', label: humanizeField('reference_range') },
  { key: 'is_abnormal', label: humanizeField('is_abnormal'), type: 'checkbox' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  lab_order_id: '',
  parameter_name: '',
  result_value: '',
  unit: '',
  reference_range: '',
  is_abnormal: false,
  examined_at: '',
}

const actions: WorkflowAction<LabExaminationResult>[] = []

export function LabExaminationResultListPage() {
  const resource = useLabExaminationResultResource()
  const title = humanizeModuleName('LayananLabExaminationResult')

  return (
    <WorkflowListPage<LabExaminationResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabExaminationResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.parameter_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
