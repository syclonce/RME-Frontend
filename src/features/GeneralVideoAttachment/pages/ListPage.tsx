import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useVideoAttachmentResource } from '../api'
import type { VideoAttachment } from '../types'

const columns: ColumnDef<VideoAttachment, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('title'),
    accessorKey: 'title',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).title ?? '—'),
  },
  {
    header: humanizeField('file_path'),
    accessorKey: 'file_path',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).file_path ?? '—'),
  },
  {
    header: humanizeField('mime_type'),
    accessorKey: 'mime_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mime_type ?? '—'),
  },
  {
    header: humanizeField('duration_seconds'),
    accessorKey: 'duration_seconds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).duration_seconds ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
  { key: 'title', label: humanizeField('title'), required: true },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'mime_type', label: humanizeField('mime_type') },
  { key: 'duration_seconds', label: humanizeField('duration_seconds'), type: 'number' },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  patient_id: '',
  visit_id: '',
  title: '',
  file_path: '',
  mime_type: '',
  duration_seconds: '',
  recorded_by: '',
  notes: '',
  is_active: false,
}

export function VideoAttachmentListPage() {
  const resource = useVideoAttachmentResource()
  const title = humanizeModuleName('GeneralVideoAttachment')

  return (
    <CrudDialogPage<VideoAttachment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.title ?? `#${item.id}`}
      resource={resource}
    />
  )
}
