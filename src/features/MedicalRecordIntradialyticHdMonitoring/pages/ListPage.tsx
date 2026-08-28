import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useIntradialyticHdMonitoringResource } from '../api'
import type { IntradialyticHdMonitoring } from '../types'

const columns: ColumnDef<IntradialyticHdMonitoring, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('dialysis_hour'),
    accessorKey: 'dialysis_hour',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dialysis_hour ?? '—'),
  },
  {
    header: humanizeField('blood_pressure_systolic'),
    accessorKey: 'blood_pressure_systolic',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_pressure_systolic ?? '—'),
  },
  {
    header: humanizeField('blood_pressure_diastolic'),
    accessorKey: 'blood_pressure_diastolic',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_pressure_diastolic ?? '—'),
  },
  {
    header: humanizeField('blood_flow_rate'),
    accessorKey: 'blood_flow_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_flow_rate ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true, section: 'Detail' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true, section: 'Detail' },
  { key: 'dialysis_hour', label: humanizeField('dialysis_hour'), type: 'number', section: 'Detail' },
  { key: 'blood_pressure_systolic', label: humanizeField('blood_pressure_systolic'), type: 'number', section: 'Detail' },
  { key: 'blood_pressure_diastolic', label: humanizeField('blood_pressure_diastolic'), type: 'number', section: 'Detail' },
  { key: 'blood_flow_rate', label: humanizeField('blood_flow_rate'), type: 'number', section: 'Detail' },
  { key: 'dialysate_flow_rate', label: humanizeField('dialysate_flow_rate'), type: 'number', section: 'Detail Tambahan' },
  { key: 'ultrafiltration_rate', label: humanizeField('ultrafiltration_rate'), type: 'number', section: 'Detail Tambahan' },
  { key: 'venous_pressure', label: humanizeField('venous_pressure'), type: 'number', section: 'Detail Tambahan' },
  { key: 'transmembrane_pressure', label: humanizeField('transmembrane_pressure'), type: 'number', section: 'Detail Tambahan' },
  { key: 'symptoms', label: humanizeField('symptoms'), section: 'Detail Tambahan' },
  { key: 'monitored_at', label: humanizeField('monitored_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  dialysis_hour: '',
  blood_pressure_systolic: '',
  blood_pressure_diastolic: '',
  blood_flow_rate: '',
  dialysate_flow_rate: '',
  ultrafiltration_rate: '',
  venous_pressure: '',
  transmembrane_pressure: '',
  symptoms: '',
  monitored_at: '',
}

export function IntradialyticHdMonitoringListPage() {
  const resource = useIntradialyticHdMonitoringResource()
  const title = humanizeModuleName('MedicalRecordIntradialyticHdMonitoring')

  return (
    <CrudDialogPage<IntradialyticHdMonitoring>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.symptoms ?? `#${item.id}`}
      resource={resource}
    />
  )
}
