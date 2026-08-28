import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useServiceTariffDistributionResource } from '../api'
import type { ServiceTariffDistribution } from '../types'

const columns: ColumnDef<ServiceTariffDistribution, unknown>[] = [
  {
    header: humanizeField('service_tariff_id'),
    cell: ({ row }) => <RelationLabel endpoint="/service-tariffs" id={(row.original as unknown as Record<string, unknown>).service_tariff_id as number | null} />,
  },
  {
    header: humanizeField('component_id'),
    accessorKey: 'component_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).component_id ?? '—'),
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
  { key: 'service_tariff_id', label: humanizeField('service_tariff_id'), type: 'relation', relationEndpoint: '/service-tariffs' },
  { key: 'component_id', label: humanizeField('component_id'), type: 'number' },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  service_tariff_id: null,
  component_id: '',
  amount: '',
  is_active: false,
}

export function ServiceTariffDistributionListPage() {
  const resource = useServiceTariffDistributionResource()
  const title = humanizeModuleName('GeneralServiceTariffDistribution')

  return (
    <CrudDialogPage<ServiceTariffDistribution>
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
