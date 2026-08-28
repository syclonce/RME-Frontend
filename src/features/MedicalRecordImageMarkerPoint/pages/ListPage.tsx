import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useImageMarkerPointResource } from '../api'
import type { ImageMarkerPoint } from '../types'

const columns: ColumnDef<ImageMarkerPoint, unknown>[] = [
  {
    header: humanizeField('image_marker_id'),
    cell: ({ row }) => <RelationLabel endpoint="/image-markers" id={(row.original as unknown as Record<string, unknown>).image_marker_id as number | null} />,
  },
  {
    header: humanizeField('x_coordinate'),
    accessorKey: 'x_coordinate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).x_coordinate ?? '—'),
  },
  {
    header: humanizeField('y_coordinate'),
    accessorKey: 'y_coordinate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).y_coordinate ?? '—'),
  },
  {
    header: humanizeField('label'),
    accessorKey: 'label',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).label ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'image_marker_id', label: humanizeField('image_marker_id'), type: 'relation', relationEndpoint: '/image-markers', required: true },
  { key: 'x_coordinate', label: humanizeField('x_coordinate'), type: 'number', required: true },
  { key: 'y_coordinate', label: humanizeField('y_coordinate'), type: 'number', required: true },
  { key: 'label', label: humanizeField('label') },
  { key: 'description', label: humanizeField('description') },
]

const emptyForm = {
  image_marker_id: null,
  x_coordinate: '',
  y_coordinate: '',
  label: '',
  description: '',
}

export function ImageMarkerPointListPage() {
  const resource = useImageMarkerPointResource()
  const title = humanizeModuleName('MedicalRecordImageMarkerPoint')

  return (
    <CrudDialogPage<ImageMarkerPoint>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.label ?? `#${item.id}`}
      resource={resource}
    />
  )
}
