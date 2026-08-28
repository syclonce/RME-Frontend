import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMedicalProcedureStaffResource } from '../api'
import type { MedicalProcedureStaff } from '../types'

const columns: ColumnDef<MedicalProcedureStaff, unknown>[] = [
  {
    header: humanizeField('medical_procedure_id'),
    cell: ({ row }) => <RelationLabel endpoint="/medical-procedures" id={(row.original as unknown as Record<string, unknown>).medical_procedure_id as number | null} />,
  },
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('role'),
    accessorKey: 'role',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).role ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'medical_procedure_id', label: humanizeField('medical_procedure_id'), type: 'relation', relationEndpoint: '/medical-procedures', required: true },
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'role', label: humanizeField('role'), required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  medical_procedure_id: null,
  employee_id: null,
  role: '',
  notes: '',
}

export function MedicalProcedureStaffListPage() {
  const resource = useMedicalProcedureStaffResource()
  const title = humanizeModuleName('LayananMedicalProcedureStaff')

  return (
    <CrudDialogPage<MedicalProcedureStaff>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.role ?? `#${item.id}`}
      resource={resource}
    />
  )
}
