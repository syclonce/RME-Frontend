import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranReferralLetterEndpoint, useReferralLetterResource } from '../api'
import type { ReferralLetter } from '../types'

const columns: ColumnDef<ReferralLetter, unknown>[] = [

]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'from_department_id', label: humanizeField('from_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'to_department_id', label: humanizeField('to_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'issued_at', label: humanizeField('issued_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  from_department_id: null,
  to_department_id: null,
  issued_at: '',
  notes: '',
}

const actions: WorkflowAction<ReferralLetter>[] = []

export function ReferralLetterListPage() {
  const resource = useReferralLetterResource()
  const title = humanizeModuleName('PendaftaranReferralLetter')

  return (
    <WorkflowListPage<ReferralLetter>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranReferralLetterEndpoint}
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
