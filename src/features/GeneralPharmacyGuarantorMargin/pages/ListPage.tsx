import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePharmacyGuarantorMarginResource } from '../api'
import type { PharmacyGuarantorMargin } from '../types'

const columns: ColumnDef<PharmacyGuarantorMargin, unknown>[] = [
  {
    header: humanizeField('guarantor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/guarantors" id={(row.original as unknown as Record<string, unknown>).guarantor_id as number | null} />,
  },
  {
    header: humanizeField('margin_percentage'),
    accessorKey: 'margin_percentage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).margin_percentage ?? '—'),
  },
  {
    header: humanizeField('effective_date'),
    accessorKey: 'effective_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).effective_date ?? '—'),
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
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors', required: true },
  { key: 'margin_percentage', label: humanizeField('margin_percentage'), type: 'number', required: true },
  { key: 'effective_date', label: humanizeField('effective_date'), type: 'date' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  guarantor_id: null,
  margin_percentage: '',
  effective_date: '',
  is_active: false,
}

export function PharmacyGuarantorMarginListPage() {
  const resource = usePharmacyGuarantorMarginResource()
  const title = humanizeModuleName('GeneralPharmacyGuarantorMargin')

  return (
    <CrudDialogPage<PharmacyGuarantorMargin>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      resource={resource}
    />
  )
}
