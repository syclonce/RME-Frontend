import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBloodTransfusionEndpoint, useBloodTransfusionResource } from '../api'
import type { BloodTransfusion } from '../types'

const columns: ColumnDef<BloodTransfusion, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('blood_type_id'),
    cell: ({ row }) => <RelationLabel endpoint="/blood_types" id={(row.original as unknown as Record<string, unknown>).blood_type_id as number | null} />,
  },
  {
    header: humanizeField('volume_ml'),
    accessorKey: 'volume_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).volume_ml ?? '—'),
  },
  {
    header: humanizeField('started_at'),
    accessorKey: 'started_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).started_at ?? '—'),
  },
  {
    header: humanizeField('ended_at'),
    accessorKey: 'ended_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ended_at ?? '—'),
  },
  {
    header: humanizeField('administered_by'),
    accessorKey: 'administered_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).administered_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'blood_type_id', label: humanizeField('blood_type_id'), type: 'relation', relationEndpoint: '/blood_types', required: true },
  { key: 'volume_ml', label: humanizeField('volume_ml'), type: 'number' },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date' },
  { key: 'administered_by', label: humanizeField('administered_by'), type: 'number', required: true },
  { key: 'reaction_notes', label: humanizeField('reaction_notes') },
]

const emptyForm = {
  visit_id: '',
  blood_type_id: null,
  volume_ml: '',
  started_at: '',
  administered_by: '',
  reaction_notes: '',
}

const actions: WorkflowAction<BloodTransfusion>[] = []

export function BloodTransfusionListPage() {
  const resource = useBloodTransfusionResource()
  const title = humanizeModuleName('MedicalRecordBloodTransfusion')

  return (
    <WorkflowListPage<BloodTransfusion>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBloodTransfusionEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reaction_notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
