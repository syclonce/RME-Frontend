import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGeneralConsultationRoomResource } from '../api'
import type { GeneralConsultationRoom } from '../types'

const columns: ColumnDef<GeneralConsultationRoom, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('consultation_type'),
    accessorKey: 'consultation_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).consultation_type ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) =>
      (row.original as unknown as Record<string, unknown>).is_active ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">Nonaktif</Badge>
      ),
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'consultation_type', label: humanizeField('consultation_type'), required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  ward_id: null,
  consultation_type: '',
  is_active: false,
}

export function GeneralConsultationRoomListPage() {
  const resource = useGeneralConsultationRoomResource()
  const title = humanizeModuleName('GeneralConsultationRoom')

  return (
    <CrudDialogPage<GeneralConsultationRoom>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.consultation_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
