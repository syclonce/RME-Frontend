import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePaymentProviderResource } from '../api'
import type { PaymentProvider } from '../types'

const columns: ColumnDef<PaymentProvider, unknown>[] = [
  {
    header: humanizeField('provider_code'),
    accessorKey: 'provider_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).provider_code ?? '—'),
  },
  {
    header: humanizeField('provider_name'),
    accessorKey: 'provider_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).provider_name ?? '—'),
  },
  {
    header: humanizeField('provider_type'),
    accessorKey: 'provider_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).provider_type ?? '—'),
  },
  {
    header: humanizeField('merchant_id'),
    accessorKey: 'merchant_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).merchant_id ?? '—'),
  },
  {
    header: humanizeField('api_base_url'),
    accessorKey: 'api_base_url',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).api_base_url ?? '—'),
  },
  {
    header: humanizeField('contact_person'),
    accessorKey: 'contact_person',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contact_person ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'provider_code', label: humanizeField('provider_code') },
  { key: 'provider_name', label: humanizeField('provider_name'), required: true },
  { key: 'provider_type', label: humanizeField('provider_type') },
  { key: 'merchant_id', label: humanizeField('merchant_id') },
  { key: 'api_base_url', label: humanizeField('api_base_url') },
  { key: 'contact_person', label: humanizeField('contact_person') },
  { key: 'contact_phone', label: humanizeField('contact_phone') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  provider_code: '',
  provider_name: '',
  provider_type: '',
  merchant_id: '',
  api_base_url: '',
  contact_person: '',
  contact_phone: '',
  is_active: false,
}

export function PaymentProviderListPage() {
  const resource = usePaymentProviderResource()
  const title = humanizeModuleName('PembayaranPaymentProvider')

  return (
    <CrudDialogPage<PaymentProvider>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.provider_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
