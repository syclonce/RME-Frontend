import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePembatalanMedicalRecordCancellationResource } from '../api'
import type { PembatalanMedicalRecordCancellation } from '../types'

const columns: ColumnDef<PembatalanMedicalRecordCancellation, unknown>[] = [
  {
    header: humanizeField('medical_record_id'),
    accessorKey: 'medical_record_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).medical_record_id ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('cancellation_date'),
    accessorKey: 'cancellation_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cancellation_date ?? '—'),
  },
  {
    header: humanizeField('requested_by'),
    accessorKey: 'requested_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).requested_by ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'medical_record_id', label: humanizeField('medical_record_id'), required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'cancellation_date', label: humanizeField('cancellation_date'), type: 'date', required: true },
  { key: 'requested_by', label: humanizeField('requested_by'), required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  medical_record_id: '',
  reason: '',
  cancellation_date: '',
  requested_by: '',
  status: '',
}

export function PembatalanMedicalRecordCancellationListPage() {
  const resource = usePembatalanMedicalRecordCancellationResource()
  const title = humanizeModuleName('PembatalanMedicalRecordCancellation')

  return (
    <CrudDialogPage<PembatalanMedicalRecordCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.medical_record_id ?? `#${item.id}`}
      resource={resource}
    />
  )
}
