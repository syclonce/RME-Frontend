import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PembayaranPatientReceivableEndpoint, usePatientReceivableResource } from '../api'
import type { PatientReceivable } from '../types'

const columns: ColumnDef<PatientReceivable, unknown>[] = [
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
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
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
  { key: 'due_date', label: humanizeField('due_date'), type: 'date', required: true },
]

const emptyForm = {
  invoice_id: '',
  patient_id: '',
  amount: '',
  due_date: '',
}

const actions: WorkflowAction<PatientReceivable>[] = []

export function PatientReceivableListPage() {
  const resource = usePatientReceivableResource()
  const title = humanizeModuleName('PembayaranPatientReceivable')

  return (
    <WorkflowListPage<PatientReceivable>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PembayaranPatientReceivableEndpoint}
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
