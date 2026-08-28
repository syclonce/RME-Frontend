import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAbciProcedureResource } from '../api'
import type { AbciProcedure } from '../types'

const columns: ColumnDef<AbciProcedure, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_id'),
    accessorKey: 'doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).doctor_id ?? '—'),
  },
  {
    header: humanizeField('procedure_date'),
    accessorKey: 'procedure_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_date ?? '—'),
  },
  {
    header: humanizeField('indication'),
    accessorKey: 'indication',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indication ?? '—'),
  },
  {
    header: humanizeField('procedure_details'),
    accessorKey: 'procedure_details',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_details ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'combobox', relationEndpoint: '/doctors' },
  { key: 'procedure_date', label: humanizeField('procedure_date'), type: 'date', required: true },
  { key: 'indication', label: humanizeField('indication') },
  { key: 'procedure_details', label: humanizeField('procedure_details') },
  { key: 'outcome', label: humanizeField('outcome') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  doctor_id: null,
  procedure_date: '',
  indication: '',
  procedure_details: '',
  outcome: '',
  notes: '',
}

export function AbciProcedureListPage() {
  const resource = useAbciProcedureResource()
  const title = humanizeModuleName('MedicalRecordAbciProcedure')

  return (
    <CrudDialogPage<AbciProcedure>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.indication ?? `#${item.id}`}
      resource={resource}
    />
  )
}
