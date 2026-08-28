import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useChiefComplaintResource } from '../api'
import type { ChiefComplaint } from '../types'

const columns: ColumnDef<ChiefComplaint, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('complaint'),
    accessorKey: 'complaint',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).complaint ?? '—'),
  },
  {
    header: humanizeField('onset'),
    accessorKey: 'onset',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).onset ?? '—'),
  },
  {
    header: humanizeField('duration'),
    accessorKey: 'duration',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).duration ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'complaint', label: humanizeField('complaint') },
  { key: 'onset', label: humanizeField('onset') },
  { key: 'duration', label: humanizeField('duration') },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: null,
  complaint: '',
  onset: '',
  duration: '',
  recorded_by: null,
  recorded_at: '',
}

export function ChiefComplaintListPage() {
  const resource = useChiefComplaintResource()
  const title = humanizeModuleName('MedicalRecordChiefComplaint')

  return (
    <CrudDialogPage<ChiefComplaint>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.complaint ?? `#${item.id}`}
      resource={resource}
    />
  )
}
