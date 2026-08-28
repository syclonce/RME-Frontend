import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePharynxExaminationResource } from '../api'
import type { PharynxExamination } from '../types'

const columns: ColumnDef<PharynxExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('mucosa_color'),
    accessorKey: 'mucosa_color',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mucosa_color ?? '—'),
  },
  {
    header: humanizeField('exudate'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).exudate ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('post_nasal_drip'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).post_nasal_drip ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('posterior_wall_condition'),
    accessorKey: 'posterior_wall_condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).posterior_wall_condition ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'mucosa_color', label: humanizeField('mucosa_color') },
  { key: 'exudate', label: humanizeField('exudate'), type: 'checkbox' },
  { key: 'post_nasal_drip', label: humanizeField('post_nasal_drip'), type: 'checkbox' },
  { key: 'posterior_wall_condition', label: humanizeField('posterior_wall_condition') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  mucosa_color: '',
  exudate: false,
  post_nasal_drip: false,
  posterior_wall_condition: '',
  notes: '',
  examined_at: '',
}

export function PharynxExaminationListPage() {
  const resource = usePharynxExaminationResource()
  const title = humanizeModuleName('MedicalRecordPharynxExamination')

  return (
    <CrudDialogPage<PharynxExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.mucosa_color ?? `#${item.id}`}
      resource={resource}
    />
  )
}
