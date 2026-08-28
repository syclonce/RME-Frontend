import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordInterventionProtocolDetailEndpoint, useInterventionProtocolDetailResource } from '../api'
import type { InterventionProtocolDetail } from '../types'

const columns: ColumnDef<InterventionProtocolDetail, unknown>[] = [
  {
    header: humanizeField('protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/intervention-protocols" id={(row.original as unknown as Record<string, unknown>).protocol_id as number | null} />,
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('step_number'),
    accessorKey: 'step_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).step_number ?? '—'),
  },
  {
    header: humanizeField('step_description'),
    accessorKey: 'step_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).step_description ?? '—'),
  },
  {
    header: humanizeField('result_notes'),
    accessorKey: 'result_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result_notes ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'protocol_id', label: humanizeField('protocol_id'), type: 'relation', relationEndpoint: '/intervention-protocols', required: true },
  { key: 'performed_by', label: humanizeField('performed_by'), type: 'number', required: true },
  { key: 'step_number', label: humanizeField('step_number'), type: 'number', required: true },
  { key: 'step_description', label: humanizeField('step_description'), required: true },
  { key: 'result_notes', label: humanizeField('result_notes') },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date' },
]

const emptyForm = {
  protocol_id: null,
  performed_by: '',
  step_number: '',
  step_description: '',
  result_notes: '',
  performed_at: '',
}

const actions: WorkflowAction<InterventionProtocolDetail>[] = []

export function InterventionProtocolDetailListPage() {
  const resource = useInterventionProtocolDetailResource()
  const title = humanizeModuleName('MedicalRecordInterventionProtocolDetail')

  return (
    <WorkflowListPage<InterventionProtocolDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordInterventionProtocolDetailEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.step_description ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
