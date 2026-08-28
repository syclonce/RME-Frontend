import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPathologyMolecularResultEndpoint, usePathologyMolecularResultResource } from '../api'
import type { PathologyMolecularResult } from '../types'

const columns: ColumnDef<PathologyMolecularResult, unknown>[] = [
  {
    header: humanizeField('pathology_anatomy_result_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pathology-anatomy-results" id={(row.original as unknown as Record<string, unknown>).pathology_anatomy_result_id as number | null} />,
  },
  {
    header: humanizeField('test_name'),
    accessorKey: 'test_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_name ?? '—'),
  },
  {
    header: humanizeField('result'),
    accessorKey: 'result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'pathology_anatomy_result_id', label: humanizeField('pathology_anatomy_result_id'), type: 'relation', relationEndpoint: '/pathology-anatomy-results', required: true },
  { key: 'test_name', label: humanizeField('test_name'), required: true },
  { key: 'result', label: humanizeField('result'), required: true },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  pathology_anatomy_result_id: null,
  test_name: '',
  result: '',
  examined_at: '',
}

const actions: WorkflowAction<PathologyMolecularResult>[] = []

export function PathologyMolecularResultListPage() {
  const resource = usePathologyMolecularResultResource()
  const title = humanizeModuleName('LayananPathologyMolecularResult')

  return (
    <WorkflowListPage<PathologyMolecularResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPathologyMolecularResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
