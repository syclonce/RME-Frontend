import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranAccidentRecordEndpoint, useAccidentRecordResource } from '../api'
import type { AccidentRecord } from '../types'

const columns: ColumnDef<AccidentRecord, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'accident_type', label: humanizeField('accident_type'), required: true },
  { key: 'accident_at', label: humanizeField('accident_at'), type: 'date', required: true },
  { key: 'location', label: humanizeField('location'), required: true },
  { key: 'police_report_number', label: humanizeField('police_report_number') },
]

const emptyForm = {
  visit_id: '',
  accident_type: '',
  accident_at: '',
  location: '',
  police_report_number: '',
}

const actions: WorkflowAction<AccidentRecord>[] = []

export function AccidentRecordListPage() {
  const resource = useAccidentRecordResource()
  const title = humanizeModuleName('PendaftaranAccidentRecord')

  return (
    <WorkflowListPage<AccidentRecord>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranAccidentRecordEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.accident_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
