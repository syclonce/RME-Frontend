import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePalateExaminationResource } from '../api'
import type { PalateExamination } from '../types'

const columns: ColumnDef<PalateExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('hard_palate'),
    accessorKey: 'hard_palate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).hard_palate ?? '—'),
  },
  {
    header: humanizeField('soft_palate'),
    accessorKey: 'soft_palate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).soft_palate ?? '—'),
  },
  {
    header: humanizeField('uvula_position'),
    accessorKey: 'uvula_position',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).uvula_position ?? '—'),
  },
  {
    header: humanizeField('cleft_palate'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).cleft_palate ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'hard_palate', label: humanizeField('hard_palate') },
  { key: 'soft_palate', label: humanizeField('soft_palate') },
  { key: 'uvula_position', label: humanizeField('uvula_position') },
  { key: 'cleft_palate', label: humanizeField('cleft_palate'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  hard_palate: '',
  soft_palate: '',
  uvula_position: '',
  cleft_palate: false,
  findings: '',
  examined_at: '',
}

export function PalateExaminationListPage() {
  const resource = usePalateExaminationResource()
  const title = humanizeModuleName('MedicalRecordPalateExamination')

  return (
    <CrudDialogPage<PalateExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.hard_palate ?? `#${item.id}`}
      resource={resource}
    />
  )
}
