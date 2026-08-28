import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRavenTestExaminationResource } from '../api'
import type { RavenTestExamination } from '../types'

const columns: ColumnDef<RavenTestExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('test_form'),
    accessorKey: 'test_form',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_form ?? '—'),
  },
  {
    header: humanizeField('raw_score'),
    accessorKey: 'raw_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).raw_score ?? '—'),
  },
  {
    header: humanizeField('percentile'),
    accessorKey: 'percentile',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).percentile ?? '—'),
  },
  {
    header: humanizeField('iq_grade'),
    accessorKey: 'iq_grade',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).iq_grade ?? '—'),
  },
  {
    header: humanizeField('examiner_notes'),
    accessorKey: 'examiner_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examiner_notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'test_form', label: humanizeField('test_form'), type: 'select', options: [{"value":"CPM","label":"CPM"},{"value":"SPM","label":"SPM"},{"value":"APM","label":"APM"}] },
  { key: 'raw_score', label: humanizeField('raw_score'), type: 'number' },
  { key: 'percentile', label: humanizeField('percentile'), type: 'number' },
  { key: 'iq_grade', label: humanizeField('iq_grade') },
  { key: 'examiner_notes', label: humanizeField('examiner_notes') },
  { key: 'tested_at', label: humanizeField('tested_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  test_form: '',
  raw_score: '',
  percentile: '',
  iq_grade: '',
  examiner_notes: '',
  tested_at: '',
}

export function RavenTestExaminationListPage() {
  const resource = useRavenTestExaminationResource()
  const title = humanizeModuleName('MedicalRecordRavenTestExamination')

  return (
    <CrudDialogPage<RavenTestExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_form ?? `#${item.id}`}
      resource={resource}
    />
  )
}
