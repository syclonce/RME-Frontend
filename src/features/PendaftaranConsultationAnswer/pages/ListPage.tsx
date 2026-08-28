import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranConsultationAnswerEndpoint, useConsultationAnswerResource } from '../api'
import type { ConsultationAnswer } from '../types'

const columns: ColumnDef<ConsultationAnswer, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'consultation_id', label: humanizeField('consultation_id'), type: 'relation', relationEndpoint: '/consultations', required: true },
  { key: 'answered_by', label: humanizeField('answered_by'), type: 'number', required: true },
  { key: 'answered_at', label: humanizeField('answered_at'), type: 'date' },
  { key: 'answer', label: humanizeField('answer') },
]

const emptyForm = {
  consultation_id: null,
  answered_by: '',
  answered_at: '',
  answer: '',
}

const actions: WorkflowAction<ConsultationAnswer>[] = []

export function ConsultationAnswerListPage() {
  const resource = useConsultationAnswerResource()
  const title = humanizeModuleName('PendaftaranConsultationAnswer')

  return (
    <WorkflowListPage<ConsultationAnswer>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranConsultationAnswerEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.answer ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
