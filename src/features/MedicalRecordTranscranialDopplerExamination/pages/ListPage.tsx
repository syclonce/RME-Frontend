import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTranscranialDopplerExaminationResource } from '../api'
import type { TranscranialDopplerExamination } from '../types'

const columns: ColumnDef<TranscranialDopplerExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('indication'),
    accessorKey: 'indication',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indication ?? '—'),
  },
  {
    header: humanizeField('vessel'),
    accessorKey: 'vessel',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).vessel ?? '—'),
  },
  {
    header: humanizeField('mean_velocity_cm_s'),
    accessorKey: 'mean_velocity_cm_s',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mean_velocity_cm_s ?? '—'),
  },
  {
    header: humanizeField('pulsatility_index'),
    accessorKey: 'pulsatility_index',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pulsatility_index ?? '—'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'indication', label: humanizeField('indication') },
  { key: 'vessel', label: humanizeField('vessel'), type: 'select', options: [{"value":"MCA","label":"MCA"},{"value":"ACA","label":"ACA"},{"value":"PCA","label":"PCA"},{"value":"ICA","label":"ICA"},{"value":"VA","label":"VA"},{"value":"BA","label":"BA"}] },
  { key: 'mean_velocity_cm_s', label: humanizeField('mean_velocity_cm_s'), type: 'number' },
  { key: 'pulsatility_index', label: humanizeField('pulsatility_index'), type: 'number' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  indication: '',
  vessel: '',
  mean_velocity_cm_s: '',
  pulsatility_index: '',
  findings: '',
  examined_at: '',
}

export function TranscranialDopplerExaminationListPage() {
  const resource = useTranscranialDopplerExaminationResource()
  const title = humanizeModuleName('MedicalRecordTranscranialDopplerExamination')

  return (
    <CrudDialogPage<TranscranialDopplerExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.indication ?? `#${item.id}`}
      resource={resource}
    />
  )
}
