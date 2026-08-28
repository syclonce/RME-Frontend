import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLabResultNoteResource } from '../api'
import type { LabResultNote } from '../types'

const columns: ColumnDef<LabResultNote, unknown>[] = [
  {
    header: humanizeField('lab_result_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-results" id={(row.original as unknown as Record<string, unknown>).lab_result_id as number | null} />,
  },
  {
    header: humanizeField('note'),
    accessorKey: 'note',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).note ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_result_id', label: humanizeField('lab_result_id'), type: 'relation', relationEndpoint: '/lab-results', required: true },
  { key: 'note', label: humanizeField('note'), required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
]

const emptyForm = {
  lab_result_id: null,
  note: '',
  created_by: '',
}

export function LabResultNoteListPage() {
  const resource = useLabResultNoteResource()
  const title = humanizeModuleName('LayananLabResultNote')

  return (
    <CrudDialogPage<LabResultNote>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.note ?? `#${item.id}`}
      resource={resource}
    />
  )
}
