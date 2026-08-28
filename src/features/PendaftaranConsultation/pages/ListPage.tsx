import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranConsultationEndpoint, useConsultationResource } from '../api'
import type { Consultation } from '../types'

const columns: ColumnDef<Consultation, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'requesting_department_id', label: humanizeField('requesting_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'consulted_department_id', label: humanizeField('consulted_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'requested_at', label: humanizeField('requested_at'), type: 'date' },
  { key: 'question', label: humanizeField('question') },
]

const emptyForm = {
  visit_id: '',
  requesting_department_id: null,
  consulted_department_id: null,
  requested_at: '',
  question: '',
}

const actions: WorkflowAction<Consultation>[] = []

export function ConsultationListPage() {
  const resource = useConsultationResource()
  const title = humanizeModuleName('PendaftaranConsultation')

  return (
    <WorkflowListPage<Consultation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranConsultationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.question ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
