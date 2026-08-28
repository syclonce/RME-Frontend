import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useHeadExaminationResource } from '../api'
import type { HeadExamination } from '../types'

const columns: ColumnDef<HeadExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('skull_shape'),
    accessorKey: 'skull_shape',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).skull_shape ?? '—'),
  },
  {
    header: humanizeField('hair_distribution'),
    accessorKey: 'hair_distribution',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).hair_distribution ?? '—'),
  },
  {
    header: humanizeField('facial_symmetry'),
    accessorKey: 'facial_symmetry',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).facial_symmetry ?? '—'),
  },
  {
    header: humanizeField('tenderness'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).tenderness ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'skull_shape', label: humanizeField('skull_shape') },
  { key: 'hair_distribution', label: humanizeField('hair_distribution') },
  { key: 'facial_symmetry', label: humanizeField('facial_symmetry') },
  { key: 'tenderness', label: humanizeField('tenderness'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  skull_shape: '',
  hair_distribution: '',
  facial_symmetry: '',
  tenderness: false,
  findings: '',
  examined_at: '',
}

export function HeadExaminationListPage() {
  const resource = useHeadExaminationResource()
  const title = humanizeModuleName('MedicalRecordHeadExamination')

  return (
    <CrudDialogPage<HeadExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.skull_shape ?? `#${item.id}`}
      resource={resource}
    />
  )
}
