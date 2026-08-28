import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLowerLegExaminationResource } from '../api'
import type { LowerLegExamination } from '../types'

const columns: ColumnDef<LowerLegExamination, unknown>[] = [
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
    header: humanizeField('muscle_strength'),
    accessorKey: 'muscle_strength',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).muscle_strength ?? '—'),
  },
  {
    header: humanizeField('edema'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).edema ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('pulses'),
    accessorKey: 'pulses',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pulses ?? '—'),
  },
  {
    header: humanizeField('skin_condition'),
    accessorKey: 'skin_condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).skin_condition ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'side', label: humanizeField('side'), type: 'select', options: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"bilateral","label":"Bilateral"}] },
  { key: 'muscle_strength', label: humanizeField('muscle_strength') },
  { key: 'edema', label: humanizeField('edema'), type: 'checkbox' },
  { key: 'pulses', label: humanizeField('pulses') },
  { key: 'skin_condition', label: humanizeField('skin_condition') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  side: '',
  muscle_strength: '',
  edema: false,
  pulses: '',
  skin_condition: '',
  findings: '',
  examined_at: '',
}

export function LowerLegExaminationListPage() {
  const resource = useLowerLegExaminationResource()
  const title = humanizeModuleName('MedicalRecordLowerLegExamination')

  return (
    <CrudDialogPage<LowerLegExamination>
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
