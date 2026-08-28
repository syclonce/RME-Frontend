import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordMedicationAdministrationHistoryEndpoint, useMedicationAdministrationHistoryResource } from '../api'
import type { MedicationAdministrationHistory } from '../types'

const columns: ColumnDef<MedicationAdministrationHistory, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('administered_by'),
    accessorKey: 'administered_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).administered_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
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
    header: humanizeField('route'),
    accessorKey: 'route',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).route ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'administered_by', label: humanizeField('administered_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'dose', label: humanizeField('dose') },
  { key: 'route', label: humanizeField('route') },
  { key: 'administered_at', label: humanizeField('administered_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  administered_by: '',
  created_by: '',
  drug_name: '',
  dose: '',
  route: '',
  administered_at: '',
  notes: '',
}

const actions: WorkflowAction<MedicationAdministrationHistory>[] = []

export function MedicationAdministrationHistoryListPage() {
  const resource = useMedicationAdministrationHistoryResource()
  const title = humanizeModuleName('MedicalRecordMedicationAdministrationHistory')

  return (
    <WorkflowListPage<MedicationAdministrationHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordMedicationAdministrationHistoryEndpoint}
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
