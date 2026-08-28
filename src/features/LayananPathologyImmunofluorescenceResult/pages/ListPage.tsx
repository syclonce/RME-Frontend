import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPathologyImmunofluorescenceResultEndpoint, usePathologyImmunofluorescenceResultResource } from '../api'
import type { PathologyImmunofluorescenceResult } from '../types'

const columns: ColumnDef<PathologyImmunofluorescenceResult, unknown>[] = [
  {
    header: humanizeField('pathology_anatomy_result_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pathology-anatomy-results" id={(row.original as unknown as Record<string, unknown>).pathology_anatomy_result_id as number | null} />,
  },
  {
    header: humanizeField('marker'),
    accessorKey: 'marker',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).marker ?? '—'),
  },
  {
    header: humanizeField('result'),
    accessorKey: 'result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result ?? '—'),
  },
  {
    header: humanizeField('intensity'),
    accessorKey: 'intensity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).intensity ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'pathology_anatomy_result_id', label: humanizeField('pathology_anatomy_result_id'), type: 'relation', relationEndpoint: '/pathology-anatomy-results', required: true },
  { key: 'marker', label: humanizeField('marker'), required: true },
  { key: 'result', label: humanizeField('result'), required: true },
  { key: 'intensity', label: humanizeField('intensity') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  pathology_anatomy_result_id: null,
  marker: '',
  result: '',
  intensity: '',
  examined_at: '',
}

const actions: WorkflowAction<PathologyImmunofluorescenceResult>[] = []

export function PathologyImmunofluorescenceResultListPage() {
  const resource = usePathologyImmunofluorescenceResultResource()
  const title = humanizeModuleName('LayananPathologyImmunofluorescenceResult')

  return (
    <WorkflowListPage<PathologyImmunofluorescenceResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPathologyImmunofluorescenceResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.marker ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
