import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTonsilExaminationResource } from '../api'
import type { TonsilExamination } from '../types'

const columns: ColumnDef<TonsilExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('side'),
    accessorKey: 'side',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).side ?? '—'),
  },
  {
    header: humanizeField('grade'),
    accessorKey: 'grade',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).grade ?? '—'),
  },
  {
    header: humanizeField('color'),
    accessorKey: 'color',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).color ?? '—'),
  },
  {
    header: humanizeField('exudate'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).exudate ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'side', label: humanizeField('side'), type: 'select', options: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"bilateral","label":"Bilateral"}] },
  { key: 'grade', label: humanizeField('grade'), type: 'number' },
  { key: 'color', label: humanizeField('color') },
  { key: 'exudate', label: humanizeField('exudate'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  side: '',
  grade: '',
  color: '',
  exudate: false,
  findings: '',
  examined_at: '',
}

export function TonsilExaminationListPage() {
  const resource = useTonsilExaminationResource()
  const title = humanizeModuleName('MedicalRecordTonsilExamination')

  return (
    <CrudDialogPage<TonsilExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.side ?? `#${item.id}`}
      resource={resource}
    />
  )
}
