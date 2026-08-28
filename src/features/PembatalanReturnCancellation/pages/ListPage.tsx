import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePembatalanReturnCancellationResource } from '../api'
import type { PembatalanReturnCancellation } from '../types'

const columns: ColumnDef<PembatalanReturnCancellation, unknown>[] = [
  {
    header: humanizeField('return_id'),
    accessorKey: 'return_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).return_id ?? '—'),
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
  { key: 'return_id', label: humanizeField('return_id'), required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'cancellation_date', label: humanizeField('cancellation_date'), type: 'date', required: true },
  { key: 'requested_by', label: humanizeField('requested_by'), required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  return_id: '',
  reason: '',
  cancellation_date: '',
  requested_by: '',
  status: '',
}

export function PembatalanReturnCancellationListPage() {
  const resource = usePembatalanReturnCancellationResource()
  const title = humanizeModuleName('PembatalanReturnCancellation')

  return (
    <CrudDialogPage<PembatalanReturnCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.return_id ?? `#${item.id}`}
      resource={resource}
    />
  )
}
