import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTranscranialDopplerWindowResource } from '../api'
import type { TranscranialDopplerWindow } from '../types'

const columns: ColumnDef<TranscranialDopplerWindow, unknown>[] = [
  {
    header: humanizeField('transcranial_doppler_examination_id'),
    cell: ({ row }) => <RelationLabel endpoint="/tcd-examinations" id={(row.original as unknown as Record<string, unknown>).transcranial_doppler_examination_id as number | null} />,
  },
  {
    header: humanizeField('window_site'),
    accessorKey: 'window_site',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).window_site ?? '—'),
  },
  {
    header: humanizeField('signal_quality'),
    accessorKey: 'signal_quality',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).signal_quality ?? '—'),
  },
  {
    header: humanizeField('depth_mm'),
    accessorKey: 'depth_mm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).depth_mm ?? '—'),
  },
  {
    header: humanizeField('velocity_cm_s'),
    accessorKey: 'velocity_cm_s',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).velocity_cm_s ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'transcranial_doppler_examination_id', label: humanizeField('transcranial_doppler_examination_id'), type: 'relation', relationEndpoint: '/tcd-examinations', required: true },
  { key: 'window_site', label: humanizeField('window_site'), type: 'select', required: true, options: [{"value":"temporal","label":"Temporal"},{"value":"orbital","label":"Orbital"},{"value":"suboccipital","label":"Suboccipital"},{"value":"submandibular","label":"Submandibular"}] },
  { key: 'signal_quality', label: humanizeField('signal_quality'), type: 'select', options: [{"value":"good","label":"Good"},{"value":"fair","label":"Fair"},{"value":"poor","label":"Poor"},{"value":"absent","label":"Absent"}] },
  { key: 'depth_mm', label: humanizeField('depth_mm'), type: 'number' },
  { key: 'velocity_cm_s', label: humanizeField('velocity_cm_s'), type: 'number' },
]

const emptyForm = {
  transcranial_doppler_examination_id: null,
  window_site: '',
  signal_quality: '',
  depth_mm: '',
  velocity_cm_s: '',
}

export function TranscranialDopplerWindowListPage() {
  const resource = useTranscranialDopplerWindowResource()
  const title = humanizeModuleName('MedicalRecordTranscranialDopplerWindow')

  return (
    <CrudDialogPage<TranscranialDopplerWindow>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.window_site ?? `#${item.id}`}
      resource={resource}
    />
  )
}
