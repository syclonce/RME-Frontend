import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAntibioticBacteriaMappingResource } from '../api'
import type { AntibioticBacteriaMapping } from '../types'

const columns: ColumnDef<AntibioticBacteriaMapping, unknown>[] = [
  {
    header: humanizeField('antibiotic_name'),
    accessorKey: 'antibiotic_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).antibiotic_name ?? '—'),
  },
  {
    header: humanizeField('bacteria_name'),
    accessorKey: 'bacteria_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bacteria_name ?? '—'),
  },
  {
    header: humanizeField('sensitivity_category'),
    accessorKey: 'sensitivity_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensitivity_category ?? '—'),
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
  { key: 'bacteria_name', label: humanizeField('bacteria_name'), required: true },
  { key: 'sensitivity_category', label: humanizeField('sensitivity_category') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  antibiotic_name: '',
  bacteria_name: '',
  sensitivity_category: '',
  is_active: false,
}

export function AntibioticBacteriaMappingListPage() {
  const resource = useAntibioticBacteriaMappingResource()
  const title = humanizeModuleName('GeneralAntibioticBacteriaMapping')

  return (
    <CrudDialogPage<AntibioticBacteriaMapping>
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
