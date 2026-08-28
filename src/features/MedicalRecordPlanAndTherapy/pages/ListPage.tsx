import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordPlanAndTherapyEndpoint, usePlanAndTherapyResource } from '../api'
import type { PlanAndTherapy } from '../types'

const columns: ColumnDef<PlanAndTherapy, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('ordered_by'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).ordered_by as number | null} />,
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('assessment_summary'),
    accessorKey: 'assessment_summary',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessment_summary ?? '—'),
  },
  {
    header: humanizeField('plan_description'),
    accessorKey: 'plan_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).plan_description ?? '—'),
  },
  {
    header: humanizeField('therapy_type'),
    accessorKey: 'therapy_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).therapy_type ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'ordered_by', label: humanizeField('ordered_by'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'assessment_summary', label: humanizeField('assessment_summary') },
  { key: 'plan_description', label: humanizeField('plan_description'), required: true },
  { key: 'therapy_type', label: humanizeField('therapy_type') },
  { key: 'target_date', label: humanizeField('target_date'), type: 'date' },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"active","label":"Active"},{"value":"completed","label":"Completed"},{"value":"revised","label":"Revised"}] },
  { key: 'ordered_at', label: humanizeField('ordered_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  ordered_by: null,
  created_by: '',
  assessment_summary: '',
  plan_description: '',
  therapy_type: '',
  target_date: '',
  status: '',
  ordered_at: '',
}

const actions: WorkflowAction<PlanAndTherapy>[] = []

export function PlanAndTherapyListPage() {
  const resource = usePlanAndTherapyResource()
  const title = humanizeModuleName('MedicalRecordPlanAndTherapy')

  return (
    <WorkflowListPage<PlanAndTherapy>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordPlanAndTherapyEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.assessment_summary ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
