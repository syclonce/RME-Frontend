import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFluidBalanceAssessmentDetailResource } from '../api'
import type { FluidBalanceAssessmentDetail } from '../types'

const columns: ColumnDef<FluidBalanceAssessmentDetail, unknown>[] = [
  {
    header: humanizeField('fluid_balance_assessment_id'),
    cell: ({ row }) => <RelationLabel endpoint="/fluid-balance-assessments" id={(row.original as unknown as Record<string, unknown>).fluid_balance_assessment_id as number | null} />,
  },
  {
    header: humanizeField('type'),
    accessorKey: 'type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).type ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('amount_ml'),
    accessorKey: 'amount_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount_ml ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'fluid_balance_assessment_id', label: humanizeField('fluid_balance_assessment_id'), type: 'relation', relationEndpoint: '/fluid-balance-assessments', required: true },
  { key: 'type', label: humanizeField('type'), type: 'select', required: true, options: [{"value":"intake","label":"Intake"},{"value":"output","label":"Output"}] },
  { key: 'category', label: humanizeField('category'), required: true },
  { key: 'amount_ml', label: humanizeField('amount_ml'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  fluid_balance_assessment_id: null,
  type: '',
  category: '',
  amount_ml: '',
  recorded_at: '',
}

export function FluidBalanceAssessmentDetailListPage() {
  const resource = useFluidBalanceAssessmentDetailResource()
  const title = humanizeModuleName('MedicalRecordFluidBalanceAssessmentDetail')

  return (
    <CrudDialogPage<FluidBalanceAssessmentDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
