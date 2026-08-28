import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGeneralEmployeePhotoResource } from '../api'
import type { GeneralEmployeePhoto } from '../types'

const columns: ColumnDef<GeneralEmployeePhoto, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('file_path'),
    accessorKey: 'file_path',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).file_path ?? '—'),
  },
  {
    header: humanizeField('taken_at'),
    accessorKey: 'taken_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).taken_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'number', required: true },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'taken_at', label: humanizeField('taken_at'), type: 'date', required: true },
]

const emptyForm = {
  employee_id: '',
  file_path: '',
  taken_at: '',
}

export function GeneralEmployeePhotoListPage() {
  const resource = useGeneralEmployeePhotoResource()
  const title = humanizeModuleName('GeneralEmployeePhoto')

  return (
    <CrudDialogPage<GeneralEmployeePhoto>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.file_path ?? `#${item.id}`}
      resource={resource}
    />
  )
}
