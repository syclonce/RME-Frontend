import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordInterventionProtocolEndpoint, useInterventionProtocolResource } from '../api'
import type { InterventionProtocol } from '../types'

const columns: ColumnDef<InterventionProtocol, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('started_by'),
    accessorKey: 'started_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).started_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('protocol_name'),
    accessorKey: 'protocol_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).protocol_name ?? '—'),
  },
  {
    header: humanizeField('indication'),
    accessorKey: 'indication',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indication ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'started_by', label: humanizeField('started_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'protocol_name', label: humanizeField('protocol_name'), required: true },
  { key: 'indication', label: humanizeField('indication') },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"active","label":"Active"},{"value":"completed","label":"Completed"},{"value":"discontinued","label":"Discontinued"}] },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  started_by: '',
  created_by: '',
  protocol_name: '',
  indication: '',
  status: '',
  started_at: '',
}

const actions: WorkflowAction<InterventionProtocol>[] = []

export function InterventionProtocolListPage() {
  const resource = useInterventionProtocolResource()
  const title = humanizeModuleName('MedicalRecordInterventionProtocol')

  return (
    <WorkflowListPage<InterventionProtocol>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordInterventionProtocolEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.protocol_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
