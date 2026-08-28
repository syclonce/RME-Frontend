import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananRadiologyViewerLogEndpoint, useRadiologyViewerLogResource } from '../api'
import type { RadiologyViewerLog } from '../types'

const columns: ColumnDef<RadiologyViewerLog, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('accession_number'),
    accessorKey: 'accession_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).accession_number ?? '—'),
  },
  {
    header: humanizeField('viewed_by'),
    accessorKey: 'viewed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).viewed_by ?? '—'),
  },
  {
    header: humanizeField('viewed_at'),
    accessorKey: 'viewed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).viewed_at ?? '—'),
  },
  {
    header: humanizeField('ip_address'),
    accessorKey: 'ip_address',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ip_address ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'accession_number', label: humanizeField('accession_number') },
  { key: 'viewed_by', label: humanizeField('viewed_by'), type: 'number', required: true },
  { key: 'viewed_at', label: humanizeField('viewed_at'), type: 'date', required: true },
  { key: 'ip_address', label: humanizeField('ip_address') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  accession_number: '',
  viewed_by: '',
  viewed_at: '',
  ip_address: '',
  notes: '',
}

const actions: WorkflowAction<RadiologyViewerLog>[] = []

export function RadiologyViewerLogListPage() {
  const resource = useRadiologyViewerLogResource()
  const title = humanizeModuleName('LayananRadiologyViewerLog')

  return (
    <WorkflowListPage<RadiologyViewerLog>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananRadiologyViewerLogEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.accession_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
