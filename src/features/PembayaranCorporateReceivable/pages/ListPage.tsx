import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranCorporateReceivableEndpoint, useCorporateReceivableResource } from '../api'
import type { CorporateReceivable } from '../types'

const columns: ColumnDef<CorporateReceivable, unknown>[] = [
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
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
  {
    header: humanizeField('due_date'),
    accessorKey: 'due_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).due_date ?? '—'),
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
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'number', required: true },
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors', required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'due_date', label: humanizeField('due_date'), type: 'date', required: true },
]

const emptyForm = {
  invoice_id: '',
  guarantor_id: null,
  amount: '',
  due_date: '',
}

const actions: WorkflowAction<CorporateReceivable>[] = []

export function CorporateReceivableListPage() {
  const resource = useCorporateReceivableResource()
  const title = humanizeModuleName('PembayaranCorporateReceivable')

  return (
    <WorkflowListPage<CorporateReceivable>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranCorporateReceivableEndpoint}
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
