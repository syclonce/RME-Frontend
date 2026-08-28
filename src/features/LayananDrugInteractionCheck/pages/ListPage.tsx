import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDrugInteractionRuleResource } from '../api'
import type { DrugInteractionRule } from '../types'

const columns: ColumnDef<DrugInteractionRule, unknown>[] = [
  {
    header: humanizeField('item_id_a'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id_a as number | null} />,
  },
  {
    header: humanizeField('item_id_b'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id_b as number | null} />,
  },
  {
    header: humanizeField('severity'),
    accessorKey: 'severity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).severity ?? '—'),
  },
  {
    header: humanizeField('clinical_note'),
    accessorKey: 'clinical_note',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).clinical_note ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'item_id_a', label: humanizeField('item_id_a'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'item_id_b', label: humanizeField('item_id_b'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'severity', label: humanizeField('severity'), required: true },
  { key: 'clinical_note', label: humanizeField('clinical_note'), required: true },
]

const emptyForm = {
  item_id_a: null,
  item_id_b: null,
  severity: '',
  clinical_note: '',
}

export function DrugInteractionRuleListPage() {
  const resource = useDrugInteractionRuleResource()
  const title = humanizeModuleName('LayananDrugInteractionCheck')

  return (
    <CrudDialogPage<DrugInteractionRule>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.severity ?? `#${item.id}`}
      resource={resource}
    />
  )
}
