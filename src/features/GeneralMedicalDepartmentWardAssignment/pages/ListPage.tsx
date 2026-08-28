import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMedicalDepartmentWardAssignmentResource } from '../api'
import type { MedicalDepartmentWardAssignment } from '../types'

const columns: ColumnDef<MedicalDepartmentWardAssignment, unknown>[] = [
  {
    header: humanizeField('medical_department_id'),
    cell: ({ row }) => <RelationLabel endpoint="/medical-departments" id={(row.original as unknown as Record<string, unknown>).medical_department_id as number | null} />,
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('is_primary'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_primary ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('assigned_at'),
    accessorKey: 'assigned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assigned_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'medical_department_id', label: humanizeField('medical_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'is_primary', label: humanizeField('is_primary'), type: 'checkbox' },
  { key: 'assigned_at', label: humanizeField('assigned_at'), type: 'date' },
]

const emptyForm = {
  medical_department_id: null,
  ward_id: null,
  is_primary: false,
  assigned_at: '',
}

export function MedicalDepartmentWardAssignmentListPage() {
  const resource = useMedicalDepartmentWardAssignmentResource()
  const title = humanizeModuleName('GeneralMedicalDepartmentWardAssignment')

  return (
    <CrudDialogPage<MedicalDepartmentWardAssignment>
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
