import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananEarlyWarningScoreEndpoint, useVitalSignObservationResource } from '../api'
import type { VitalSignObservation } from '../types'

const columns: ColumnDef<VitalSignObservation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('respiratory_rate'),
    accessorKey: 'respiratory_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).respiratory_rate ?? '—'),
  },
  {
    header: humanizeField('spo2'),
    accessorKey: 'spo2',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).spo2 ?? '—'),
  },
  {
    header: humanizeField('systolic_bp'),
    accessorKey: 'systolic_bp',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).systolic_bp ?? '—'),
  },
  {
    header: humanizeField('pulse_rate'),
    accessorKey: 'pulse_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pulse_rate ?? '—'),
  },
  {
    header: humanizeField('consciousness_level'),
    accessorKey: 'consciousness_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).consciousness_level ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'respiratory_rate', label: humanizeField('respiratory_rate'), type: 'number', required: true },
  { key: 'spo2', label: humanizeField('spo2'), type: 'number', required: true },
  { key: 'systolic_bp', label: humanizeField('systolic_bp'), type: 'number', required: true },
  { key: 'pulse_rate', label: humanizeField('pulse_rate'), type: 'number', required: true },
  { key: 'consciousness_level', label: humanizeField('consciousness_level'), required: true },
  { key: 'temperature_celsius', label: humanizeField('temperature_celsius'), type: 'number', required: true },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  respiratory_rate: '',
  spo2: '',
  systolic_bp: '',
  pulse_rate: '',
  consciousness_level: '',
  temperature_celsius: '',
  recorded_by: '',
  recorded_at: '',
}

const actions: WorkflowAction<VitalSignObservation>[] = []

export function VitalSignObservationListPage() {
  const resource = useVitalSignObservationResource()
  const title = humanizeModuleName('LayananEarlyWarningScore')

  return (
    <WorkflowListPage<VitalSignObservation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananEarlyWarningScoreEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.consciousness_level ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
