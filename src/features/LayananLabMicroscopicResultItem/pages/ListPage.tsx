import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabMicroscopicResultItemEndpoint, useLabMicroscopicResultItemResource } from '../api'
import type { LabMicroscopicResultItem } from '../types'

const columns: ColumnDef<LabMicroscopicResultItem, unknown>[] = [
  {
    header: humanizeField('lab_microscopic_result_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-microscopic-results" id={(row.original as unknown as Record<string, unknown>).lab_microscopic_result_id as number | null} />,
  },
  {
    header: humanizeField('parameter_name'),
    accessorKey: 'parameter_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).parameter_name ?? '—'),
  },
  {
    header: humanizeField('value'),
    accessorKey: 'value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).value ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_microscopic_result_id', label: humanizeField('lab_microscopic_result_id'), type: 'relation', relationEndpoint: '/lab-microscopic-results', required: true },
  { key: 'parameter_name', label: humanizeField('parameter_name'), required: true },
  { key: 'value', label: humanizeField('value'), required: true },
]

const emptyForm = {
  lab_microscopic_result_id: null,
  parameter_name: '',
  value: '',
}

const actions: WorkflowAction<LabMicroscopicResultItem>[] = []

export function LabMicroscopicResultItemListPage() {
  const resource = useLabMicroscopicResultItemResource()
  const title = humanizeModuleName('LayananLabMicroscopicResultItem')

  return (
    <WorkflowListPage<LabMicroscopicResultItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabMicroscopicResultItemEndpoint}
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
