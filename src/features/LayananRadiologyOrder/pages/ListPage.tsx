import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananRadiologyOrderEndpoint, useRadiologyOrderResource } from '../api'
import type { RadiologyOrder } from '../types'

const columns: ColumnDef<RadiologyOrder, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('ordering_doctor_id'),
    accessorKey: 'ordering_doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordering_doctor_id ?? '—'),
  },
  {
    header: humanizeField('ordered_at'),
    accessorKey: 'ordered_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordered_at ?? '—'),
  },
  {
    header: humanizeField('clinical_notes'),
    accessorKey: 'clinical_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).clinical_notes ?? '—'),
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
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'ordering_doctor_id', label: humanizeField('ordering_doctor_id'), type: 'number' },
  { key: 'ordered_at', label: humanizeField('ordered_at'), type: 'date', required: true },
  { key: 'clinical_notes', label: humanizeField('clinical_notes') },
  { key: 'status', label: humanizeField('status'), required: true },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  ordering_doctor_id: '',
  ordered_at: '',
  clinical_notes: '',
  status: '',
}

const actions: WorkflowAction<RadiologyOrder>[] = []

export function RadiologyOrderListPage() {
  const resource = useRadiologyOrderResource()
  const title = humanizeModuleName('LayananRadiologyOrder')

  return (
    <WorkflowListPage<RadiologyOrder>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananRadiologyOrderEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.clinical_notes ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
