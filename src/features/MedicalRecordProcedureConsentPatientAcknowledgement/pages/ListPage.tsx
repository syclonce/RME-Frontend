import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordProcedureConsentPatientAcknowledgementEndpoint, useProcedureConsentPatientAcknowledgementResource } from '../api'
import type { ProcedureConsentPatientAcknowledgement } from '../types'

const columns: ColumnDef<ProcedureConsentPatientAcknowledgement, unknown>[] = [
  {
    header: humanizeField('consent_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctor-procedure-consents" id={(row.original as unknown as Record<string, unknown>).consent_id as number | null} />,
  },
  {
    header: humanizeField('acknowledger_name'),
    accessorKey: 'acknowledger_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).acknowledger_name ?? '—'),
  },
  {
    header: humanizeField('relationship_to_patient'),
    accessorKey: 'relationship_to_patient',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).relationship_to_patient ?? '—'),
  },
  {
    header: humanizeField('decision'),
    accessorKey: 'decision',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decision ?? '—'),
  },
  {
    header: humanizeField('signed_at'),
    accessorKey: 'signed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).signed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'consent_id', label: humanizeField('consent_id'), type: 'relation', relationEndpoint: '/doctor-procedure-consents', required: true },
  { key: 'acknowledger_name', label: humanizeField('acknowledger_name'), required: true },
  { key: 'relationship_to_patient', label: humanizeField('relationship_to_patient') },
  { key: 'decision', label: humanizeField('decision'), type: 'select', required: true, options: [{"value":"agree","label":"Agree"},{"value":"refuse","label":"Refuse"}] },
  { key: 'signed_at', label: humanizeField('signed_at'), type: 'date' },
]

const emptyForm = {
  consent_id: null,
  acknowledger_name: '',
  relationship_to_patient: '',
  decision: '',
  signed_at: '',
}

const actions: WorkflowAction<ProcedureConsentPatientAcknowledgement>[] = []

export function ProcedureConsentPatientAcknowledgementListPage() {
  const resource = useProcedureConsentPatientAcknowledgementResource()
  const title = humanizeModuleName('MedicalRecordProcedureConsentPatientAcknowledgement')

  return (
    <WorkflowListPage<ProcedureConsentPatientAcknowledgement>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordProcedureConsentPatientAcknowledgementEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.acknowledger_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
