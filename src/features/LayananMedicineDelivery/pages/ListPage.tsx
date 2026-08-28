import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananMedicineDeliveryEndpoint, useMedicineDeliveryResource } from '../api'
import type { MedicineDelivery } from '../types'

const columns: ColumnDef<MedicineDelivery, unknown>[] = [
  {
    header: humanizeField('pharmacy_dispense_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pharmacy-dispenses" id={(row.original as unknown as Record<string, unknown>).pharmacy_dispense_id as number | null} />,
  },
  {
    header: humanizeField('patient_address'),
    accessorKey: 'patient_address',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_address ?? '—'),
  },
  {
    header: humanizeField('courier_employee_id'),
    accessorKey: 'courier_employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).courier_employee_id ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
  {
    header: humanizeField('requested_at'),
    accessorKey: 'requested_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).requested_at ?? '—'),
  },
  {
    header: humanizeField('delivered_at'),
    accessorKey: 'delivered_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).delivered_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'pharmacy_dispense_id', label: humanizeField('pharmacy_dispense_id'), type: 'relation', relationEndpoint: '/pharmacy-dispenses', required: true },
  { key: 'patient_address', label: humanizeField('patient_address'), required: true },
  { key: 'requested_at', label: humanizeField('requested_at'), type: 'date' },
]

const emptyForm = {
  pharmacy_dispense_id: null,
  patient_address: '',
  requested_at: '',
}

const actions: WorkflowAction<MedicineDelivery>[] = [
  {
    key: 'assign-courier',
    label: 'Tugaskan Kurir',
    method: 'post',
    path: (item) => `/medicine-deliveries/${item.id}/assign-courier`,
    fields: [
        { key: 'courier_employee_id', label: humanizeField('courier_employee_id'), type: 'number', required: true },
    ],
    emptyForm: {
        courier_employee_id: '',
    },
  },
  {
    key: 'mark-delivered',
    label: 'Tandai Terkirim',
    method: 'post',
    path: (item) => `/medicine-deliveries/${item.id}/mark-delivered`,
  },
]

export function MedicineDeliveryListPage() {
  const resource = useMedicineDeliveryResource()
  const title = humanizeModuleName('LayananMedicineDelivery')

  return (
    <WorkflowListPage<MedicineDelivery>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananMedicineDeliveryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.patient_address ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
