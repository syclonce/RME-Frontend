import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDoctorMedicalDepartmentResource } from '../api'
import type { DoctorMedicalDepartment } from '../types'

const columns: ColumnDef<DoctorMedicalDepartment, unknown>[] = [
  {
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('medical_department_id'),
    cell: ({ row }) => <RelationLabel endpoint="/medical-departments" id={(row.original as unknown as Record<string, unknown>).medical_department_id as number | null} />,
  },
  {
    header: humanizeField('is_head'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_head ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'medical_department_id', label: humanizeField('medical_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'is_head', label: humanizeField('is_head'), type: 'checkbox' },
]

const emptyForm = {
  doctor_id: null,
  medical_department_id: null,
  is_head: false,
}

export function DoctorMedicalDepartmentListPage() {
  const resource = useDoctorMedicalDepartmentResource()
  const title = humanizeModuleName('GeneralDoctorMedicalDepartment')

  return (
    <CrudDialogPage<DoctorMedicalDepartment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      resource={resource}
    />
  )
}
