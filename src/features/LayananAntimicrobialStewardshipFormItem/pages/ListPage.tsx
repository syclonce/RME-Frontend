import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipFormItemEndpoint, useAntimicrobialStewardshipFormItemResource } from '../api'
import type { AntimicrobialStewardshipFormItem } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipFormItem, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('dose'),
    accessorKey: 'dose',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dose ?? '—'),
  },
  {
    header: humanizeField('route'),
    accessorKey: 'route',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).route ?? '—'),
  },
  {
    header: humanizeField('frequency'),
    accessorKey: 'frequency',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).frequency ?? '—'),
  },
  {
    header: humanizeField('planned_duration_days'),
    accessorKey: 'planned_duration_days',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).planned_duration_days ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items' },
  { key: 'dose', label: humanizeField('dose'), required: true },
  { key: 'route', label: humanizeField('route'), required: true },
  { key: 'frequency', label: humanizeField('frequency'), required: true },
  { key: 'planned_duration_days', label: humanizeField('planned_duration_days'), type: 'number' },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  item_id: null,
  dose: '',
  route: '',
  frequency: '',
  planned_duration_days: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipFormItem>[] = []

export function AntimicrobialStewardshipFormItemListPage() {
  const resource = useAntimicrobialStewardshipFormItemResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipFormItem')

  return (
    <WorkflowListPage<AntimicrobialStewardshipFormItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipFormItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.dose ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
