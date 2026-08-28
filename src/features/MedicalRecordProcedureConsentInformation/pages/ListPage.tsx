import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordProcedureConsentInformationEndpoint, useProcedureConsentInformationResource } from '../api'
import type { ProcedureConsentInformation } from '../types'

const columns: ColumnDef<ProcedureConsentInformation, unknown>[] = [
  {
    header: humanizeField('consent_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctor-procedure-consents" id={(row.original as unknown as Record<string, unknown>).consent_id as number | null} />,
  },
  {
    header: humanizeField('explained_by'),
    accessorKey: 'explained_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).explained_by ?? '—'),
  },
  {
    header: humanizeField('diagnosis_explanation'),
    accessorKey: 'diagnosis_explanation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis_explanation ?? '—'),
  },
  {
    header: humanizeField('procedure_explanation'),
    accessorKey: 'procedure_explanation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_explanation ?? '—'),
  },
  {
    header: humanizeField('purpose'),
    accessorKey: 'purpose',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).purpose ?? '—'),
  },
  {
    header: humanizeField('risks_and_complications'),
    accessorKey: 'risks_and_complications',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).risks_and_complications ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'consent_id', label: humanizeField('consent_id'), type: 'relation', relationEndpoint: '/doctor-procedure-consents', required: true },
  { key: 'explained_by', label: humanizeField('explained_by'), type: 'number', required: true },
  { key: 'diagnosis_explanation', label: humanizeField('diagnosis_explanation') },
  { key: 'procedure_explanation', label: humanizeField('procedure_explanation') },
  { key: 'purpose', label: humanizeField('purpose') },
  { key: 'risks_and_complications', label: humanizeField('risks_and_complications') },
  { key: 'alternative_procedures', label: humanizeField('alternative_procedures') },
  { key: 'prognosis', label: humanizeField('prognosis') },
  { key: 'explained_at', label: humanizeField('explained_at'), type: 'date' },
]

const emptyForm = {
  consent_id: null,
  explained_by: '',
  diagnosis_explanation: '',
  procedure_explanation: '',
  purpose: '',
  risks_and_complications: '',
  alternative_procedures: '',
  prognosis: '',
  explained_at: '',
}

const actions: WorkflowAction<ProcedureConsentInformation>[] = []

export function ProcedureConsentInformationListPage() {
  const resource = useProcedureConsentInformationResource()
  const title = humanizeModuleName('MedicalRecordProcedureConsentInformation')

  return (
    <WorkflowListPage<ProcedureConsentInformation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordProcedureConsentInformationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.diagnosis_explanation ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
