import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordNursingIndicatorImplementationEndpoint, useNursingIndicatorImplementationResource } from '../api'
import type { NursingIndicatorImplementation } from '../types'

const columns: ColumnDef<NursingIndicatorImplementation, unknown>[] = [
  {
    header: humanizeField('nursing_indicator_id'),
    cell: ({ row }) => <RelationLabel endpoint="/nursing-indicators" id={(row.original as unknown as Record<string, unknown>).nursing_indicator_id as number | null} />,
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('value_recorded'),
    accessorKey: 'value_recorded',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).value_recorded ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'nursing_indicator_id', label: humanizeField('nursing_indicator_id'), type: 'relation', relationEndpoint: '/nursing-indicators', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'value_recorded', label: humanizeField('value_recorded'), required: true },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  nursing_indicator_id: null,
  visit_id: '',
  value_recorded: '',
  recorded_by: '',
  recorded_at: '',
  notes: '',
}

const actions: WorkflowAction<NursingIndicatorImplementation>[] = []

export function NursingIndicatorImplementationListPage() {
  const resource = useNursingIndicatorImplementationResource()
  const title = humanizeModuleName('MedicalRecordNursingIndicatorImplementation')

  return (
    <WorkflowListPage<NursingIndicatorImplementation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordNursingIndicatorImplementationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.value_recorded ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
