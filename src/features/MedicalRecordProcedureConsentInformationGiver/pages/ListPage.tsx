import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordProcedureConsentInformationGiverEndpoint, useProcedureConsentInformationGiverResource } from '../api'
import type { ProcedureConsentInformationGiver } from '../types'

const columns: ColumnDef<ProcedureConsentInformationGiver, unknown>[] = [
  {
    header: humanizeField('consent_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctor-procedure-consents" id={(row.original as unknown as Record<string, unknown>).consent_id as number | null} />,
  },
  {
    header: humanizeField('giver_id'),
    accessorKey: 'giver_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).giver_id ?? '—'),
  },
  {
    header: humanizeField('giver_role'),
    accessorKey: 'giver_role',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).giver_role ?? '—'),
  },
  {
    header: humanizeField('signed_at'),
    accessorKey: 'signed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).signed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'consent_id', label: humanizeField('consent_id'), type: 'relation', relationEndpoint: '/doctor-procedure-consents', required: true },
  { key: 'giver_id', label: humanizeField('giver_id'), type: 'number', required: true },
  { key: 'giver_role', label: humanizeField('giver_role') },
  { key: 'signed_at', label: humanizeField('signed_at'), type: 'date' },
]

const emptyForm = {
  consent_id: null,
  giver_id: '',
  giver_role: '',
  signed_at: '',
}

const actions: WorkflowAction<ProcedureConsentInformationGiver>[] = []

export function ProcedureConsentInformationGiverListPage() {
  const resource = useProcedureConsentInformationGiverResource()
  const title = humanizeModuleName('MedicalRecordProcedureConsentInformationGiver')

  return (
    <WorkflowListPage<ProcedureConsentInformationGiver>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordProcedureConsentInformationGiverEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.giver_role ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
