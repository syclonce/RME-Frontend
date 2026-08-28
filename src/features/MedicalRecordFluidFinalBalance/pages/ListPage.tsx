import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFluidFinalBalanceResource } from '../api'
import type { FluidFinalBalance } from '../types'

const columns: ColumnDef<FluidFinalBalance, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('period_date'),
    accessorKey: 'period_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).period_date ?? '—'),
  },
  {
    header: humanizeField('total_intake_ml'),
    accessorKey: 'total_intake_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).total_intake_ml ?? '—'),
  },
  {
    header: humanizeField('total_output_ml'),
    accessorKey: 'total_output_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).total_output_ml ?? '—'),
  },
  {
    header: humanizeField('balance_ml'),
    accessorKey: 'balance_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).balance_ml ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'period_date', label: humanizeField('period_date'), type: 'date', required: true },
  { key: 'total_intake_ml', label: humanizeField('total_intake_ml'), type: 'number', required: true },
  { key: 'total_output_ml', label: humanizeField('total_output_ml'), type: 'number', required: true },
  { key: 'balance_ml', label: humanizeField('balance_ml'), type: 'number' },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  period_date: '',
  total_intake_ml: '',
  total_output_ml: '',
  balance_ml: '',
  recorded_by: '',
  recorded_at: '',
}

export function FluidFinalBalanceListPage() {
  const resource = useFluidFinalBalanceResource()
  const title = humanizeModuleName('MedicalRecordFluidFinalBalance')

  return (
    <CrudDialogPage<FluidFinalBalance>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      resource={resource}
    />
  )
}
