import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranCorporateReceivableSettlementEndpoint, useCorporateReceivableSettlementResource } from '../api'
import type { CorporateReceivableSettlement } from '../types'

const columns: ColumnDef<CorporateReceivableSettlement, unknown>[] = [
  {
    header: humanizeField('corporate_receivable_id'),
    cell: ({ row }) => <RelationLabel endpoint="/corporate-receivables" id={(row.original as unknown as Record<string, unknown>).corporate_receivable_id as number | null} />,
  },
  {
    header: humanizeField('paid_amount'),
    accessorKey: 'paid_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).paid_amount ?? '—'),
  },
  {
    header: humanizeField('paid_at'),
    accessorKey: 'paid_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).paid_at ?? '—'),
  },
  {
    header: humanizeField('received_by'),
    accessorKey: 'received_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).received_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'corporate_receivable_id', label: humanizeField('corporate_receivable_id'), type: 'relation', relationEndpoint: '/corporate-receivables', required: true },
  { key: 'paid_amount', label: humanizeField('paid_amount'), type: 'number', required: true },
  { key: 'paid_at', label: humanizeField('paid_at'), type: 'date' },
]

const emptyForm = {
  corporate_receivable_id: null,
  paid_amount: '',
  paid_at: '',
}

const actions: WorkflowAction<CorporateReceivableSettlement>[] = []

export function CorporateReceivableSettlementListPage() {
  const resource = useCorporateReceivableSettlementResource()
  const title = humanizeModuleName('PembayaranCorporateReceivableSettlement')

  return (
    <WorkflowListPage<CorporateReceivableSettlement>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranCorporateReceivableSettlementEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
