import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePackageTariffDistributionResource } from '../api'
import type { PackageTariffDistribution } from '../types'

const columns: ColumnDef<PackageTariffDistribution, unknown>[] = [
  {
    header: humanizeField('package_id'),
    cell: ({ row }) => <RelationLabel endpoint="/packages" id={(row.original as unknown as Record<string, unknown>).package_id as number | null} />,
  },
  {
    header: humanizeField('component_name'),
    accessorKey: 'component_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).component_name ?? '—'),
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
  { key: 'package_id', label: humanizeField('package_id'), type: 'relation', relationEndpoint: '/packages', required: true },
  { key: 'component_name', label: humanizeField('component_name'), required: true },
  { key: 'percentage', label: humanizeField('percentage'), type: 'number' },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  package_id: null,
  component_name: '',
  percentage: '',
  amount: '',
  is_active: false,
}

export function PackageTariffDistributionListPage() {
  const resource = usePackageTariffDistributionResource()
  const title = humanizeModuleName('GeneralPackageTariffDistribution')

  return (
    <CrudDialogPage<PackageTariffDistribution>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.component_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
