import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePackageTariffDistributionItemResource } from '../api'
import type { PackageTariffDistributionItem } from '../types'

const columns: ColumnDef<PackageTariffDistributionItem, unknown>[] = [
  {
    header: humanizeField('package_tariff_distribution_id'),
    cell: ({ row }) => <RelationLabel endpoint="/package-tariff-distributions" id={(row.original as unknown as Record<string, unknown>).package_tariff_distribution_id as number | null} />,
  },
  {
    header: humanizeField('recipient_type'),
    accessorKey: 'recipient_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recipient_type ?? '—'),
  },
  {
    header: humanizeField('recipient_id'),
    accessorKey: 'recipient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recipient_id ?? '—'),
  },
  {
    header: humanizeField('percentage'),
    accessorKey: 'percentage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).percentage ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'package_tariff_distribution_id', label: humanizeField('package_tariff_distribution_id'), type: 'relation', relationEndpoint: '/package-tariff-distributions', required: true },
  { key: 'recipient_type', label: humanizeField('recipient_type'), required: true },
  { key: 'recipient_id', label: humanizeField('recipient_id'), type: 'number' },
  { key: 'percentage', label: humanizeField('percentage'), type: 'number' },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  package_tariff_distribution_id: null,
  recipient_type: '',
  recipient_id: '',
  percentage: '',
  amount: '',
  notes: '',
}

export function PackageTariffDistributionItemListPage() {
  const resource = usePackageTariffDistributionItemResource()
  const title = humanizeModuleName('GeneralPackageTariffDistributionItem')

  return (
    <CrudDialogPage<PackageTariffDistributionItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.recipient_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
