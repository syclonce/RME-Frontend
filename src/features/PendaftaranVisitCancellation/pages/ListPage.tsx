import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranVisitCancellationEndpoint, useVisitCancellationResource } from '../api'
import type { VisitCancellation } from '../types'

const columns: ColumnDef<VisitCancellation, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'cancelled_at', label: humanizeField('cancelled_at'), type: 'date' },
  { key: 'reason', label: humanizeField('reason') },
]

const emptyForm = {
  visit_id: '',
  cancelled_at: '',
  reason: '',
}

const actions: WorkflowAction<VisitCancellation>[] = []

export function VisitCancellationListPage() {
  const resource = useVisitCancellationResource()
  const title = humanizeModuleName('PendaftaranVisitCancellation')

  return (
    <WorkflowListPage<VisitCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranVisitCancellationEndpoint}
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
