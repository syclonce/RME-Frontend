import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordMaternalPregnancyHistoryEndpoint, useMaternalPregnancyHistoryResource } from '../api'
import type { MaternalPregnancyHistory } from '../types'

const columns: ColumnDef<MaternalPregnancyHistory, unknown>[] = [
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
    header: humanizeField('gravida'),
    accessorKey: 'gravida',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gravida ?? '—'),
  },
  {
    header: humanizeField('para'),
    accessorKey: 'para',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).para ?? '—'),
  },
  {
    header: humanizeField('abortus'),
    accessorKey: 'abortus',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).abortus ?? '—'),
  },
  {
    header: humanizeField('pregnancy_complications'),
    accessorKey: 'pregnancy_complications',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pregnancy_complications ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'gravida', label: humanizeField('gravida'), type: 'number' },
  { key: 'para', label: humanizeField('para'), type: 'number' },
  { key: 'abortus', label: humanizeField('abortus'), type: 'number' },
  { key: 'pregnancy_complications', label: humanizeField('pregnancy_complications') },
  { key: 'delivery_method_history', label: humanizeField('delivery_method_history') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  gravida: '',
  para: '',
  abortus: '',
  pregnancy_complications: '',
  delivery_method_history: '',
}

const actions: WorkflowAction<MaternalPregnancyHistory>[] = []

export function MaternalPregnancyHistoryListPage() {
  const resource = useMaternalPregnancyHistoryResource()
  const title = humanizeModuleName('MedicalRecordMaternalPregnancyHistory')

  return (
    <WorkflowListPage<MaternalPregnancyHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordMaternalPregnancyHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.pregnancy_complications ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
