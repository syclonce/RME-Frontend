import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePembatalanDocumentCancellationResource } from '../api'
import type { PembatalanDocumentCancellation } from '../types'

const columns: ColumnDef<PembatalanDocumentCancellation, unknown>[] = [
  {
    header: humanizeField('document_id'),
    accessorKey: 'document_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).document_id ?? '—'),
  },
  {
    header: humanizeField('document_type'),
    accessorKey: 'document_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).document_type ?? '—'),
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
  { key: 'document_id', label: humanizeField('document_id'), required: true },
  { key: 'document_type', label: humanizeField('document_type'), required: true },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'cancellation_date', label: humanizeField('cancellation_date'), type: 'date', required: true },
  { key: 'requested_by', label: humanizeField('requested_by'), required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  document_id: '',
  document_type: '',
  reason: '',
  cancellation_date: '',
  requested_by: '',
  status: '',
}

export function PembatalanDocumentCancellationListPage() {
  const resource = usePembatalanDocumentCancellationResource()
  const title = humanizeModuleName('PembatalanDocumentCancellation')

  return (
    <CrudDialogPage<PembatalanDocumentCancellation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.document_id ?? `#${item.id}`}
      resource={resource}
    />
  )
}
