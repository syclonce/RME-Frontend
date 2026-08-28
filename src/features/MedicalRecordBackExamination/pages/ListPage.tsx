import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBackExaminationResource } from '../api'
import type { BackExamination } from '../types'

const columns: ColumnDef<BackExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('spine_alignment'),
    accessorKey: 'spine_alignment',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).spine_alignment ?? '—'),
  },
  {
    header: humanizeField('scoliosis'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).scoliosis ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('kyphosis'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).kyphosis ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('lordosis'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).lordosis ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('tenderness'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).tenderness ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'spine_alignment', label: humanizeField('spine_alignment') },
  { key: 'scoliosis', label: humanizeField('scoliosis'), type: 'checkbox' },
  { key: 'kyphosis', label: humanizeField('kyphosis'), type: 'checkbox' },
  { key: 'lordosis', label: humanizeField('lordosis'), type: 'checkbox' },
  { key: 'tenderness', label: humanizeField('tenderness'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  spine_alignment: '',
  scoliosis: false,
  kyphosis: false,
  lordosis: false,
  tenderness: false,
  findings: '',
  examined_at: '',
}

export function BackExaminationListPage() {
  const resource = useBackExaminationResource()
  const title = humanizeModuleName('MedicalRecordBackExamination')

  return (
    <CrudDialogPage<BackExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.spine_alignment ?? `#${item.id}`}
      resource={resource}
    />
  )
}
