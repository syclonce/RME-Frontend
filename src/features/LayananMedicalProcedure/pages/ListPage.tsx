import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananMedicalProcedureEndpoint, useMedicalProcedureResource } from '../api'
import type { MedicalProcedure } from '../types'

const columns: ColumnDef<MedicalProcedure, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('service_id'),
    accessorKey: 'service_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_id ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
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
  { key: 'service_id', label: humanizeField('service_id'), type: 'number', required: true },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date' },
  { key: 'performed_by', label: humanizeField('performed_by'), type: 'number', required: true },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"completed","label":"Completed"},{"value":"cancelled","label":"Cancelled"}] },
]

const emptyForm = {
  visit_id: '',
  service_id: '',
  performed_at: '',
  performed_by: '',
  notes: '',
  status: '',
}

const actions: WorkflowAction<MedicalProcedure>[] = []

export function MedicalProcedureListPage() {
  const resource = useMedicalProcedureResource()
  const title = humanizeModuleName('LayananMedicalProcedure')

  return (
    <WorkflowListPage<MedicalProcedure>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananMedicalProcedureEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
