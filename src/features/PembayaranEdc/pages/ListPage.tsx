import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranEdcEndpoint, useEdcResource } from '../api'
import type { Edc } from '../types'

const columns: ColumnDef<Edc, unknown>[] = [
  {
    header: humanizeField('payment_id'),
    cell: ({ row }) => <RelationLabel endpoint="/payments" id={(row.original as unknown as Record<string, unknown>).payment_id as number | null} />,
  },
  {
    header: humanizeField('edc_reference_number'),
    accessorKey: 'edc_reference_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).edc_reference_number ?? '—'),
  },
  {
    header: humanizeField('bank_name'),
    accessorKey: 'bank_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bank_name ?? '—'),
  },
  {
    header: humanizeField('card_type'),
    accessorKey: 'card_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).card_type ?? '—'),
  },
  {
    header: humanizeField('card_last_four'),
    accessorKey: 'card_last_four',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).card_last_four ?? '—'),
  },
  {
    header: humanizeField('approval_code'),
    accessorKey: 'approval_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).approval_code ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'payment_id', label: humanizeField('payment_id'), type: 'relation', relationEndpoint: '/payments', required: true },
  { key: 'edc_reference_number', label: humanizeField('edc_reference_number'), required: true },
  { key: 'bank_name', label: humanizeField('bank_name'), required: true },
  { key: 'card_type', label: humanizeField('card_type'), required: true },
  { key: 'card_last_four', label: humanizeField('card_last_four') },
  { key: 'approval_code', label: humanizeField('approval_code') },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'transaction_at', label: humanizeField('transaction_at'), type: 'date' },
]

const emptyForm = {
  payment_id: null,
  edc_reference_number: '',
  bank_name: '',
  card_type: '',
  card_last_four: '',
  approval_code: '',
  amount: '',
  transaction_at: '',
}

const actions: WorkflowAction<Edc>[] = []

export function EdcListPage() {
  const resource = useEdcResource()
  const title = humanizeModuleName('PembayaranEdc')

  return (
    <WorkflowListPage<Edc>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranEdcEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.edc_reference_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
