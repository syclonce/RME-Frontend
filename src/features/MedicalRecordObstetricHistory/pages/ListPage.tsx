import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordObstetricHistoryEndpoint, useObstetricHistoryResource } from '../api'
import type { ObstetricHistory } from '../types'

const columns: ColumnDef<ObstetricHistory, unknown>[] = [
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
    header: humanizeField('pregnancy_number'),
    accessorKey: 'pregnancy_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pregnancy_number ?? '—'),
  },
  {
    header: humanizeField('delivery_date'),
    accessorKey: 'delivery_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).delivery_date ?? '—'),
  },
  {
    header: humanizeField('delivery_method'),
    accessorKey: 'delivery_method',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).delivery_method ?? '—'),
  },
  {
    header: humanizeField('birth_weight_grams'),
    accessorKey: 'birth_weight_grams',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).birth_weight_grams ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'pregnancy_number', label: humanizeField('pregnancy_number'), type: 'number' },
  { key: 'delivery_date', label: humanizeField('delivery_date'), type: 'date' },
  { key: 'delivery_method', label: humanizeField('delivery_method'), type: 'select', options: [{"value":"normal","label":"Normal"},{"value":"cesarean","label":"Cesarean"},{"value":"vacuum","label":"Vacuum"},{"value":"forceps","label":"Forceps"}] },
  { key: 'birth_weight_grams', label: humanizeField('birth_weight_grams'), type: 'number' },
  { key: 'complications', label: humanizeField('complications') },
  { key: 'outcome', label: humanizeField('outcome') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  pregnancy_number: '',
  delivery_date: '',
  delivery_method: '',
  birth_weight_grams: '',
  complications: '',
  outcome: '',
}

const actions: WorkflowAction<ObstetricHistory>[] = []

export function ObstetricHistoryListPage() {
  const resource = useObstetricHistoryResource()
  const title = humanizeModuleName('MedicalRecordObstetricHistory')

  return (
    <WorkflowListPage<ObstetricHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordObstetricHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.delivery_method ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
