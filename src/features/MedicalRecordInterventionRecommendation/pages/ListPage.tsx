import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInterventionRecommendationResource } from '../api'
import type { InterventionRecommendation } from '../types'

const columns: ColumnDef<InterventionRecommendation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('source'),
    accessorKey: 'source',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source ?? '—'),
  },
  {
    header: humanizeField('recommendation'),
    accessorKey: 'recommendation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommendation ?? '—'),
  },
  {
    header: humanizeField('priority'),
    accessorKey: 'priority',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).priority ?? '—'),
  },
  {
    header: humanizeField('recommended_by'),
    accessorKey: 'recommended_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommended_by ?? '—'),
  },
  {
    header: humanizeField('recommended_at'),
    accessorKey: 'recommended_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recommended_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'source', label: humanizeField('source') },
  { key: 'recommendation', label: humanizeField('recommendation') },
  { key: 'priority', label: humanizeField('priority') },
  { key: 'recommended_by', label: humanizeField('recommended_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'recommended_at', label: humanizeField('recommended_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: null,
  source: '',
  recommendation: '',
  priority: '',
  recommended_by: null,
  recommended_at: '',
  status: '',
}

export function InterventionRecommendationListPage() {
  const resource = useInterventionRecommendationResource()
  const title = humanizeModuleName('MedicalRecordInterventionRecommendation')

  return (
    <CrudDialogPage<InterventionRecommendation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.source ?? `#${item.id}`}
      resource={resource}
    />
  )
}
