import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepSensoryDetailEndpoint, useBaepSensoryDetailResource } from '../api'
import type { BaepSensoryDetail } from '../types'

const columns: ColumnDef<BaepSensoryDetail, unknown>[] = [
  {
    header: humanizeField('baep_protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/baep-intervention-protocols" id={(row.original as unknown as Record<string, unknown>).baep_protocol_id as number | null} />,
  },
  {
    header: humanizeField('sensory_modality'),
    accessorKey: 'sensory_modality',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensory_modality ?? '—'),
  },
  {
    header: humanizeField('sensory_score'),
    accessorKey: 'sensory_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensory_score ?? '—'),
  },
  {
    header: humanizeField('affected_region'),
    accessorKey: 'affected_region',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).affected_region ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'sensory_modality', label: humanizeField('sensory_modality'), type: 'select', required: true, options: [{"value":"touch","label":"Touch"},{"value":"pain","label":"Pain"},{"value":"vibration","label":"Vibration"},{"value":"proprioception","label":"Proprioception"}] },
  { key: 'sensory_score', label: humanizeField('sensory_score'), type: 'number' },
  { key: 'affected_region', label: humanizeField('affected_region') },
]

const emptyForm = {
  baep_protocol_id: null,
  sensory_modality: '',
  sensory_score: '',
  affected_region: '',
}

const actions: WorkflowAction<BaepSensoryDetail>[] = []

export function BaepSensoryDetailListPage() {
  const resource = useBaepSensoryDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepSensoryDetail')

  return (
    <WorkflowListPage<BaepSensoryDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepSensoryDetailEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.sensory_modality ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
