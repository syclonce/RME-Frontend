import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLeftoverMedicationVoucherEndpoint, useLeftoverMedicationVoucherResource } from '../api'
import type { LeftoverMedicationVoucher } from '../types'

const columns: ColumnDef<LeftoverMedicationVoucher, unknown>[] = [
  {
    header: humanizeField('voucher_number'),
    accessorKey: 'voucher_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).voucher_number ?? '—'),
  },
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
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
  {
    header: humanizeField('issued_at'),
    accessorKey: 'issued_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issued_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'voucher_number', label: humanizeField('voucher_number'), required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'number' },
  { key: 'status', label: humanizeField('status') },
  { key: 'issued_at', label: humanizeField('issued_at'), type: 'date', required: true },
  { key: 'redeemed_at', label: humanizeField('redeemed_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  voucher_number: '',
  visit_id: '',
  patient_id: '',
  prescription_id: '',
  status: '',
  issued_at: '',
  redeemed_at: '',
  notes: '',
}

const actions: WorkflowAction<LeftoverMedicationVoucher>[] = []

export function LeftoverMedicationVoucherListPage() {
  const resource = useLeftoverMedicationVoucherResource()
  const title = humanizeModuleName('LayananLeftoverMedicationVoucher')

  return (
    <WorkflowListPage<LeftoverMedicationVoucher>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLeftoverMedicationVoucherEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.voucher_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
