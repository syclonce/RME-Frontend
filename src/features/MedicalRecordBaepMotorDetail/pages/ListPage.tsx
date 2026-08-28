import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepMotorDetailEndpoint, useBaepMotorDetailResource } from '../api'
import type { BaepMotorDetail } from '../types'

const columns: ColumnDef<BaepMotorDetail, unknown>[] = [
  {
    header: humanizeField('baep_protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/baep-intervention-protocols" id={(row.original as unknown as Record<string, unknown>).baep_protocol_id as number | null} />,
  },
  {
    header: humanizeField('muscle_strength_score'),
    accessorKey: 'muscle_strength_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).muscle_strength_score ?? '—'),
  },
  {
    header: humanizeField('spasticity_level'),
    accessorKey: 'spasticity_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).spasticity_level ?? '—'),
  },
  {
    header: humanizeField('gait_status'),
    accessorKey: 'gait_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gait_status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'muscle_strength_score', label: humanizeField('muscle_strength_score'), type: 'number' },
  { key: 'spasticity_level', label: humanizeField('spasticity_level'), type: 'select', options: [{"value":"0","label":"0"},{"value":"1","label":"1"},{"value":"1+","label":"1+"},{"value":"2","label":"2"},{"value":"3","label":"3"},{"value":"4","label":"4"}] },
  { key: 'gait_status', label: humanizeField('gait_status') },
]

const emptyForm = {
  baep_protocol_id: null,
  muscle_strength_score: '',
  spasticity_level: '',
  gait_status: '',
}

const actions: WorkflowAction<BaepMotorDetail>[] = []

export function BaepMotorDetailListPage() {
  const resource = useBaepMotorDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepMotorDetail')

  return (
    <WorkflowListPage<BaepMotorDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepMotorDetailEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.spasticity_level ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
