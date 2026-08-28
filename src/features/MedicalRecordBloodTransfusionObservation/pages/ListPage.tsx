import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBloodTransfusionObservationResource } from '../api'
import type { BloodTransfusionObservation } from '../types'

const columns: ColumnDef<BloodTransfusionObservation, unknown>[] = [
  {
    header: humanizeField('blood_transfusion_id'),
    cell: ({ row }) => <RelationLabel endpoint="/blood-transfusions" id={(row.original as unknown as Record<string, unknown>).blood_transfusion_id as number | null} />,
  },
  {
    header: humanizeField('observed_at'),
    accessorKey: 'observed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).observed_at ?? '—'),
  },
  {
    header: humanizeField('temperature_c'),
    accessorKey: 'temperature_c',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).temperature_c ?? '—'),
  },
  {
    header: humanizeField('pulse_rate'),
    accessorKey: 'pulse_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pulse_rate ?? '—'),
  },
  {
    header: humanizeField('blood_pressure'),
    accessorKey: 'blood_pressure',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_pressure ?? '—'),
  },
  {
    header: humanizeField('reaction_signs'),
    accessorKey: 'reaction_signs',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reaction_signs ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'blood_transfusion_id', label: humanizeField('blood_transfusion_id'), type: 'relation', relationEndpoint: '/blood-transfusions', required: true },
  { key: 'observed_at', label: humanizeField('observed_at'), type: 'date', required: true },
  { key: 'temperature_c', label: humanizeField('temperature_c'), type: 'number' },
  { key: 'pulse_rate', label: humanizeField('pulse_rate'), type: 'number' },
  { key: 'blood_pressure', label: humanizeField('blood_pressure') },
  { key: 'reaction_signs', label: humanizeField('reaction_signs') },
  { key: 'volume_transfused_ml', label: humanizeField('volume_transfused_ml'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  blood_transfusion_id: null,
  observed_at: '',
  temperature_c: '',
  pulse_rate: '',
  blood_pressure: '',
  reaction_signs: '',
  volume_transfused_ml: '',
  notes: '',
}

export function BloodTransfusionObservationListPage() {
  const resource = useBloodTransfusionObservationResource()
  const title = humanizeModuleName('MedicalRecordBloodTransfusionObservation')

  return (
    <CrudDialogPage<BloodTransfusionObservation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.blood_pressure ?? `#${item.id}`}
      resource={resource}
    />
  )
}
