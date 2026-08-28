import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananMedicationIterationEndpoint, useMedicationIterationResource } from '../api'
import type { MedicationIteration } from '../types'

const columns: ColumnDef<MedicationIteration, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('iteration_number'),
    accessorKey: 'iteration_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).iteration_number ?? '—'),
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
  {
    header: humanizeField('dispensed_at'),
    accessorKey: 'dispensed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dispensed_at ?? '—'),
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
  { key: 'iteration_number', label: humanizeField('iteration_number'), type: 'number', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'dispensed_at', label: humanizeField('dispensed_at'), type: 'date' },
  { key: 'status', label: humanizeField('status'), required: true },
]

const emptyForm = {
  prescription_id: '',
  iteration_number: '',
  quantity: '',
  dispensed_at: '',
  status: '',
}

const actions: WorkflowAction<MedicationIteration>[] = []

export function MedicationIterationListPage() {
  const resource = useMedicationIterationResource()
  const title = humanizeModuleName('LayananMedicationIteration')

  return (
    <WorkflowListPage<MedicationIteration>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananMedicationIterationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.status ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
