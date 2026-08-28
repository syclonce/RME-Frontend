import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordFamilyMedicalHistoryEndpoint, useFamilyMedicalHistoryResource } from '../api'
import type { FamilyMedicalHistory } from '../types'

const columns: ColumnDef<FamilyMedicalHistory, unknown>[] = [
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
    header: humanizeField('relation'),
    accessorKey: 'relation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).relation ?? '—'),
  },
  {
    header: humanizeField('condition'),
    accessorKey: 'condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).condition ?? '—'),
  },
  {
    header: humanizeField('diagnosed_age'),
    accessorKey: 'diagnosed_age',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosed_age ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'relation', label: humanizeField('relation'), required: true },
  { key: 'condition', label: humanizeField('condition'), required: true },
  { key: 'diagnosed_age', label: humanizeField('diagnosed_age'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  relation: '',
  condition: '',
  diagnosed_age: '',
  notes: '',
}

const actions: WorkflowAction<FamilyMedicalHistory>[] = []

export function FamilyMedicalHistoryListPage() {
  const resource = useFamilyMedicalHistoryResource()
  const title = humanizeModuleName('MedicalRecordFamilyMedicalHistory')

  return (
    <WorkflowListPage<FamilyMedicalHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordFamilyMedicalHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.relation ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
