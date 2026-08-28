import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEkgExaminationResource } from '../api'
import type { EkgExamination } from '../types'

const columns: ColumnDef<EkgExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('heart_rate_bpm'),
    accessorKey: 'heart_rate_bpm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).heart_rate_bpm ?? '—'),
  },
  {
    header: humanizeField('rhythm'),
    accessorKey: 'rhythm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rhythm ?? '—'),
  },
  {
    header: humanizeField('p_wave'),
    accessorKey: 'p_wave',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).p_wave ?? '—'),
  },
  {
    header: humanizeField('pr_interval_ms'),
    accessorKey: 'pr_interval_ms',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pr_interval_ms ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true, section: 'Detail' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true, section: 'Detail' },
  { key: 'heart_rate_bpm', label: humanizeField('heart_rate_bpm'), type: 'number', section: 'Detail' },
  { key: 'rhythm', label: humanizeField('rhythm'), section: 'Detail' },
  { key: 'p_wave', label: humanizeField('p_wave'), section: 'Detail' },
  { key: 'pr_interval_ms', label: humanizeField('pr_interval_ms'), type: 'number', section: 'Detail' },
  { key: 'qrs_duration_ms', label: humanizeField('qrs_duration_ms'), type: 'number', section: 'Detail Tambahan' },
  { key: 'st_segment', label: humanizeField('st_segment'), section: 'Detail Tambahan' },
  { key: 't_wave', label: humanizeField('t_wave'), section: 'Detail Tambahan' },
  { key: 'conclusion', label: humanizeField('conclusion'), section: 'Detail Tambahan' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  heart_rate_bpm: '',
  rhythm: '',
  p_wave: '',
  pr_interval_ms: '',
  qrs_duration_ms: '',
  st_segment: '',
  t_wave: '',
  conclusion: '',
  examined_at: '',
}

export function EkgExaminationListPage() {
  const resource = useEkgExaminationResource()
  const title = humanizeModuleName('MedicalRecordEkgExamination')

  return (
    <CrudDialogPage<EkgExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.rhythm ?? `#${item.id}`}
      resource={resource}
    />
  )
}
