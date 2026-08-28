import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordDoctorProcedureConsentEndpoint, useDoctorProcedureConsentResource } from '../api'
import type { DoctorProcedureConsent } from '../types'

const columns: ColumnDef<DoctorProcedureConsent, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('procedure_name'),
    accessorKey: 'procedure_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_name ?? '—'),
  },
  {
    header: humanizeField('indication'),
    accessorKey: 'indication',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indication ?? '—'),
  },
  {
    header: humanizeField('consent_decision'),
    accessorKey: 'consent_decision',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).consent_decision ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'procedure_name', label: humanizeField('procedure_name'), required: true },
  { key: 'indication', label: humanizeField('indication') },
  { key: 'consent_decision', label: humanizeField('consent_decision'), type: 'select', options: [{"value":"pending","label":"Pending"},{"value":"agree","label":"Agree"},{"value":"refuse","label":"Refuse"}] },
  { key: 'signed_at', label: humanizeField('signed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  doctor_id: null,
  created_by: '',
  procedure_name: '',
  indication: '',
  consent_decision: '',
  signed_at: '',
}

const actions: WorkflowAction<DoctorProcedureConsent>[] = []

export function DoctorProcedureConsentListPage() {
  const resource = useDoctorProcedureConsentResource()
  const title = humanizeModuleName('MedicalRecordDoctorProcedureConsent')

  return (
    <WorkflowListPage<DoctorProcedureConsent>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordDoctorProcedureConsentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.procedure_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
