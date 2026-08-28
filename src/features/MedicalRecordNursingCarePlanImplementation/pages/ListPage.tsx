import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNursingCarePlanImplementationResource } from '../api'
import type { NursingCarePlanImplementation } from '../types'

const columns: ColumnDef<NursingCarePlanImplementation, unknown>[] = [
  {
    header: humanizeField('nursing_care_plan_id'),
    cell: ({ row }) => <RelationLabel endpoint="/nursing-care-plans" id={(row.original as unknown as Record<string, unknown>).nursing_care_plan_id as number | null} />,
  },
  {
    header: humanizeField('action_taken'),
    accessorKey: 'action_taken',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).action_taken ?? '—'),
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
  {
    header: humanizeField('evaluation'),
    accessorKey: 'evaluation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).evaluation ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'nursing_care_plan_id', label: humanizeField('nursing_care_plan_id'), type: 'relation', relationEndpoint: '/nursing-care-plans', required: true },
  { key: 'action_taken', label: humanizeField('action_taken') },
  { key: 'performed_by', label: humanizeField('performed_by'), type: 'number', required: true },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date', required: true },
  { key: 'evaluation', label: humanizeField('evaluation') },
]

const emptyForm = {
  nursing_care_plan_id: null,
  action_taken: '',
  performed_by: '',
  performed_at: '',
  evaluation: '',
}

export function NursingCarePlanImplementationListPage() {
  const resource = useNursingCarePlanImplementationResource()
  const title = humanizeModuleName('MedicalRecordNursingCarePlanImplementation')

  return (
    <CrudDialogPage<NursingCarePlanImplementation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.action_taken ?? `#${item.id}`}
      resource={resource}
    />
  )
}
