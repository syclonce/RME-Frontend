import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordTransferMedicationReconciliationEndpoint, useTransferMedicationReconciliationResource } from '../api'
import type { TransferMedicationReconciliation } from '../types'

const columns: ColumnDef<TransferMedicationReconciliation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('reconciled_by'),
    accessorKey: 'reconciled_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reconciled_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('transferred_to_ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).transferred_to_ward_id as number | null} />,
  },
  {
    header: humanizeField('source_of_medication_list'),
    accessorKey: 'source_of_medication_list',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_of_medication_list ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'reconciled_by', label: humanizeField('reconciled_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'transferred_to_ward_id', label: humanizeField('transferred_to_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'source_of_medication_list', label: humanizeField('source_of_medication_list') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"draft","label":"Draft"},{"value":"completed","label":"Completed"}] },
  { key: 'reconciled_at', label: humanizeField('reconciled_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  reconciled_by: '',
  created_by: '',
  transferred_to_ward_id: null,
  source_of_medication_list: '',
  notes: '',
  status: '',
  reconciled_at: '',
}

const actions: WorkflowAction<TransferMedicationReconciliation>[] = []

export function TransferMedicationReconciliationListPage() {
  const resource = useTransferMedicationReconciliationResource()
  const title = humanizeModuleName('MedicalRecordTransferMedicationReconciliation')

  return (
    <WorkflowListPage<TransferMedicationReconciliation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordTransferMedicationReconciliationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.source_of_medication_list ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
