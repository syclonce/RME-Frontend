import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAntibioticRestrictionResource } from '../api'
import type { AntibioticRestriction } from '../types'

const columns: ColumnDef<AntibioticRestriction, unknown>[] = [
  {
    header: humanizeField('antibiotic_name'),
    accessorKey: 'antibiotic_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).antibiotic_name ?? '—'),
  },
  {
    header: humanizeField('aware_category'),
    accessorKey: 'aware_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).aware_category ?? '—'),
  },
  {
    header: humanizeField('requires_pra_approval'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_pra_approval ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('restriction_condition'),
    accessorKey: 'restriction_condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).restriction_condition ?? '—'),
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
  { key: 'antibiotic_name', label: humanizeField('antibiotic_name'), required: true },
  { key: 'aware_category', label: humanizeField('aware_category'), required: true },
  { key: 'requires_pra_approval', label: humanizeField('requires_pra_approval'), type: 'checkbox' },
  { key: 'restriction_condition', label: humanizeField('restriction_condition') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  antibiotic_name: '',
  aware_category: '',
  requires_pra_approval: false,
  restriction_condition: '',
  is_active: false,
}

export function AntibioticRestrictionListPage() {
  const resource = useAntibioticRestrictionResource()
  const title = humanizeModuleName('GeneralAntibioticRestriction')

  return (
    <CrudDialogPage<AntibioticRestriction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.antibiotic_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
