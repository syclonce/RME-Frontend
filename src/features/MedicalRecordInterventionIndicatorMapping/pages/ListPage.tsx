import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInterventionIndicatorMappingResource } from '../api'
import type { InterventionIndicatorMapping } from '../types'

const columns: ColumnDef<InterventionIndicatorMapping, unknown>[] = [
  {
    header: humanizeField('intervention_code'),
    accessorKey: 'intervention_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).intervention_code ?? '—'),
  },
  {
    header: humanizeField('intervention_name'),
    accessorKey: 'intervention_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).intervention_name ?? '—'),
  },
  {
    header: humanizeField('indicator_code'),
    accessorKey: 'indicator_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indicator_code ?? '—'),
  },
  {
    header: humanizeField('indicator_name'),
    accessorKey: 'indicator_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indicator_name ?? '—'),
  },
  {
    header: humanizeField('evaluation_criteria'),
    accessorKey: 'evaluation_criteria',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).evaluation_criteria ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) =>
      (row.original as unknown as Record<string, unknown>).is_active ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">Nonaktif</Badge>
      ),
  },
]

const fields: CrudField[] = [
  { key: 'intervention_code', label: humanizeField('intervention_code'), required: true },
  { key: 'intervention_name', label: humanizeField('intervention_name'), required: true },
  { key: 'indicator_code', label: humanizeField('indicator_code'), required: true },
  { key: 'indicator_name', label: humanizeField('indicator_name'), required: true },
  { key: 'evaluation_criteria', label: humanizeField('evaluation_criteria') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  intervention_code: '',
  intervention_name: '',
  indicator_code: '',
  indicator_name: '',
  evaluation_criteria: '',
  is_active: false,
}

export function InterventionIndicatorMappingListPage() {
  const resource = useInterventionIndicatorMappingResource()
  const title = humanizeModuleName('MedicalRecordInterventionIndicatorMapping')

  return (
    <CrudDialogPage<InterventionIndicatorMapping>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.intervention_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
