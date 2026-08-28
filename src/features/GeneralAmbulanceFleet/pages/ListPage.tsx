import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { GeneralAmbulanceFleetEndpoint, useAmbulanceResource } from '../api'
import type { Ambulance } from '../types'

const columns: ColumnDef<Ambulance, unknown>[] = [
  {
    header: humanizeField('vehicle_code'),
    accessorKey: 'vehicle_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).vehicle_code ?? '—'),
  },
  {
    header: humanizeField('plate_number'),
    accessorKey: 'plate_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).plate_number ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'vehicle_code', label: humanizeField('vehicle_code'), required: true },
  { key: 'plate_number', label: humanizeField('plate_number'), required: true },
]

const emptyForm = {
  vehicle_code: '',
  plate_number: '',
}

const actions: WorkflowAction<Ambulance>[] = []

export function AmbulanceListPage() {
  const resource = useAmbulanceResource()
  const title = humanizeModuleName('GeneralAmbulanceFleet')

  return (
    <WorkflowListPage<Ambulance>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={GeneralAmbulanceFleetEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.vehicle_code ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
