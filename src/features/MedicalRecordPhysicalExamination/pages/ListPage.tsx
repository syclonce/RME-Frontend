import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePhysicalExaminationResource } from '../api'
import type { PhysicalExamination } from '../types'

const columns: ColumnDef<PhysicalExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('general_condition'),
    accessorKey: 'general_condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).general_condition ?? '—'),
  },
  {
    header: humanizeField('consciousness_gcs'),
    accessorKey: 'consciousness_gcs',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).consciousness_gcs ?? '—'),
  },
  {
    header: humanizeField('head_to_toe_notes'),
    accessorKey: 'head_to_toe_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).head_to_toe_notes ?? '—'),
  },
  {
    header: humanizeField('examined_by'),
    accessorKey: 'examined_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_by ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'general_condition', label: humanizeField('general_condition') },
  { key: 'consciousness_gcs', label: humanizeField('consciousness_gcs') },
  { key: 'head_to_toe_notes', label: humanizeField('head_to_toe_notes') },
  { key: 'examined_by', label: humanizeField('examined_by'), type: 'number' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  general_condition: '',
  consciousness_gcs: '',
  head_to_toe_notes: '',
  examined_by: '',
  examined_at: '',
}

export function PhysicalExaminationListPage() {
  const resource = usePhysicalExaminationResource()
  const title = humanizeModuleName('MedicalRecordPhysicalExamination')

  return (
    <CrudDialogPage<PhysicalExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.general_condition ?? `#${item.id}`}
      resource={resource}
    />
  )
}
