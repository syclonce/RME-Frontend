import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPathologyAnatomyResultEndpoint, usePathologyAnatomyResultResource } from '../api'
import type { PathologyAnatomyResult } from '../types'

const columns: ColumnDef<PathologyAnatomyResult, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('specimen_description'),
    accessorKey: 'specimen_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).specimen_description ?? '—'),
  },
  {
    header: humanizeField('macroscopic_finding'),
    accessorKey: 'macroscopic_finding',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).macroscopic_finding ?? '—'),
  },
  {
    header: humanizeField('microscopic_finding'),
    accessorKey: 'microscopic_finding',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).microscopic_finding ?? '—'),
  },
  {
    header: humanizeField('diagnosis'),
    accessorKey: 'diagnosis',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'specimen_description', label: humanizeField('specimen_description'), required: true },
  { key: 'macroscopic_finding', label: humanizeField('macroscopic_finding') },
  { key: 'microscopic_finding', label: humanizeField('microscopic_finding') },
  { key: 'diagnosis', label: humanizeField('diagnosis') },
  { key: 'examined_by', label: humanizeField('examined_by'), type: 'number' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status'), required: true },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  specimen_description: '',
  macroscopic_finding: '',
  microscopic_finding: '',
  diagnosis: '',
  examined_by: '',
  examined_at: '',
  status: '',
}

const actions: WorkflowAction<PathologyAnatomyResult>[] = []

export function PathologyAnatomyResultListPage() {
  const resource = usePathologyAnatomyResultResource()
  const title = humanizeModuleName('LayananPathologyAnatomyResult')

  return (
    <WorkflowListPage<PathologyAnatomyResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPathologyAnatomyResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.specimen_description ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
