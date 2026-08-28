import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useQuantityRestrictionResource } from '../api'
import type { QuantityRestriction } from '../types'

const columns: ColumnDef<QuantityRestriction, unknown>[] = [
  {
    header: humanizeField('drug_name'),
    accessorKey: 'drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).drug_name ?? '—'),
  },
  {
    header: humanizeField('max_quantity_per_prescription'),
    accessorKey: 'max_quantity_per_prescription',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).max_quantity_per_prescription ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
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
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'max_quantity_per_prescription', label: humanizeField('max_quantity_per_prescription'), type: 'number', required: true },
  { key: 'unit', label: humanizeField('unit'), required: true },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  drug_name: '',
  max_quantity_per_prescription: '',
  unit: '',
  notes: '',
  is_active: false,
}

export function QuantityRestrictionListPage() {
  const resource = useQuantityRestrictionResource()
  const title = humanizeModuleName('GeneralQuantityRestriction')

  return (
    <CrudDialogPage<QuantityRestriction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.drug_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
