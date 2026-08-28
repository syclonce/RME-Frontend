import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePrescriptionOriginUnitRestrictionResource } from '../api'
import type { PrescriptionOriginUnitRestriction } from '../types'

const columns: ColumnDef<PrescriptionOriginUnitRestriction, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('is_allowed'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_allowed ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('note'),
    accessorKey: 'note',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).note ?? '—'),
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
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items' },
  { key: 'is_allowed', label: humanizeField('is_allowed'), type: 'checkbox' },
  { key: 'note', label: humanizeField('note') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  ward_id: null,
  item_id: null,
  is_allowed: false,
  note: '',
  is_active: false,
}

export function PrescriptionOriginUnitRestrictionListPage() {
  const resource = usePrescriptionOriginUnitRestrictionResource()
  const title = humanizeModuleName('GeneralPrescriptionOriginUnitRestriction')

  return (
    <CrudDialogPage<PrescriptionOriginUnitRestriction>
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
