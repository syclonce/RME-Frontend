import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabSensitivityResultEndpoint, useLabSensitivityResultResource } from '../api'
import type { LabSensitivityResult } from '../types'

const columns: ColumnDef<LabSensitivityResult, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('organism'),
    accessorKey: 'organism',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).organism ?? '—'),
  },
  {
    header: humanizeField('antibiotic_name'),
    accessorKey: 'antibiotic_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).antibiotic_name ?? '—'),
  },
  {
    header: humanizeField('sensitivity_result'),
    accessorKey: 'sensitivity_result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensitivity_result ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'organism', label: humanizeField('organism'), required: true },
  { key: 'antibiotic_name', label: humanizeField('antibiotic_name'), required: true },
  { key: 'sensitivity_result', label: humanizeField('sensitivity_result'), required: true },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  lab_order_id: '',
  organism: '',
  antibiotic_name: '',
  sensitivity_result: '',
  examined_at: '',
}

const actions: WorkflowAction<LabSensitivityResult>[] = []

export function LabSensitivityResultListPage() {
  const resource = useLabSensitivityResultResource()
  const title = humanizeModuleName('LayananLabSensitivityResult')

  return (
    <WorkflowListPage<LabSensitivityResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabSensitivityResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.organism ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
