import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranPatientTransferEndpoint, usePatientTransferResource } from '../api'
import type { PatientTransfer } from '../types'

const columns: ColumnDef<PatientTransfer, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'from_ward_id', label: humanizeField('from_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'to_ward_id', label: humanizeField('to_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'transferred_at', label: humanizeField('transferred_at'), type: 'date' },
  { key: 'reason', label: humanizeField('reason') },
]

const emptyForm = {
  visit_id: '',
  from_ward_id: null,
  to_ward_id: null,
  transferred_at: '',
  reason: '',
}

const actions: WorkflowAction<PatientTransfer>[] = []

export function PatientTransferListPage() {
  const resource = usePatientTransferResource()
  const title = humanizeModuleName('PendaftaranPatientTransfer')

  return (
    <WorkflowListPage<PatientTransfer>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranPatientTransferEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
