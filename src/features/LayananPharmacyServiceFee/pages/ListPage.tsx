import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePharmacyServiceFeeResource } from '../api'
import type { PharmacyServiceFee } from '../types'

const columns: ColumnDef<PharmacyServiceFee, unknown>[] = [
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('fee_name'),
    accessorKey: 'fee_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).fee_name ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
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
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items' },
  { key: 'fee_name', label: humanizeField('fee_name'), required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  item_id: null,
  fee_name: '',
  amount: '',
  is_active: false,
}

export function PharmacyServiceFeeListPage() {
  const resource = usePharmacyServiceFeeResource()
  const title = humanizeModuleName('LayananPharmacyServiceFee')

  return (
    <CrudDialogPage<PharmacyServiceFee>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.fee_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
