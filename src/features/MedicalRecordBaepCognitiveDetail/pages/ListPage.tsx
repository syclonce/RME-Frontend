import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepCognitiveDetailEndpoint, useBaepCognitiveDetailResource } from '../api'
import type { BaepCognitiveDetail } from '../types'

const columns: ColumnDef<BaepCognitiveDetail, unknown>[] = [
  {
    header: humanizeField('baep_protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/baep-intervention-protocols" id={(row.original as unknown as Record<string, unknown>).baep_protocol_id as number | null} />,
  },
  {
    header: humanizeField('scale_used'),
    accessorKey: 'scale_used',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scale_used ?? '—'),
  },
  {
    header: humanizeField('score'),
    accessorKey: 'score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).score ?? '—'),
  },
  {
    header: humanizeField('domains_affected'),
    accessorKey: 'domains_affected',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).domains_affected ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'scale_used', label: humanizeField('scale_used') },
  { key: 'score', label: humanizeField('score'), type: 'number', required: true },
  { key: 'domains_affected', label: humanizeField('domains_affected') },
]

const emptyForm = {
  baep_protocol_id: null,
  scale_used: '',
  score: '',
  domains_affected: '',
}

const actions: WorkflowAction<BaepCognitiveDetail>[] = []

export function BaepCognitiveDetailListPage() {
  const resource = useBaepCognitiveDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepCognitiveDetail')

  return (
    <WorkflowListPage<BaepCognitiveDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepCognitiveDetailEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.scale_used ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
