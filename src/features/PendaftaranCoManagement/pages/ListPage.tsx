import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranCoManagementEndpoint, useCoManagementResource } from '../api'
import type { CoManagement } from '../types'

const columns: ColumnDef<CoManagement, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'number', required: true },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  employee_id: '',
  started_at: '',
  notes: '',
}

const actions: WorkflowAction<CoManagement>[] = []

export function CoManagementListPage() {
  const resource = useCoManagementResource()
  const title = humanizeModuleName('PendaftaranCoManagement')

  return (
    <WorkflowListPage<CoManagement>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranCoManagementEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
