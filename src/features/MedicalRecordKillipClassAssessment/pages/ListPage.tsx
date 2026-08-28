import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordKillipClassAssessmentEndpoint, useKillipClassAssessmentResource } from '../api'
import type { KillipClassAssessment } from '../types'

const columns: ColumnDef<KillipClassAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('killip_class'),
    accessorKey: 'killip_class',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).killip_class ?? '—'),
  },
  {
    header: humanizeField('heart_rate'),
    accessorKey: 'heart_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).heart_rate ?? '—'),
  },
  {
    header: humanizeField('respiratory_rate'),
    accessorKey: 'respiratory_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).respiratory_rate ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'killip_class', label: humanizeField('killip_class'), type: 'number', required: true },
  { key: 'heart_rate', label: humanizeField('heart_rate'), type: 'number' },
  { key: 'respiratory_rate', label: humanizeField('respiratory_rate'), type: 'number' },
  { key: 'rales_present', label: humanizeField('rales_present'), type: 'checkbox' },
  { key: 's3_gallop_present', label: humanizeField('s3_gallop_present'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  assessed_by: '',
  created_by: '',
  killip_class: '',
  heart_rate: '',
  respiratory_rate: '',
  rales_present: false,
  s3_gallop_present: false,
  notes: '',
  assessed_at: '',
}

const actions: WorkflowAction<KillipClassAssessment>[] = []

export function KillipClassAssessmentListPage() {
  const resource = useKillipClassAssessmentResource()
  const title = humanizeModuleName('MedicalRecordKillipClassAssessment')

  return (
    <WorkflowListPage<KillipClassAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordKillipClassAssessmentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
