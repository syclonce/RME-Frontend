import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGeneralPatientPhotoResource } from '../api'
import type { GeneralPatientPhoto } from '../types'

const columns: ColumnDef<GeneralPatientPhoto, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
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
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'taken_at', label: humanizeField('taken_at'), type: 'date', required: true },
]

const emptyForm = {
  patient_id: '',
  file_path: '',
  taken_at: '',
}

export function GeneralPatientPhotoListPage() {
  const resource = useGeneralPatientPhotoResource()
  const title = humanizeModuleName('GeneralPatientPhoto')

  return (
    <CrudDialogPage<GeneralPatientPhoto>
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
