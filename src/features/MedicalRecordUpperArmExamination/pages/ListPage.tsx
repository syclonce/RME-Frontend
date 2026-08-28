import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useUpperArmExaminationResource } from '../api'
import type { UpperArmExamination } from '../types'

const columns: ColumnDef<UpperArmExamination, unknown>[] = [
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
    header: humanizeField('range_of_motion'),
    accessorKey: 'range_of_motion',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).range_of_motion ?? '—'),
  },
  {
    header: humanizeField('deformity'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).deformity ? 'Ya' : 'Tidak'),
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
  { key: 'muscle_strength', label: humanizeField('muscle_strength') },
  { key: 'range_of_motion', label: humanizeField('range_of_motion') },
  { key: 'deformity', label: humanizeField('deformity'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  side: '',
  muscle_strength: '',
  range_of_motion: '',
  deformity: false,
  findings: '',
  examined_at: '',
}

export function UpperArmExaminationListPage() {
  const resource = useUpperArmExaminationResource()
  const title = humanizeModuleName('MedicalRecordUpperArmExamination')

  return (
    <CrudDialogPage<UpperArmExamination>
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
