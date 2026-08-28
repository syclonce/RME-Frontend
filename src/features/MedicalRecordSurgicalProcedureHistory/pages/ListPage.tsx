import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordSurgicalProcedureHistoryEndpoint, useSurgicalProcedureHistoryResource } from '../api'
import type { SurgicalProcedureHistory } from '../types'

const columns: ColumnDef<SurgicalProcedureHistory, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
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
    header: humanizeField('procedure_date'),
    accessorKey: 'procedure_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_date ?? '—'),
  },
  {
    header: humanizeField('facility_name'),
    accessorKey: 'facility_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).facility_name ?? '—'),
  },
  {
    header: humanizeField('surgeon_name'),
    accessorKey: 'surgeon_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).surgeon_name ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'procedure_name', label: humanizeField('procedure_name'), required: true },
  { key: 'procedure_date', label: humanizeField('procedure_date'), type: 'date' },
  { key: 'facility_name', label: humanizeField('facility_name') },
  { key: 'surgeon_name', label: humanizeField('surgeon_name') },
  { key: 'complications', label: humanizeField('complications') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  procedure_name: '',
  procedure_date: '',
  facility_name: '',
  surgeon_name: '',
  complications: '',
}

const actions: WorkflowAction<SurgicalProcedureHistory>[] = []

export function SurgicalProcedureHistoryListPage() {
  const resource = useSurgicalProcedureHistoryResource()
  const title = humanizeModuleName('MedicalRecordSurgicalProcedureHistory')

  return (
    <WorkflowListPage<SurgicalProcedureHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordSurgicalProcedureHistoryEndpoint}
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
