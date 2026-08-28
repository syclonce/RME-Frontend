import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFibroscanResultResource } from '../api'
import type { FibroscanResult } from '../types'

const columns: ColumnDef<FibroscanResult, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('examination_date'),
    accessorKey: 'examination_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examination_date ?? '—'),
  },
  {
    header: humanizeField('liver_stiffness_kpa'),
    accessorKey: 'liver_stiffness_kpa',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).liver_stiffness_kpa ?? '—'),
  },
  {
    header: humanizeField('cap_score'),
    accessorKey: 'cap_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cap_score ?? '—'),
  },
  {
    header: humanizeField('fibrosis_stage'),
    accessorKey: 'fibrosis_stage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).fibrosis_stage ?? '—'),
  },
  {
    header: humanizeField('examined_by'),
    accessorKey: 'examined_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'examination_date', label: humanizeField('examination_date'), type: 'date', required: true },
  { key: 'liver_stiffness_kpa', label: humanizeField('liver_stiffness_kpa'), type: 'number' },
  { key: 'cap_score', label: humanizeField('cap_score'), type: 'number' },
  { key: 'fibrosis_stage', label: humanizeField('fibrosis_stage') },
  { key: 'examined_by', label: humanizeField('examined_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: null,
  examination_date: '',
  liver_stiffness_kpa: '',
  cap_score: '',
  fibrosis_stage: '',
  examined_by: null,
  notes: '',
}

export function FibroscanResultListPage() {
  const resource = useFibroscanResultResource()
  const title = humanizeModuleName('MedicalRecordFibroscanResult')

  return (
    <CrudDialogPage<FibroscanResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.fibrosis_stage ?? `#${item.id}`}
      resource={resource}
    />
  )
}
