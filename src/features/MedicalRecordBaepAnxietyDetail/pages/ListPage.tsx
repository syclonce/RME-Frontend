import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepAnxietyDetailEndpoint, useBaepAnxietyDetailResource } from '../api'
import type { BaepAnxietyDetail } from '../types'

const columns: ColumnDef<BaepAnxietyDetail, unknown>[] = [
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
    header: humanizeField('severity_level'),
    accessorKey: 'severity_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).severity_level ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'scale_used', label: humanizeField('scale_used') },
  { key: 'score', label: humanizeField('score'), type: 'number', required: true },
  { key: 'severity_level', label: humanizeField('severity_level'), type: 'select', options: [{"value":"mild","label":"Mild"},{"value":"moderate","label":"Moderate"},{"value":"severe","label":"Severe"}] },
]

const emptyForm = {
  baep_protocol_id: null,
  scale_used: '',
  score: '',
  severity_level: '',
}

const actions: WorkflowAction<BaepAnxietyDetail>[] = []

export function BaepAnxietyDetailListPage() {
  const resource = useBaepAnxietyDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepAnxietyDetail')

  return (
    <WorkflowListPage<BaepAnxietyDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepAnxietyDetailEndpoint}
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
