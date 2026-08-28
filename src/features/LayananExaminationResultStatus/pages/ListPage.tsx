import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useExaminationResultStatusResource } from '../api'
import type { ExaminationResultStatus } from '../types'

const columns: ColumnDef<ExaminationResultStatus, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('examination_type'),
    accessorKey: 'examination_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examination_type ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
  {
    header: humanizeField('verified_by'),
    accessorKey: 'verified_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).verified_by ?? '—'),
  },
  {
    header: humanizeField('verified_at'),
    accessorKey: 'verified_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).verified_at ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'examination_type', label: humanizeField('examination_type'), required: true },
  { key: 'status', label: humanizeField('status') },
  { key: 'verified_by', label: humanizeField('verified_by'), type: 'combobox', relationEndpoint: '/employees' },
  { key: 'verified_at', label: humanizeField('verified_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: null,
  examination_type: '',
  status: '',
  verified_by: null,
  verified_at: '',
  notes: '',
}

export function ExaminationResultStatusListPage() {
  const resource = useExaminationResultStatusResource()
  const title = humanizeModuleName('LayananExaminationResultStatus')

  return (
    <CrudDialogPage<ExaminationResultStatus>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.examination_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
