import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepInterventionProtocolEndpoint, useBaepInterventionProtocolResource } from '../api'
import type { BaepInterventionProtocol } from '../types'

const columns: ColumnDef<BaepInterventionProtocol, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('indication'),
    accessorKey: 'indication',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indication ?? '—'),
  },
  {
    header: humanizeField('stimulation_ear'),
    accessorKey: 'stimulation_ear',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).stimulation_ear ?? '—'),
  },
  {
    header: humanizeField('click_rate_hz'),
    accessorKey: 'click_rate_hz',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).click_rate_hz ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'performed_by', label: humanizeField('performed_by'), type: 'number', required: true, section: 'Detail' },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number', section: 'Detail' },
  { key: 'indication', label: humanizeField('indication'), section: 'Detail' },
  { key: 'stimulation_ear', label: humanizeField('stimulation_ear'), type: 'select', required: true, options: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"bilateral","label":"Bilateral"}], section: 'Detail' },
  { key: 'click_rate_hz', label: humanizeField('click_rate_hz'), type: 'number', section: 'Detail' },
  { key: 'stimulus_intensity_db', label: humanizeField('stimulus_intensity_db'), type: 'number', section: 'Detail' },
  { key: 'wave_i_latency_ms', label: humanizeField('wave_i_latency_ms'), type: 'number', section: 'Detail Tambahan' },
  { key: 'wave_iii_latency_ms', label: humanizeField('wave_iii_latency_ms'), type: 'number', section: 'Detail Tambahan' },
  { key: 'wave_v_latency_ms', label: humanizeField('wave_v_latency_ms'), type: 'number', section: 'Detail Tambahan' },
  { key: 'interpretation', label: humanizeField('interpretation'), section: 'Detail Tambahan' },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"in_progress","label":"In Progress"},{"value":"completed","label":"Completed"}], section: 'Detail Tambahan' },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: '',
  performed_by: '',
  created_by: '',
  indication: '',
  stimulation_ear: '',
  click_rate_hz: '',
  stimulus_intensity_db: '',
  wave_i_latency_ms: '',
  wave_iii_latency_ms: '',
  wave_v_latency_ms: '',
  interpretation: '',
  status: '',
  performed_at: '',
}

const actions: WorkflowAction<BaepInterventionProtocol>[] = []

export function BaepInterventionProtocolListPage() {
  const resource = useBaepInterventionProtocolResource()
  const title = humanizeModuleName('MedicalRecordBaepInterventionProtocol')

  return (
    <WorkflowListPage<BaepInterventionProtocol>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepInterventionProtocolEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.indication ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
