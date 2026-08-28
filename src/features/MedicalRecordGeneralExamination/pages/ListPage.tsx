import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGeneralExaminationResource } from '../api'
import type { GeneralExamination } from '../types'

const columns: ColumnDef<GeneralExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('general_appearance'),
    accessorKey: 'general_appearance',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).general_appearance ?? '—'),
  },
  {
    header: humanizeField('consciousness_level'),
    accessorKey: 'consciousness_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).consciousness_level ?? '—'),
  },
  {
    header: humanizeField('nutritional_status'),
    accessorKey: 'nutritional_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nutritional_status ?? '—'),
  },
  {
    header: humanizeField('posture'),
    accessorKey: 'posture',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).posture ?? '—'),
  },
  {
    header: humanizeField('gait'),
    accessorKey: 'gait',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gait ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'general_appearance', label: humanizeField('general_appearance') },
  { key: 'consciousness_level', label: humanizeField('consciousness_level') },
  { key: 'nutritional_status', label: humanizeField('nutritional_status') },
  { key: 'posture', label: humanizeField('posture') },
  { key: 'gait', label: humanizeField('gait') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  general_appearance: '',
  consciousness_level: '',
  nutritional_status: '',
  posture: '',
  gait: '',
  examined_at: '',
}

export function GeneralExaminationListPage() {
  const resource = useGeneralExaminationResource()
  const title = humanizeModuleName('MedicalRecordGeneralExamination')

  return (
    <CrudDialogPage<GeneralExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.general_appearance ?? `#${item.id}`}
      resource={resource}
    />
  )
}
