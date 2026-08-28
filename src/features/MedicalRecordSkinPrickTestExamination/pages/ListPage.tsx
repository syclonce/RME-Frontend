import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSkinPrickTestExaminationResource } from '../api'
import type { SkinPrickTestExamination } from '../types'

const columns: ColumnDef<SkinPrickTestExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('allergen'),
    accessorKey: 'allergen',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).allergen ?? '—'),
  },
  {
    header: humanizeField('wheal_size_mm'),
    accessorKey: 'wheal_size_mm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).wheal_size_mm ?? '—'),
  },
  {
    header: humanizeField('flare_size_mm'),
    accessorKey: 'flare_size_mm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).flare_size_mm ?? '—'),
  },
  {
    header: humanizeField('result'),
    accessorKey: 'result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result ?? '—'),
  },
  {
    header: humanizeField('reaction_onset_minutes'),
    accessorKey: 'reaction_onset_minutes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reaction_onset_minutes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'allergen', label: humanizeField('allergen'), required: true },
  { key: 'wheal_size_mm', label: humanizeField('wheal_size_mm'), type: 'number' },
  { key: 'flare_size_mm', label: humanizeField('flare_size_mm'), type: 'number' },
  { key: 'result', label: humanizeField('result'), type: 'select', options: [{"value":"positive","label":"Positive"},{"value":"negative","label":"Negative"},{"value":"equivocal","label":"Equivocal"}] },
  { key: 'reaction_onset_minutes', label: humanizeField('reaction_onset_minutes'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'tested_at', label: humanizeField('tested_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  allergen: '',
  wheal_size_mm: '',
  flare_size_mm: '',
  result: '',
  reaction_onset_minutes: '',
  notes: '',
  tested_at: '',
}

export function SkinPrickTestExaminationListPage() {
  const resource = useSkinPrickTestExaminationResource()
  const title = humanizeModuleName('MedicalRecordSkinPrickTestExamination')

  return (
    <CrudDialogPage<SkinPrickTestExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.allergen ?? `#${item.id}`}
      resource={resource}
    />
  )
}
