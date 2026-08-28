import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordVitalSignEndpoint, useVitalSignResource } from '../api'
import type { VitalSign } from '../types'

const columns: ColumnDef<VitalSign, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
  {
    header: humanizeField('temperature'),
    accessorKey: 'temperature',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).temperature ?? '—'),
  },
  {
    header: humanizeField('pulse'),
    accessorKey: 'pulse',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pulse ?? '—'),
  },
  {
    header: humanizeField('respiratory_rate'),
    accessorKey: 'respiratory_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).respiratory_rate ?? '—'),
  },
  {
    header: humanizeField('systolic'),
    accessorKey: 'systolic',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).systolic ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
  { key: 'temperature', label: humanizeField('temperature'), type: 'number' },
  { key: 'pulse', label: humanizeField('pulse'), type: 'number' },
  { key: 'respiratory_rate', label: humanizeField('respiratory_rate'), type: 'number' },
  { key: 'systolic', label: humanizeField('systolic'), type: 'number' },
  { key: 'diastolic', label: humanizeField('diastolic'), type: 'number' },
  { key: 'oxygen_saturation', label: humanizeField('oxygen_saturation'), type: 'number' },
  { key: 'pain_scale', label: humanizeField('pain_scale'), type: 'number' },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
]

const emptyForm = {
  visit_id: '',
  recorded_at: '',
  temperature: '',
  pulse: '',
  respiratory_rate: '',
  systolic: '',
  diastolic: '',
  oxygen_saturation: '',
  pain_scale: '',
  recorded_by: '',
}

const actions: WorkflowAction<VitalSign>[] = []

export function VitalSignListPage() {
  const resource = useVitalSignResource()
  const title = humanizeModuleName('MedicalRecordVitalSign')

  return (
    <WorkflowListPage<VitalSign>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordVitalSignEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
