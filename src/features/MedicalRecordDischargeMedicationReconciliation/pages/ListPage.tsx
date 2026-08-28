import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordDischargeMedicationReconciliationEndpoint, useDischargeMedicationReconciliationResource } from '../api'
import type { DischargeMedicationReconciliation } from '../types'

const columns: ColumnDef<DischargeMedicationReconciliation, unknown>[] = [
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
    header: humanizeField('source_of_medication_list'),
    accessorKey: 'source_of_medication_list',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_of_medication_list ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'reconciled_by', label: humanizeField('reconciled_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'source_of_medication_list', label: humanizeField('source_of_medication_list') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"draft","label":"Draft"},{"value":"completed","label":"Completed"}] },
  { key: 'reconciled_at', label: humanizeField('reconciled_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  reconciled_by: '',
  created_by: '',
  source_of_medication_list: '',
  notes: '',
  status: '',
  reconciled_at: '',
}

const actions: WorkflowAction<DischargeMedicationReconciliation>[] = []

export function DischargeMedicationReconciliationListPage() {
  const resource = useDischargeMedicationReconciliationResource()
  const title = humanizeModuleName('MedicalRecordDischargeMedicationReconciliation')

  return (
    <WorkflowListPage<DischargeMedicationReconciliation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordDischargeMedicationReconciliationEndpoint}
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
