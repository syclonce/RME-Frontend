import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useImageMarkerResource } from '../api'
import type { ImageMarker } from '../types'

const columns: ColumnDef<ImageMarker, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('image_path'),
    accessorKey: 'image_path',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).image_path ?? '—'),
  },
  {
    header: humanizeField('template_name'),
    accessorKey: 'template_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).template_name ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
  {
    header: humanizeField('marked_at'),
    accessorKey: 'marked_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).marked_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'image_path', label: humanizeField('image_path'), required: true },
  { key: 'template_name', label: humanizeField('template_name') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'marked_at', label: humanizeField('marked_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  image_path: '',
  template_name: '',
  notes: '',
  marked_at: '',
}

export function ImageMarkerListPage() {
  const resource = useImageMarkerResource()
  const title = humanizeModuleName('MedicalRecordImageMarker')

  return (
    <CrudDialogPage<ImageMarker>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.image_path ?? `#${item.id}`}
      resource={resource}
    />
  )
}
