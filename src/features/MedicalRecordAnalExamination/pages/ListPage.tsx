import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAnalExaminationResource } from '../api'
import type { AnalExamination } from '../types'

const columns: ColumnDef<AnalExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('inspection'),
    accessorKey: 'inspection',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).inspection ?? '—'),
  },
  {
    header: humanizeField('palpation'),
    accessorKey: 'palpation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).palpation ?? '—'),
  },
  {
    header: humanizeField('sphincter_tone'),
    accessorKey: 'sphincter_tone',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sphincter_tone ?? '—'),
  },
  {
    header: humanizeField('rectal_toucher_findings'),
    accessorKey: 'rectal_toucher_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rectal_toucher_findings ?? '—'),
  },
  {
    header: humanizeField('ampulla_recti'),
    accessorKey: 'ampulla_recti',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ampulla_recti ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'inspection', label: humanizeField('inspection') },
  { key: 'palpation', label: humanizeField('palpation') },
  { key: 'sphincter_tone', label: humanizeField('sphincter_tone') },
  { key: 'rectal_toucher_findings', label: humanizeField('rectal_toucher_findings') },
  { key: 'ampulla_recti', label: humanizeField('ampulla_recti') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  inspection: '',
  palpation: '',
  sphincter_tone: '',
  rectal_toucher_findings: '',
  ampulla_recti: '',
  findings: '',
  examined_at: '',
}

export function AnalExaminationListPage() {
  const resource = useAnalExaminationResource()
  const title = humanizeModuleName('MedicalRecordAnalExamination')

  return (
    <CrudDialogPage<AnalExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.inspection ?? `#${item.id}`}
      resource={resource}
    />
  )
}
