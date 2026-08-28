import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useImplementationNoteResource } from '../api'
import type { ImplementationNote } from '../types'

const columns: ColumnDef<ImplementationNote, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('note_type'),
    accessorKey: 'note_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).note_type ?? '—'),
  },
  {
    header: humanizeField('content'),
    accessorKey: 'content',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).content ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'note_type', label: humanizeField('note_type') },
  { key: 'content', label: humanizeField('content') },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: null,
  note_type: '',
  content: '',
  recorded_by: null,
  recorded_at: '',
}

export function ImplementationNoteListPage() {
  const resource = useImplementationNoteResource()
  const title = humanizeModuleName('MedicalRecordImplementationNote')

  return (
    <CrudDialogPage<ImplementationNote>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.note_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
