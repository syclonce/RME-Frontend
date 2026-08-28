import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepInsomniaDetailEndpoint, useBaepInsomniaDetailResource } from '../api'
import type { BaepInsomniaDetail } from '../types'

const columns: ColumnDef<BaepInsomniaDetail, unknown>[] = [
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
    header: humanizeField('sleep_onset_latency_minutes'),
    accessorKey: 'sleep_onset_latency_minutes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sleep_onset_latency_minutes ?? '—'),
  },
  {
    header: humanizeField('sleep_efficiency_percent'),
    accessorKey: 'sleep_efficiency_percent',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sleep_efficiency_percent ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'scale_used', label: humanizeField('scale_used') },
  { key: 'score', label: humanizeField('score'), type: 'number', required: true },
  { key: 'sleep_onset_latency_minutes', label: humanizeField('sleep_onset_latency_minutes'), type: 'number' },
  { key: 'sleep_efficiency_percent', label: humanizeField('sleep_efficiency_percent'), type: 'number' },
]

const emptyForm = {
  baep_protocol_id: null,
  scale_used: '',
  score: '',
  sleep_onset_latency_minutes: '',
  sleep_efficiency_percent: '',
}

const actions: WorkflowAction<BaepInsomniaDetail>[] = []

export function BaepInsomniaDetailListPage() {
  const resource = useBaepInsomniaDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepInsomniaDetail')

  return (
    <WorkflowListPage<BaepInsomniaDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepInsomniaDetailEndpoint}
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
