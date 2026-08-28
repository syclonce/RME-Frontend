import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMedicationServiceLimitResource } from '../api'
import type { MedicationServiceLimit } from '../types'

const columns: ColumnDef<MedicationServiceLimit, unknown>[] = [
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('guarantor_type'),
    accessorKey: 'guarantor_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).guarantor_type ?? '—'),
  },
  {
    header: humanizeField('max_quantity_per_month'),
    accessorKey: 'max_quantity_per_month',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).max_quantity_per_month ?? '—'),
  },
  {
    header: humanizeField('max_days_supply'),
    accessorKey: 'max_days_supply',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).max_days_supply ?? '—'),
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
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'guarantor_type', label: humanizeField('guarantor_type') },
  { key: 'max_quantity_per_month', label: humanizeField('max_quantity_per_month'), type: 'number', required: true },
  { key: 'max_days_supply', label: humanizeField('max_days_supply'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  item_id: null,
  guarantor_type: '',
  max_quantity_per_month: '',
  max_days_supply: '',
  is_active: false,
}

export function MedicationServiceLimitListPage() {
  const resource = useMedicationServiceLimitResource()
  const title = humanizeModuleName('LayananMedicationServiceLimit')

  return (
    <CrudDialogPage<MedicationServiceLimit>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.guarantor_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
