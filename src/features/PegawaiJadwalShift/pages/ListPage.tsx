// codegen:preserve — tersedia kueri rentang jadwal dan workflow shift.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useShiftScheduleResource } from '../api'
import type { ShiftSchedule } from '../types'
import { EndpointQueryDialog } from '@/shared/components/EndpointQueryDialog'
import { apiClient } from '@/api/client'

const columns: ColumnDef<ShiftSchedule, unknown>[] = [
  {
    header: humanizeField('staff_member_id'),
    accessorKey: 'staff_member_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).staff_member_id ?? '—'),
  },
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('shift_type'),
    accessorKey: 'shift_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shift_type ?? '—'),
  },
  {
    header: humanizeField('shift_date'),
    accessorKey: 'shift_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shift_date ?? '—'),
  },
  {
    header: humanizeField('start_time'),
    accessorKey: 'start_time',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).start_time ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'staff_member_id', label: humanizeField('staff_member_id'), type: 'combobox', relationEndpoint: '/staff-members' },
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees' },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards' },
  { key: 'shift_type', label: humanizeField('shift_type'), required: true },
  { key: 'shift_date', label: humanizeField('shift_date'), type: 'date', required: true },
  { key: 'start_time', label: humanizeField('start_time'), type: 'date', required: true },
  { key: 'end_time', label: humanizeField('end_time'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  staff_member_id: null,
  employee_id: null,
  ward_id: null,
  shift_type: '',
  shift_date: '',
  start_time: '',
  end_time: '',
  status: '',
}

export function ShiftScheduleListPage() {
  const resource = useShiftScheduleResource()
  const title = humanizeModuleName('PegawaiJadwalShift')

  return (
    <CrudDialogPage<ShiftSchedule>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.shift_type ?? `#${item.id}`}
      resource={resource}
      headerActions={
        <EndpointQueryDialog
          triggerLabel="Jadwal per Bangsal" title="Jadwal Jaga per Bangsal"
          description="Lihat petugas yang dijadwalkan pada rentang tanggal tertentu."
          fields={[
            { key: 'ward_id', label: 'Bangsal', type: 'relation', relationEndpoint: '/wards', required: true },
            { key: 'from', label: 'Dari Tanggal', type: 'date', required: true },
            { key: 'to', label: 'Sampai Tanggal', type: 'date', required: true },
          ]}
          initialForm={{ ward_id: null, from: '', to: '' }}
          query={async (form) => (await apiClient.get('/shift-schedules-by-ward', { params: form })).data}
        />
      }
    />
  )
}
