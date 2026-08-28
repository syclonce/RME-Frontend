import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePhysicalAssessmentResource } from '../api'
import type { PhysicalAssessment } from '../types'

const columns: ColumnDef<PhysicalAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('mobility_status'),
    accessorKey: 'mobility_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mobility_status ?? '—'),
  },
  {
    header: humanizeField('adl_status'),
    accessorKey: 'adl_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).adl_status ?? '—'),
  },
  {
    header: humanizeField('cognitive_status'),
    accessorKey: 'cognitive_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cognitive_status ?? '—'),
  },
  {
    header: humanizeField('nutritional_risk'),
    accessorKey: 'nutritional_risk',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nutritional_risk ?? '—'),
  },
  {
    header: humanizeField('pain_level'),
    accessorKey: 'pain_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pain_level ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'mobility_status', label: humanizeField('mobility_status') },
  { key: 'adl_status', label: humanizeField('adl_status') },
  { key: 'cognitive_status', label: humanizeField('cognitive_status') },
  { key: 'nutritional_risk', label: humanizeField('nutritional_risk'), type: 'select', options: [{"value":"low","label":"Low"},{"value":"medium","label":"Medium"},{"value":"high","label":"High"}] },
  { key: 'pain_level', label: humanizeField('pain_level'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  mobility_status: '',
  adl_status: '',
  cognitive_status: '',
  nutritional_risk: '',
  pain_level: '',
  notes: '',
  assessed_at: '',
}

export function PhysicalAssessmentListPage() {
  const resource = usePhysicalAssessmentResource()
  const title = humanizeModuleName('MedicalRecordPhysicalAssessment')

  return (
    <CrudDialogPage<PhysicalAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.mobility_status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
