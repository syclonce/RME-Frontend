import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useProviderServiceResource } from '../api'
import type { ProviderService } from '../types'

const columns: ColumnDef<ProviderService, unknown>[] = [
  {
    header: humanizeField('payment_provider_id'),
    cell: ({ row }) => <RelationLabel endpoint="/payment-providers" id={(row.original as unknown as Record<string, unknown>).payment_provider_id as number | null} />,
  },
  {
    header: humanizeField('service_code'),
    accessorKey: 'service_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_code ?? '—'),
  },
  {
    header: humanizeField('service_name'),
    accessorKey: 'service_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_name ?? '—'),
  },
  {
    header: humanizeField('service_type'),
    accessorKey: 'service_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).service_type ?? '—'),
  },
  {
    header: humanizeField('admin_fee_type'),
    accessorKey: 'admin_fee_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).admin_fee_type ?? '—'),
  },
  {
    header: humanizeField('admin_fee_amount'),
    accessorKey: 'admin_fee_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).admin_fee_amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'payment_provider_id', label: humanizeField('payment_provider_id'), type: 'relation', relationEndpoint: '/payment-providers', required: true },
  { key: 'service_code', label: humanizeField('service_code') },
  { key: 'service_name', label: humanizeField('service_name'), required: true },
  { key: 'service_type', label: humanizeField('service_type') },
  { key: 'admin_fee_type', label: humanizeField('admin_fee_type') },
  { key: 'admin_fee_amount', label: humanizeField('admin_fee_amount'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  payment_provider_id: null,
  service_code: '',
  service_name: '',
  service_type: '',
  admin_fee_type: '',
  admin_fee_amount: '',
  is_active: false,
}

export function ProviderServiceListPage() {
  const resource = useProviderServiceResource()
  const title = humanizeModuleName('PembayaranProviderService')

  return (
    <CrudDialogPage<ProviderService>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.service_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
