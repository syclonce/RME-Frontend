import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useReservationResource } from '../api'
import type { Reservation } from '../types'

const columns: ColumnDef<Reservation, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'reserved_at', label: humanizeField('reserved_at'), type: 'date', required: true },
  { key: 'scheduled_at', label: humanizeField('scheduled_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"pending","label":"Pending"},{"value":"confirmed","label":"Confirmed"},{"value":"cancelled","label":"Cancelled"},{"value":"completed","label":"Completed"}] },
]

const emptyForm = {
  patient_id: null,
  ward_id: null,
  reserved_at: '',
  scheduled_at: '',
  status: '',
}

export function ReservationListPage() {
  const resource = useReservationResource()
  const title = humanizeModuleName('PendaftaranReservation')

  return (
    <CrudDialogPage<Reservation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
