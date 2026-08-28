import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PenjualanSaleEndpoint, useSaleResource } from '../api'
import type { Sale } from '../types'

const columns: ColumnDef<Sale, unknown>[] = [
  {
    header: humanizeField('sale_number'),
    accessorKey: 'sale_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sale_number ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('sold_by'),
    accessorKey: 'sold_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sold_by ?? '—'),
  },
  {
    header: humanizeField('sold_at'),
    accessorKey: 'sold_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sold_at ?? '—'),
  },
  {
    header: humanizeField('total_amount'),
    accessorKey: 'total_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).total_amount ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number' },
  { key: 'sold_by', label: humanizeField('sold_by'), type: 'number', required: true },
  { key: 'sold_at', label: humanizeField('sold_at'), type: 'date' },
  { key: 'total_amount', label: humanizeField('total_amount'), type: 'number', required: true },
]

const emptyForm = {
  patient_id: '',
  sold_by: '',
  sold_at: '',
  total_amount: '',
}

const actions: WorkflowAction<Sale>[] = []

export function SaleListPage() {
  const resource = useSaleResource()
  const title = humanizeModuleName('PenjualanSale')

  return (
    <WorkflowListPage<Sale>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PenjualanSaleEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
