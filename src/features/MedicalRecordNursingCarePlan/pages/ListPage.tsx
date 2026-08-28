import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNursingCarePlanResource } from '../api'
import type { NursingCarePlan } from '../types'

const columns: ColumnDef<NursingCarePlan, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('assessment'),
    accessorKey: 'assessment',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessment ?? '—'),
  },
  {
    header: humanizeField('goal'),
    accessorKey: 'goal',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).goal ?? '—'),
  },
  {
    header: humanizeField('intervention_plan'),
    accessorKey: 'intervention_plan',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).intervention_plan ?? '—'),
  },
  {
    header: humanizeField('target_date'),
    accessorKey: 'target_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).target_date ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'assessment', label: humanizeField('assessment') },
  { key: 'goal', label: humanizeField('goal') },
  { key: 'intervention_plan', label: humanizeField('intervention_plan') },
  { key: 'target_date', label: humanizeField('target_date'), type: 'date' },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: null,
  assessment: '',
  goal: '',
  intervention_plan: '',
  target_date: '',
  recorded_by: null,
  recorded_at: '',
  status: '',
}

export function NursingCarePlanListPage() {
  const resource = useNursingCarePlanResource()
  const title = humanizeModuleName('MedicalRecordNursingCarePlan')

  return (
    <CrudDialogPage<NursingCarePlan>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.assessment ?? `#${item.id}`}
      resource={resource}
    />
  )
}
