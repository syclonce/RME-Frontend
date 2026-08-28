import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGuarantorItemCategoryMappingResource } from '../api'
import type { GuarantorItemCategoryMapping } from '../types'

const columns: ColumnDef<GuarantorItemCategoryMapping, unknown>[] = [
  {
    header: humanizeField('guarantor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/guarantors" id={(row.original as unknown as Record<string, unknown>).guarantor_id as number | null} />,
  },
  {
    header: humanizeField('item_category_id'),
    cell: ({ row }) => <RelationLabel endpoint="/inventoryitemcategories" id={(row.original as unknown as Record<string, unknown>).item_category_id as number | null} />,
  },
  {
    header: humanizeField('is_covered'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_covered ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('coverage_percentage'),
    accessorKey: 'coverage_percentage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).coverage_percentage ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors', required: true },
  { key: 'item_category_id', label: humanizeField('item_category_id'), type: 'relation', relationEndpoint: '/inventoryitemcategories', required: true },
  { key: 'is_covered', label: humanizeField('is_covered'), type: 'checkbox' },
  { key: 'coverage_percentage', label: humanizeField('coverage_percentage'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  guarantor_id: null,
  item_category_id: null,
  is_covered: false,
  coverage_percentage: '',
  notes: '',
}

export function GuarantorItemCategoryMappingListPage() {
  const resource = useGuarantorItemCategoryMappingResource()
  const title = humanizeModuleName('GeneralGuarantorItemCategoryMapping')

  return (
    <CrudDialogPage<GuarantorItemCategoryMapping>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      resource={resource}
    />
  )
}
