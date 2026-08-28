import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useIcdSnomedCtMappingResource } from '../api'
import type { IcdSnomedCtMapping } from '../types'

const columns: ColumnDef<IcdSnomedCtMapping, unknown>[] = [
  {
    header: humanizeField('icd_code'),
    accessorKey: 'icd_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).icd_code ?? '—'),
  },
  {
    header: humanizeField('snomed_code'),
    accessorKey: 'snomed_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).snomed_code ?? '—'),
  },
  {
    header: humanizeField('icd_description'),
    accessorKey: 'icd_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).icd_description ?? '—'),
  },
  {
    header: humanizeField('snomed_description'),
    accessorKey: 'snomed_description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).snomed_description ?? '—'),
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
  { key: 'icd_code', label: humanizeField('icd_code'), required: true },
  { key: 'snomed_code', label: humanizeField('snomed_code'), required: true },
  { key: 'icd_description', label: humanizeField('icd_description') },
  { key: 'snomed_description', label: humanizeField('snomed_description') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  icd_code: '',
  snomed_code: '',
  icd_description: '',
  snomed_description: '',
  is_active: false,
}

export function IcdSnomedCtMappingListPage() {
  const resource = useIcdSnomedCtMappingResource()
  const title = humanizeModuleName('GeneralIcdSnomedCtMapping')

  return (
    <CrudDialogPage<IcdSnomedCtMapping>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.icd_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
