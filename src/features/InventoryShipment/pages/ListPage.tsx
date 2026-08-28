import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryShipmentEndpoint, useShipmentResource } from '../api'
import type { Shipment } from '../types'

const columns: ColumnDef<Shipment, unknown>[] = [
  {
    header: humanizeField('from_ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).from_ward_id as number | null} />,
  },
  {
    header: humanizeField('to_ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).to_ward_id as number | null} />,
  },
  {
    header: humanizeField('shipped_by'),
    accessorKey: 'shipped_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shipped_by ?? '—'),
  },
  {
    header: humanizeField('shipped_at'),
    accessorKey: 'shipped_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shipped_at ?? '—'),
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
  { key: 'from_ward_id', label: humanizeField('from_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'to_ward_id', label: humanizeField('to_ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'shipped_by', label: humanizeField('shipped_by'), type: 'number', required: true },
  { key: 'shipped_at', label: humanizeField('shipped_at'), type: 'date' },
]

const emptyForm = {
  from_ward_id: null,
  to_ward_id: null,
  shipped_by: '',
  shipped_at: '',
}

const actions: WorkflowAction<Shipment>[] = []

export function ShipmentListPage() {
  const resource = useShipmentResource()
  const title = humanizeModuleName('InventoryShipment')

  return (
    <WorkflowListPage<Shipment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryShipmentEndpoint}
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
