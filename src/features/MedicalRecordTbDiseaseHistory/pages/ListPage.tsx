import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordTbDiseaseHistoryEndpoint, useTbDiseaseHistoryResource } from '../api'
import type { TbDiseaseHistory } from '../types'

const columns: ColumnDef<TbDiseaseHistory, unknown>[] = [
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
    header: humanizeField('previous_tb_treatment'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).previous_tb_treatment ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('treatment_year'),
    accessorKey: 'treatment_year',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).treatment_year ?? '—'),
  },
  {
    header: humanizeField('treatment_outcome'),
    accessorKey: 'treatment_outcome',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).treatment_outcome ?? '—'),
  },
  {
    header: humanizeField('tb_category'),
    accessorKey: 'tb_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).tb_category ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'previous_tb_treatment', label: humanizeField('previous_tb_treatment'), type: 'checkbox' },
  { key: 'treatment_year', label: humanizeField('treatment_year'), type: 'number' },
  { key: 'treatment_outcome', label: humanizeField('treatment_outcome'), type: 'select', options: [{"value":"cured","label":"Cured"},{"value":"completed","label":"Completed"},{"value":"failed","label":"Failed"},{"value":"ongoing","label":"Ongoing"}] },
  { key: 'tb_category', label: humanizeField('tb_category') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  previous_tb_treatment: false,
  treatment_year: '',
  treatment_outcome: '',
  tb_category: '',
  notes: '',
}

const actions: WorkflowAction<TbDiseaseHistory>[] = []

export function TbDiseaseHistoryListPage() {
  const resource = useTbDiseaseHistoryResource()
  const title = humanizeModuleName('MedicalRecordTbDiseaseHistory')

  return (
    <WorkflowListPage<TbDiseaseHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordTbDiseaseHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.treatment_outcome ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
