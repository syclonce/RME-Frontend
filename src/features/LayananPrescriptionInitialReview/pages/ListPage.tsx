import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePrescriptionInitialReviewResource } from '../api'
import type { PrescriptionInitialReview } from '../types'

const columns: ColumnDef<PrescriptionInitialReview, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('reviewed_by'),
    accessorKey: 'reviewed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reviewed_by ?? '—'),
  },
  {
    header: humanizeField('reviewed_at'),
    accessorKey: 'reviewed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reviewed_at ?? '—'),
  },
  {
    header: humanizeField('is_appropriate'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_appropriate ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('issues_found'),
    accessorKey: 'issues_found',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issues_found ?? '—'),
  },
  {
    header: humanizeField('recommendation'),
    accessorKey: 'recommendation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommendation ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'combobox', relationEndpoint: '/prescriptions', required: true },
  { key: 'reviewed_by', label: humanizeField('reviewed_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'reviewed_at', label: humanizeField('reviewed_at'), type: 'date', required: true },
  { key: 'is_appropriate', label: humanizeField('is_appropriate'), type: 'checkbox' },
  { key: 'issues_found', label: humanizeField('issues_found') },
  { key: 'recommendation', label: humanizeField('recommendation') },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  prescription_id: null,
  reviewed_by: null,
  reviewed_at: '',
  is_appropriate: false,
  issues_found: '',
  recommendation: '',
  status: '',
}

export function PrescriptionInitialReviewListPage() {
  const resource = usePrescriptionInitialReviewResource()
  const title = humanizeModuleName('LayananPrescriptionInitialReview')

  return (
    <CrudDialogPage<PrescriptionInitialReview>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.issues_found ?? `#${item.id}`}
      resource={resource}
    />
  )
}
