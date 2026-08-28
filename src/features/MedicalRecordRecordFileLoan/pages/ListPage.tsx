import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRecordFileLoanResource } from '../api'
import type { RecordFileLoan } from '../types'

const columns: ColumnDef<RecordFileLoan, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('borrower_name'),
    accessorKey: 'borrower_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).borrower_name ?? '—'),
  },
  {
    header: humanizeField('borrower_unit'),
    accessorKey: 'borrower_unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).borrower_unit ?? '—'),
  },
  {
    header: humanizeField('purpose'),
    accessorKey: 'purpose',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).purpose ?? '—'),
  },
  {
    header: humanizeField('loaned_at'),
    accessorKey: 'loaned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).loaned_at ?? '—'),
  },
  {
    header: humanizeField('due_at'),
    accessorKey: 'due_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).due_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'borrower_name', label: humanizeField('borrower_name'), required: true },
  { key: 'borrower_unit', label: humanizeField('borrower_unit') },
  { key: 'purpose', label: humanizeField('purpose') },
  { key: 'loaned_at', label: humanizeField('loaned_at'), type: 'date', required: true },
  { key: 'due_at', label: humanizeField('due_at'), type: 'date' },
  { key: 'returned_at', label: humanizeField('returned_at'), type: 'date' },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"borrowed","label":"Borrowed"},{"value":"returned","label":"Returned"},{"value":"overdue","label":"Overdue"}] },
]

const emptyForm = {
  patient_id: null,
  borrower_name: '',
  borrower_unit: '',
  purpose: '',
  loaned_at: '',
  due_at: '',
  returned_at: '',
  status: '',
}

export function RecordFileLoanListPage() {
  const resource = useRecordFileLoanResource()
  const title = humanizeModuleName('MedicalRecordRecordFileLoan')

  return (
    <CrudDialogPage<RecordFileLoan>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.borrower_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
