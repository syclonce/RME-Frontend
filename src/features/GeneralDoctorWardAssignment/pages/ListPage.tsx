import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDoctorWardAssignmentResource } from '../api'
import type { DoctorWardAssignment } from '../types'

const columns: ColumnDef<DoctorWardAssignment, unknown>[] = [
  {
    header: humanizeField('doctor_id'),
    accessorKey: 'doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).doctor_id ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('assigned_at'),
    accessorKey: 'assigned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assigned_at ?? '—'),
  },
  {
    header: humanizeField('schedule_day'),
    accessorKey: 'schedule_day',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).schedule_day ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'combobox', relationEndpoint: '/doctors', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'assigned_at', label: humanizeField('assigned_at'), type: 'date' },
  { key: 'schedule_day', label: humanizeField('schedule_day') },
]

const emptyForm = {
  doctor_id: null,
  ward_id: null,
  assigned_at: '',
  schedule_day: '',
}

export function DoctorWardAssignmentListPage() {
  const resource = useDoctorWardAssignmentResource()
  const title = humanizeModuleName('GeneralDoctorWardAssignment')

  return (
    <CrudDialogPage<DoctorWardAssignment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.schedule_day ?? `#${item.id}`}
      resource={resource}
    />
  )
}
