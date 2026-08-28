import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useClaimInvoiceResource } from '../api'
import type { ClaimInvoice } from '../types'

const columns: ColumnDef<ClaimInvoice, unknown>[] = [
  {
    header: humanizeField('claim_number'),
    accessorKey: 'claim_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).claim_number ?? '—'),
  },
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('guarantor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/guarantors" id={(row.original as unknown as Record<string, unknown>).guarantor_id as number | null} />,
  },
  {
    header: humanizeField('claim_amount'),
    accessorKey: 'claim_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).claim_amount ?? '—'),
  },
  {
    header: humanizeField('verified_amount'),
    accessorKey: 'verified_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).verified_amount ?? '—'),
  },
  {
    header: humanizeField('submitted_at'),
    accessorKey: 'submitted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).submitted_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'claim_number', label: humanizeField('claim_number') },
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'combobox', relationEndpoint: '/invoices', required: true },
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors' },
  { key: 'claim_amount', label: humanizeField('claim_amount'), type: 'number', required: true },
]

const emptyForm = {
  claim_number: '',
  invoice_id: null,
  guarantor_id: null,
  claim_amount: '',
}

export function ClaimInvoiceListPage() {
  const resource = useClaimInvoiceResource()
  const title = humanizeModuleName('PembayaranClaimInvoice')

  return (
    <CrudDialogPage<ClaimInvoice>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.claim_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
