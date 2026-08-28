import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPharmacyDispenseEndpoint, usePharmacyDispenseResource } from '../api'
import type { PharmacyDispense } from '../types'

const columns: ColumnDef<PharmacyDispense, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('dispensed_by'),
    accessorKey: 'dispensed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dispensed_by ?? '—'),
  },
  {
    header: humanizeField('dispensed_at'),
    accessorKey: 'dispensed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dispensed_at ?? '—'),
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
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
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'number', required: true },
]

const emptyForm = {
  prescription_id: '',
}

const actions: WorkflowAction<PharmacyDispense>[] = []

export function PharmacyDispenseListPage() {
  const resource = usePharmacyDispenseResource()
  const title = humanizeModuleName('LayananPharmacyDispense')

  return (
    <WorkflowListPage<PharmacyDispense>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPharmacyDispenseEndpoint}
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
