import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useThroatExaminationResource } from '../api'
import type { ThroatExamination } from '../types'

const columns: ColumnDef<ThroatExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('pharynx'),
    accessorKey: 'pharynx',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pharynx ?? '—'),
  },
  {
    header: humanizeField('uvula'),
    accessorKey: 'uvula',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).uvula ?? '—'),
  },
  {
    header: humanizeField('mucosa'),
    accessorKey: 'mucosa',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mucosa ?? '—'),
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
  { key: 'pharynx', label: humanizeField('pharynx') },
  { key: 'uvula', label: humanizeField('uvula') },
  { key: 'mucosa', label: humanizeField('mucosa') },
  { key: 'exudate', label: humanizeField('exudate'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  pharynx: '',
  uvula: '',
  mucosa: '',
  exudate: false,
  findings: '',
  examined_at: '',
}

export function ThroatExaminationListPage() {
  const resource = useThroatExaminationResource()
  const title = humanizeModuleName('MedicalRecordThroatExamination')

  return (
    <CrudDialogPage<ThroatExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.pharynx ?? `#${item.id}`}
      resource={resource}
    />
  )
}
