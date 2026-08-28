import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEmployeeResource } from '../api'
import type { Employee } from '../types'

const columns: ColumnDef<Employee, unknown>[] = [
  {
    header: humanizeField('user_id'),
    accessorKey: 'user_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).user_id ?? '—'),
  },
  {
    header: humanizeField('employee_number'),
    accessorKey: 'employee_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_number ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('nickname'),
    accessorKey: 'nickname',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nickname ?? '—'),
  },
  {
    header: humanizeField('title_prefix'),
    accessorKey: 'title_prefix',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).title_prefix ?? '—'),
  },
  {
    header: humanizeField('title_suffix'),
    accessorKey: 'title_suffix',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).title_suffix ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'user_id', label: humanizeField('user_id'), type: 'number', section: 'Detail' },
  { key: 'employee_number', label: humanizeField('employee_number'), section: 'Detail' },
  { key: 'name', label: humanizeField('name'), required: true, section: 'Detail' },
  { key: 'nickname', label: humanizeField('nickname'), section: 'Detail' },
  { key: 'title_prefix', label: humanizeField('title_prefix'), section: 'Detail' },
  { key: 'title_suffix', label: humanizeField('title_suffix'), section: 'Detail' },
  { key: 'birth_place', label: humanizeField('birth_place'), section: 'Detail' },
  { key: 'birth_date', label: humanizeField('birth_date'), type: 'date', section: 'Detail' },
  { key: 'religion_id', label: humanizeField('religion_id'), type: 'relation', relationEndpoint: '/religions', section: 'Detail' },
  { key: 'gender_id', label: humanizeField('gender_id'), type: 'relation', relationEndpoint: '/genders', section: 'Detail' },
  { key: 'profession_id', label: humanizeField('profession_id'), type: 'relation', relationEndpoint: '/professions', section: 'Detail Tambahan' },
  { key: 'smf_id', label: humanizeField('smf_id'), type: 'number', section: 'Detail Tambahan' },
  { key: 'address', label: humanizeField('address'), section: 'Detail Tambahan' },
  { key: 'rt', label: humanizeField('rt'), section: 'Detail Tambahan' },
  { key: 'rw', label: humanizeField('rw'), section: 'Detail Tambahan' },
  { key: 'postal_code', label: humanizeField('postal_code'), section: 'Detail Tambahan' },
  { key: 'village_id', label: humanizeField('village_id'), type: 'custom', render: (value, onChange) => (
      <RegionVillagePicker value={(value as number) ?? null} onChange={(v) => onChange(v)} />
    ), section: 'Detail Tambahan' },
  { key: 'is_non_employee', label: humanizeField('is_non_employee'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox', section: 'Detail Tambahan' },
]

const emptyForm = {
  user_id: '',
  employee_number: '',
  name: '',
  nickname: '',
  title_prefix: '',
  title_suffix: '',
  birth_place: '',
  birth_date: '',
  religion_id: null,
  gender_id: null,
  profession_id: null,
  smf_id: '',
  address: '',
  rt: '',
  rw: '',
  postal_code: '',
  village_id: null,
  is_non_employee: false,
  is_active: false,
}

export function EmployeeListPage() {
  const resource = useEmployeeResource()
  const title = humanizeModuleName('GeneralEmployee')

  return (
    <CrudDialogPage<Employee>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
