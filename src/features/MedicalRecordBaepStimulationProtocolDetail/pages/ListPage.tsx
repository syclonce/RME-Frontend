import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordBaepStimulationProtocolDetailEndpoint, useBaepStimulationProtocolDetailResource } from '../api'
import type { BaepStimulationProtocolDetail } from '../types'

const columns: ColumnDef<BaepStimulationProtocolDetail, unknown>[] = [
  {
    header: humanizeField('baep_protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/baep-intervention-protocols" id={(row.original as unknown as Record<string, unknown>).baep_protocol_id as number | null} />,
  },
  {
    header: humanizeField('stimulation_site'),
    accessorKey: 'stimulation_site',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).stimulation_site ?? '—'),
  },
  {
    header: humanizeField('stimulation_frequency_hz'),
    accessorKey: 'stimulation_frequency_hz',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).stimulation_frequency_hz ?? '—'),
  },
  {
    header: humanizeField('stimulation_duration_minutes'),
    accessorKey: 'stimulation_duration_minutes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).stimulation_duration_minutes ?? '—'),
  },
  {
    header: humanizeField('intensity_ma'),
    accessorKey: 'intensity_ma',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).intensity_ma ?? '—'),
  },
  {
    header: humanizeField('number_of_sessions'),
    accessorKey: 'number_of_sessions',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).number_of_sessions ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'baep_protocol_id', label: humanizeField('baep_protocol_id'), type: 'relation', relationEndpoint: '/baep-intervention-protocols', required: true },
  { key: 'stimulation_site', label: humanizeField('stimulation_site'), required: true },
  { key: 'stimulation_frequency_hz', label: humanizeField('stimulation_frequency_hz'), type: 'number' },
  { key: 'stimulation_duration_minutes', label: humanizeField('stimulation_duration_minutes'), type: 'number' },
  { key: 'intensity_ma', label: humanizeField('intensity_ma'), type: 'number' },
  { key: 'number_of_sessions', label: humanizeField('number_of_sessions'), type: 'number' },
]

const emptyForm = {
  baep_protocol_id: null,
  stimulation_site: '',
  stimulation_frequency_hz: '',
  stimulation_duration_minutes: '',
  intensity_ma: '',
  number_of_sessions: '',
}

const actions: WorkflowAction<BaepStimulationProtocolDetail>[] = []

export function BaepStimulationProtocolDetailListPage() {
  const resource = useBaepStimulationProtocolDetailResource()
  const title = humanizeModuleName('MedicalRecordBaepStimulationProtocolDetail')

  return (
    <WorkflowListPage<BaepStimulationProtocolDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordBaepStimulationProtocolDetailEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.stimulation_site ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
