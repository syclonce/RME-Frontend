import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFluidBalanceAssessmentResource } from '../api'
import type { FluidBalanceAssessment } from '../types'

const columns: ColumnDef<FluidBalanceAssessment, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('shift'),
    accessorKey: 'shift',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shift ?? '—'),
  },
  {
    header: humanizeField('assessed_at'),
    accessorKey: 'assessed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_at ?? '—'),
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
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'shift', label: humanizeField('shift'), type: 'select', options: [{"value":"pagi","label":"Pagi"},{"value":"siang","label":"Siang"},{"value":"malam","label":"Malam"}] },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', required: true },
  { key: 'total_intake_ml', label: humanizeField('total_intake_ml'), type: 'number' },
  { key: 'total_output_ml', label: humanizeField('total_output_ml'), type: 'number' },
  { key: 'balance_ml', label: humanizeField('balance_ml'), type: 'number' },
]

const emptyForm = {
  visit_id: null,
  shift: '',
  assessed_at: '',
  total_intake_ml: '',
  total_output_ml: '',
  balance_ml: '',
}

export function FluidBalanceAssessmentListPage() {
  const resource = useFluidBalanceAssessmentResource()
  const title = humanizeModuleName('MedicalRecordFluidBalanceAssessment')

  return (
    <CrudDialogPage<FluidBalanceAssessment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.shift ?? `#${item.id}`}
      resource={resource}
    />
  )
}
