import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordProcedureConsentInformationReceiverEndpoint, useProcedureConsentInformationReceiverResource } from '../api'
import type { ProcedureConsentInformationReceiver } from '../types'

const columns: ColumnDef<ProcedureConsentInformationReceiver, unknown>[] = [
  {
    header: humanizeField('consent_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctor-procedure-consents" id={(row.original as unknown as Record<string, unknown>).consent_id as number | null} />,
  },
  {
    header: humanizeField('receiver_name'),
    accessorKey: 'receiver_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).receiver_name ?? '—'),
  },
  {
    header: humanizeField('receiver_relationship'),
    accessorKey: 'receiver_relationship',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).receiver_relationship ?? '—'),
  },
  {
    header: humanizeField('signed_at'),
    accessorKey: 'signed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).signed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'consent_id', label: humanizeField('consent_id'), type: 'relation', relationEndpoint: '/doctor-procedure-consents', required: true },
  { key: 'receiver_name', label: humanizeField('receiver_name'), required: true },
  { key: 'receiver_relationship', label: humanizeField('receiver_relationship') },
  { key: 'signed_at', label: humanizeField('signed_at'), type: 'date' },
]

const emptyForm = {
  consent_id: null,
  receiver_name: '',
  receiver_relationship: '',
  signed_at: '',
}

const actions: WorkflowAction<ProcedureConsentInformationReceiver>[] = []

export function ProcedureConsentInformationReceiverListPage() {
  const resource = useProcedureConsentInformationReceiverResource()
  const title = humanizeModuleName('MedicalRecordProcedureConsentInformationReceiver')

  return (
    <WorkflowListPage<ProcedureConsentInformationReceiver>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordProcedureConsentInformationReceiverEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.receiver_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
