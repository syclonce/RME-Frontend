import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranTransferEndpoint, useTransferResource } from '../api'
import type { Transfer } from '../types'

const columns: ColumnDef<Transfer, unknown>[] = [
  {
    header: humanizeField('payment_id'),
    cell: ({ row }) => <RelationLabel endpoint="/payments" id={(row.original as unknown as Record<string, unknown>).payment_id as number | null} />,
  },
  {
    header: humanizeField('transfer_reference_number'),
    accessorKey: 'transfer_reference_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).transfer_reference_number ?? '—'),
  },
  {
    header: humanizeField('source_bank_name'),
    accessorKey: 'source_bank_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_bank_name ?? '—'),
  },
  {
    header: humanizeField('destination_account_number'),
    accessorKey: 'destination_account_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).destination_account_number ?? '—'),
  },
  {
    header: humanizeField('destination_account_name'),
    accessorKey: 'destination_account_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).destination_account_name ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'payment_id', label: humanizeField('payment_id'), type: 'relation', relationEndpoint: '/payments', required: true },
  { key: 'transfer_reference_number', label: humanizeField('transfer_reference_number'), required: true },
  { key: 'source_bank_name', label: humanizeField('source_bank_name'), required: true },
  { key: 'destination_account_number', label: humanizeField('destination_account_number'), required: true },
  { key: 'destination_account_name', label: humanizeField('destination_account_name'), required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'transferred_at', label: humanizeField('transferred_at'), type: 'date' },
  { key: 'proof_file_path', label: humanizeField('proof_file_path') },
]

const emptyForm = {
  payment_id: null,
  transfer_reference_number: '',
  source_bank_name: '',
  destination_account_number: '',
  destination_account_name: '',
  amount: '',
  transferred_at: '',
  proof_file_path: '',
}

const actions: WorkflowAction<Transfer>[] = []

export function TransferListPage() {
  const resource = useTransferResource()
  const title = humanizeModuleName('PembayaranTransfer')

  return (
    <WorkflowListPage<Transfer>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranTransferEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.transfer_reference_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
