import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranInvoiceCancellationEndpoint, useInvoiceCancellationResource } from '../api'
import type { InvoiceCancellation } from '../types'

const columns: ColumnDef<InvoiceCancellation, unknown>[] = [
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('cancelled_at'),
    accessorKey: 'cancelled_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancelled_at ?? '—'),
  },
  {
    header: humanizeField('cancelled_by'),
    accessorKey: 'cancelled_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancelled_by ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
]

const emptyForm = {
  invoice_id: '',
  reason: '',
}

const actions: WorkflowAction<InvoiceCancellation>[] = []

export function InvoiceCancellationListPage() {
  const resource = useInvoiceCancellationResource()
  const title = humanizeModuleName('PembayaranInvoiceCancellation')

  return (
    <WorkflowListPage<InvoiceCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranInvoiceCancellationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
