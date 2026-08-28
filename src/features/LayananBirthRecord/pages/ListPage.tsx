import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananBirthRecordEndpoint, useBirthRecordResource } from '../api'
import type { BirthRecord } from '../types'

const columns: ColumnDef<BirthRecord, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('mother_patient_id'),
    accessorKey: 'mother_patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mother_patient_id ?? '—'),
  },
  {
    header: humanizeField('baby_name'),
    accessorKey: 'baby_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).baby_name ?? '—'),
  },
  {
    header: humanizeField('gender_id'),
    cell: ({ row }) => <RelationLabel endpoint="/genders" id={(row.original as unknown as Record<string, unknown>).gender_id as number | null} />,
  },
  {
    header: humanizeField('birth_date'),
    accessorKey: 'birth_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).birth_date ?? '—'),
  },
  {
    header: humanizeField('birth_weight_grams'),
    accessorKey: 'birth_weight_grams',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).birth_weight_grams ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'mother_patient_id', label: humanizeField('mother_patient_id'), type: 'number', required: true },
  { key: 'baby_name', label: humanizeField('baby_name') },
  { key: 'gender_id', label: humanizeField('gender_id'), type: 'relation', relationEndpoint: '/genders' },
  { key: 'birth_date', label: humanizeField('birth_date'), type: 'date', required: true },
  { key: 'birth_weight_grams', label: humanizeField('birth_weight_grams'), type: 'number' },
  { key: 'birth_length_cm', label: humanizeField('birth_length_cm'), type: 'number' },
  { key: 'delivery_method', label: humanizeField('delivery_method'), required: true },
  { key: 'attending_doctor_id', label: humanizeField('attending_doctor_id'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  mother_patient_id: '',
  baby_name: '',
  gender_id: null,
  birth_date: '',
  birth_weight_grams: '',
  birth_length_cm: '',
  delivery_method: '',
  attending_doctor_id: '',
  notes: '',
}

const actions: WorkflowAction<BirthRecord>[] = []

export function BirthRecordListPage() {
  const resource = useBirthRecordResource()
  const title = humanizeModuleName('LayananBirthRecord')

  return (
    <WorkflowListPage<BirthRecord>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananBirthRecordEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.baby_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
