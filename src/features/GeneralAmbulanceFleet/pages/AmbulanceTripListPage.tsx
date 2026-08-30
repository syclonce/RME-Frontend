import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { WorkflowListPage, type CrudField, type WorkflowAction } from '@/shared/components/WorkflowListPage'
import { humanizeField } from '@/shared/labels'
import { AmbulanceTripEndpoint, useAmbulanceTripResource } from '../api'
import type { AmbulanceTrip } from '../types'

const columns: ColumnDef<AmbulanceTrip, unknown>[] = [
  { header: 'Ambulans', cell: ({ row }) => <RelationLabel endpoint="/ambulances" id={row.original.ambulance_id} /> },
  { header: 'Pasien', cell: ({ row }) => <RelationLabel endpoint="/patients" id={row.original.patient_id} /> },
  { header: 'Pengemudi', cell: ({ row }) => <RelationLabel endpoint="/employees" id={row.original.driver_employee_id} /> },
  { header: 'Tujuan', accessorKey: 'destination' },
  { header: 'Berangkat', accessorKey: 'departed_at' },
  { header: 'Status', cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge> },
]

const fields: CrudField[] = [
  { key: 'ambulance_id', label: 'Ambulans', type: 'relation', relationEndpoint: '/ambulances', required: true },
  { key: 'patient_id', label: 'Pasien', type: 'combobox', relationEndpoint: '/patients' },
  { key: 'driver_employee_id', label: 'Pengemudi', type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'purpose', label: 'Keperluan', type: 'select', required: true, options: [
    { value: 'rujukan_keluar', label: 'Rujukan Keluar' }, { value: 'jemput_pasien', label: 'Jemput Pasien' },
    { value: 'antar_jenazah', label: 'Antar Jenazah' }, { value: 'lainnya', label: 'Lainnya' },
  ] },
  { key: 'origin', label: 'Lokasi Asal', required: true },
  { key: 'destination', label: 'Tujuan', required: true },
  { key: 'departed_at', label: 'Waktu Berangkat', type: 'date' },
]

const actions: WorkflowAction<AmbulanceTrip>[] = [{
  key: 'complete', label: 'Selesaikan Perjalanan', method: 'post', path: (item) => `/ambulance-trips/${item.id}/complete`,
  fields: [{ key: 'returned_at', label: humanizeField('returned_at'), type: 'date' }], emptyForm: { returned_at: '' },
  visibleWhen: (item) => item.status === 'ongoing',
}]

export function AmbulanceTripListPage() {
  const resource = useAmbulanceTripResource()
  return <WorkflowListPage<AmbulanceTrip>
    title="Perjalanan Ambulans" description="Catat keberangkatan hingga ambulans kembali tersedia."
    endpoint={AmbulanceTripEndpoint} columns={columns}
    capabilities={{ canCreate: true, canUpdate: true, canDestroy: false, canUpdateWhen: (item) => item.status === 'ongoing' }}
    fields={fields} emptyForm={{ ambulance_id: null, patient_id: null, driver_employee_id: null, purpose: '', origin: '', destination: '', departed_at: '' }}
    itemLabel={(item) => `${item.origin} → ${item.destination}`} actions={actions} resource={resource}
  />
}
