import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepDysphagiaDetailEndpoint, useBaepDysphagiaDetailResource } from '../api'
import type { BaepDysphagiaDetail } from '../types'

const columns: ColumnDef<BaepDysphagiaDetail, unknown>[] = [
  {
    header: humanizeField('baep_protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/baep-intervention-protocols" id={(row.original as unknown as Record<string, unknown>).baep_protocol_id as number | null} />,
  },
  {
    header: humanizeField('swallowing_test_used'),
    accessorKey: 'swallowing_test_used',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).swallowing_test_used ?? '—'),
  },
  {
    header: humanizeField('severity_level'),
    accessorKey: 'severity_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).severity_level ?? '—'),
  },
  {
    header: humanizeField('aspiration_risk'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).aspiration_risk ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('diet_texture_recommendation'),
    accessorKey: 'diet_texture_recommendation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diet_texture_recommendation ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'swallowing_test_used', label: humanizeField('swallowing_test_used') },
  { key: 'severity_level', label: humanizeField('severity_level'), type: 'select', options: [{"value":"none","label":"None"},{"value":"mild","label":"Mild"},{"value":"moderate","label":"Moderate"},{"value":"severe","label":"Severe"}] },
  { key: 'aspiration_risk', label: humanizeField('aspiration_risk'), type: 'checkbox' },
  { key: 'diet_texture_recommendation', label: humanizeField('diet_texture_recommendation') },
]

const emptyForm = {
  baep_protocol_id: null,
  swallowing_test_used: '',
  severity_level: '',
  aspiration_risk: false,
  diet_texture_recommendation: '',
}

const actions: WorkflowAction<BaepDysphagiaDetail>[] = []

export function BaepDysphagiaDetailListPage() {
  const resource = useBaepDysphagiaDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepDysphagiaDetail')

  return (
    <WorkflowListPage<BaepDysphagiaDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepDysphagiaDetailEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.swallowing_test_used ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
