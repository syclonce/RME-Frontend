import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryStockOpnameEndpoint, useInventoryStockOpnameResource } from '../api'
import type { InventoryStockOpname } from '../types'

const columns: ColumnDef<InventoryStockOpname, unknown>[] = [
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('opname_date'),
    accessorKey: 'opname_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).opname_date ?? '—'),
  },
  {
    header: humanizeField('conducted_by'),
    accessorKey: 'conducted_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).conducted_by ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'opname_date', label: humanizeField('opname_date'), type: 'date', required: true },
  { key: 'conducted_by', label: humanizeField('conducted_by'), type: 'number', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  ward_id: null,
  opname_date: '',
  conducted_by: '',
  notes: '',
}

const actions: WorkflowAction<InventoryStockOpname>[] = []

export function InventoryStockOpnameListPage() {
  const resource = useInventoryStockOpnameResource()
  const title = humanizeModuleName('InventoryStockOpname')

  return (
    <WorkflowListPage<InventoryStockOpname>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryStockOpnameEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
