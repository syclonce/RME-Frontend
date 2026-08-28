import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useModifiedBarthelIndexAssessmentResource } from '../api'
import type { ModifiedBarthelIndexAssessment } from '../types'

const columns: ColumnDef<ModifiedBarthelIndexAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('feeding'),
    accessorKey: 'feeding',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).feeding ?? '—'),
  },
  {
    header: humanizeField('bathing'),
    accessorKey: 'bathing',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bathing ?? '—'),
  },
  {
    header: humanizeField('personal_hygiene'),
    accessorKey: 'personal_hygiene',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).personal_hygiene ?? '—'),
  },
  {
    header: humanizeField('dressing'),
    accessorKey: 'dressing',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dressing ?? '—'),
  },
  {
    header: humanizeField('bowel_control'),
    accessorKey: 'bowel_control',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bowel_control ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true, section: 'Detail' },
  { key: 'feeding', label: humanizeField('feeding'), type: 'number', section: 'Detail' },
  { key: 'bathing', label: humanizeField('bathing'), type: 'number', section: 'Detail' },
  { key: 'personal_hygiene', label: humanizeField('personal_hygiene'), type: 'number', section: 'Detail' },
  { key: 'dressing', label: humanizeField('dressing'), type: 'number', section: 'Detail' },
  { key: 'bowel_control', label: humanizeField('bowel_control'), type: 'number', section: 'Detail' },
  { key: 'bladder_control', label: humanizeField('bladder_control'), type: 'number', section: 'Detail' },
  { key: 'toilet_use', label: humanizeField('toilet_use'), type: 'number', section: 'Detail Tambahan' },
  { key: 'chair_bed_transfer', label: humanizeField('chair_bed_transfer'), type: 'number', section: 'Detail Tambahan' },
  { key: 'ambulation', label: humanizeField('ambulation'), type: 'number', section: 'Detail Tambahan' },
  { key: 'stairs', label: humanizeField('stairs'), type: 'number', section: 'Detail Tambahan' },
  { key: 'total_score', label: humanizeField('total_score'), type: 'number', section: 'Detail Tambahan' },
  { key: 'interpretation', label: humanizeField('interpretation'), section: 'Detail Tambahan' },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: null,
  feeding: '',
  bathing: '',
  personal_hygiene: '',
  dressing: '',
  bowel_control: '',
  bladder_control: '',
  toilet_use: '',
  chair_bed_transfer: '',
  ambulation: '',
  stairs: '',
  total_score: '',
  interpretation: '',
  assessed_at: '',
}

export function ModifiedBarthelIndexAssessmentListPage() {
  const resource = useModifiedBarthelIndexAssessmentResource()
  const title = humanizeModuleName('MedicalRecordModifiedBarthelIndexAssessment')

  return (
    <CrudDialogPage<ModifiedBarthelIndexAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.interpretation ?? `#${item.id}`}
      resource={resource}
    />
  )
}
