import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGetUpAndGoTestAssessmentResource } from '../api'
import type { GetUpAndGoTestAssessment } from '../types'

const columns: ColumnDef<GetUpAndGoTestAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('time_seconds'),
    accessorKey: 'time_seconds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).time_seconds ?? '—'),
  },
  {
    header: humanizeField('assistive_device'),
    accessorKey: 'assistive_device',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assistive_device ?? '—'),
  },
  {
    header: humanizeField('fall_risk'),
    accessorKey: 'fall_risk',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).fall_risk ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
  {
    header: humanizeField('assessed_at'),
    accessorKey: 'assessed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'time_seconds', label: humanizeField('time_seconds'), type: 'number', required: true },
  { key: 'assistive_device', label: humanizeField('assistive_device') },
  { key: 'fall_risk', label: humanizeField('fall_risk'), type: 'select', options: [{"value":"low","label":"Low"},{"value":"medium","label":"Medium"},{"value":"high","label":"High"}] },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  time_seconds: '',
  assistive_device: '',
  fall_risk: '',
  notes: '',
  assessed_at: '',
}

export function GetUpAndGoTestAssessmentListPage() {
  const resource = useGetUpAndGoTestAssessmentResource()
  const title = humanizeModuleName('MedicalRecordGetUpAndGoTestAssessment')

  return (
    <CrudDialogPage<GetUpAndGoTestAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.assistive_device ?? `#${item.id}`}
      resource={resource}
    />
  )
}
