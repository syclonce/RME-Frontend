import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTreatmentProtocolResource } from '../api'
import type { TreatmentProtocol } from '../types'

const columns: ColumnDef<TreatmentProtocol, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('protocol_name'),
    accessorKey: 'protocol_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).protocol_name ?? '—'),
  },
  {
    header: humanizeField('prescribed_by'),
    accessorKey: 'prescribed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescribed_by ?? '—'),
  },
  {
    header: humanizeField('started_at'),
    accessorKey: 'started_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).started_at ?? '—'),
  },
  {
    header: humanizeField('ended_at'),
    accessorKey: 'ended_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ended_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'protocol_name', label: humanizeField('protocol_name'), required: true },
  { key: 'prescribed_by', label: humanizeField('prescribed_by'), type: 'number', required: true },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date', required: true },
  { key: 'ended_at', label: humanizeField('ended_at'), type: 'date' },
  { key: 'status', label: humanizeField('status') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
]

const emptyForm = {
  visit_id: '',
  protocol_name: '',
  prescribed_by: '',
  started_at: '',
  ended_at: '',
  status: '',
  notes: '',
  created_by: '',
}

export function TreatmentProtocolListPage() {
  const resource = useTreatmentProtocolResource()
  const title = humanizeModuleName('LayananTreatmentProtocol')

  return (
    <CrudDialogPage<TreatmentProtocol>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.protocol_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
