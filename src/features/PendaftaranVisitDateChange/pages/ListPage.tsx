import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranVisitDateChangeEndpoint, useVisitDateChangeResource } from '../api'
import type { VisitDateChange } from '../types'

const columns: ColumnDef<VisitDateChange, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'old_date', label: humanizeField('old_date'), type: 'date', required: true },
  { key: 'new_date', label: humanizeField('new_date'), type: 'date', required: true },
  { key: 'reason', label: humanizeField('reason') },
]

const emptyForm = {
  visit_id: '',
  old_date: '',
  new_date: '',
  reason: '',
}

const actions: WorkflowAction<VisitDateChange>[] = []

export function VisitDateChangeListPage() {
  const resource = useVisitDateChangeResource()
  const title = humanizeModuleName('PendaftaranVisitDateChange')

  return (
    <WorkflowListPage<VisitDateChange>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranVisitDateChangeEndpoint}
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
