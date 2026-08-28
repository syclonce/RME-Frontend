import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordAdmissionMedicationReconciliationItemEndpoint, useAdmissionMedicationReconciliationItemResource } from '../api'
import type { AdmissionMedicationReconciliationItem } from '../types'

const columns: ColumnDef<AdmissionMedicationReconciliationItem, unknown>[] = [
  {
    header: humanizeField('reconciliation_id'),
    cell: ({ row }) => <RelationLabel endpoint="/admission-med-reconciliations" id={(row.original as unknown as Record<string, unknown>).reconciliation_id as number | null} />,
  },
  {
    header: humanizeField('drug_name'),
    accessorKey: 'drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).drug_name ?? '—'),
  },
  {
    header: humanizeField('dose'),
    accessorKey: 'dose',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dose ?? '—'),
  },
  {
    header: humanizeField('frequency'),
    accessorKey: 'frequency',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).frequency ?? '—'),
  },
  {
    header: humanizeField('route'),
    accessorKey: 'route',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).route ?? '—'),
  },
  {
    header: humanizeField('action'),
    accessorKey: 'action',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).action ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'reconciliation_id', label: humanizeField('reconciliation_id'), type: 'relation', relationEndpoint: '/admission-med-reconciliations', required: true },
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'dose', label: humanizeField('dose') },
  { key: 'frequency', label: humanizeField('frequency') },
  { key: 'route', label: humanizeField('route') },
  { key: 'action', label: humanizeField('action'), type: 'select', required: true, options: [{"value":"continue","label":"Continue"},{"value":"hold","label":"Hold"},{"value":"discontinue","label":"Discontinue"},{"value":"modify","label":"Modify"},{"value":"new","label":"New"}] },
  { key: 'reason', label: humanizeField('reason') },
  { key: 'last_taken_at', label: humanizeField('last_taken_at'), type: 'date' },
]

const emptyForm = {
  reconciliation_id: null,
  drug_name: '',
  dose: '',
  frequency: '',
  route: '',
  action: '',
  reason: '',
  last_taken_at: '',
}

const actions: WorkflowAction<AdmissionMedicationReconciliationItem>[] = []

export function AdmissionMedicationReconciliationItemListPage() {
  const resource = useAdmissionMedicationReconciliationItemResource()
  const title = humanizeModuleName('MedicalRecordAdmissionMedicationReconciliationItem')

  return (
    <WorkflowListPage<AdmissionMedicationReconciliationItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordAdmissionMedicationReconciliationItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.drug_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
