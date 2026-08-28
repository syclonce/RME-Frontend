import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useHairExaminationResource } from '../api'
import type { HairExamination } from '../types'

const columns: ColumnDef<HairExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('distribution'),
    accessorKey: 'distribution',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).distribution ?? '—'),
  },
  {
    header: humanizeField('texture'),
    accessorKey: 'texture',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).texture ?? '—'),
  },
  {
    header: humanizeField('color'),
    accessorKey: 'color',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).color ?? '—'),
  },
  {
    header: humanizeField('hair_loss'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).hair_loss ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('scalp_condition'),
    accessorKey: 'scalp_condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scalp_condition ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'distribution', label: humanizeField('distribution') },
  { key: 'texture', label: humanizeField('texture') },
  { key: 'color', label: humanizeField('color') },
  { key: 'hair_loss', label: humanizeField('hair_loss'), type: 'checkbox' },
  { key: 'scalp_condition', label: humanizeField('scalp_condition') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  distribution: '',
  texture: '',
  color: '',
  hair_loss: false,
  scalp_condition: '',
  findings: '',
  examined_at: '',
}

export function HairExaminationListPage() {
  const resource = useHairExaminationResource()
  const title = humanizeModuleName('MedicalRecordHairExamination')

  return (
    <CrudDialogPage<HairExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.distribution ?? `#${item.id}`}
      resource={resource}
    />
  )
}
