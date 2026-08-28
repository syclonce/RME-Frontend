import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePembatalanFinalResultResource } from '../api'
import type { PembatalanFinalResult } from '../types'

const columns: ColumnDef<PembatalanFinalResult, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
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
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'cancellation_date', label: humanizeField('cancellation_date'), type: 'date', required: true },
  { key: 'requested_by', label: humanizeField('requested_by'), required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: '',
  reason: '',
  cancellation_date: '',
  requested_by: '',
  status: '',
}

export function PembatalanFinalResultListPage() {
  const resource = usePembatalanFinalResultResource()
  const title = humanizeModuleName('PembatalanFinalResult')

  return (
    <CrudDialogPage<PembatalanFinalResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      resource={resource}
    />
  )
}
