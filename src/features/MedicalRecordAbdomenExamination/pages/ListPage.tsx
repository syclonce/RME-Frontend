import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAbdomenExaminationResource } from '../api'
import type { AbdomenExamination } from '../types'

const columns: ColumnDef<AbdomenExamination, unknown>[] = [
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
    header: humanizeField('auscultation_bowel_sounds'),
    accessorKey: 'auscultation_bowel_sounds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).auscultation_bowel_sounds ?? '—'),
  },
  {
    header: humanizeField('palpation'),
    accessorKey: 'palpation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).palpation ?? '—'),
  },
  {
    header: humanizeField('percussion'),
    accessorKey: 'percussion',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).percussion ?? '—'),
  },
  {
    header: humanizeField('tenderness'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).tenderness ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'inspection', label: humanizeField('inspection') },
  { key: 'auscultation_bowel_sounds', label: humanizeField('auscultation_bowel_sounds') },
  { key: 'palpation', label: humanizeField('palpation') },
  { key: 'percussion', label: humanizeField('percussion') },
  { key: 'tenderness', label: humanizeField('tenderness'), type: 'checkbox' },
  { key: 'distension', label: humanizeField('distension'), type: 'checkbox' },
  { key: 'liver_span_cm', label: humanizeField('liver_span_cm'), type: 'number' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  inspection: '',
  auscultation_bowel_sounds: '',
  palpation: '',
  percussion: '',
  tenderness: false,
  distension: false,
  liver_span_cm: '',
  findings: '',
  examined_at: '',
}

export function AbdomenExaminationListPage() {
  const resource = useAbdomenExaminationResource()
  const title = humanizeModuleName('MedicalRecordAbdomenExamination')

  return (
    <CrudDialogPage<AbdomenExamination>
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
