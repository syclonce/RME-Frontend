import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePrescriptionFrequencyRuleCategoryResource } from '../api'
import type { PrescriptionFrequencyRuleCategory } from '../types'

const columns: ColumnDef<PrescriptionFrequencyRuleCategory, unknown>[] = [
  {
    header: humanizeField('prescription_frequency_rule_id'),
    cell: ({ row }) => <RelationLabel endpoint="/prescription-frequency-rules" id={(row.original as unknown as Record<string, unknown>).prescription_frequency_rule_id as number | null} />,
  },
  {
    header: humanizeField('category_name'),
    accessorKey: 'category_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category_name ?? '—'),
  },
  {
    header: humanizeField('sort_order'),
    accessorKey: 'sort_order',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sort_order ?? '—'),
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
  { key: 'prescription_frequency_rule_id', label: humanizeField('prescription_frequency_rule_id'), type: 'relation', relationEndpoint: '/prescription-frequency-rules', required: true },
  { key: 'category_name', label: humanizeField('category_name'), required: true },
  { key: 'sort_order', label: humanizeField('sort_order'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  prescription_frequency_rule_id: null,
  category_name: '',
  sort_order: '',
  is_active: false,
}

export function PrescriptionFrequencyRuleCategoryListPage() {
  const resource = usePrescriptionFrequencyRuleCategoryResource()
  const title = humanizeModuleName('GeneralPrescriptionFrequencyRuleCategory')

  return (
    <CrudDialogPage<PrescriptionFrequencyRuleCategory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.category_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
