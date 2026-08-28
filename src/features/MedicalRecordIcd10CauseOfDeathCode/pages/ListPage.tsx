import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useIcd10CauseOfDeathCodeResource } from '../api'
import type { Icd10CauseOfDeathCode } from '../types'

const columns: ColumnDef<Icd10CauseOfDeathCode, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
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
  { key: 'code', label: humanizeField('code'), required: true },
  { key: 'description', label: humanizeField('description'), required: true },
  { key: 'category', label: humanizeField('category') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  code: '',
  description: '',
  category: '',
  is_active: false,
}

export function Icd10CauseOfDeathCodeListPage() {
  const resource = useIcd10CauseOfDeathCodeResource()
  const title = humanizeModuleName('MedicalRecordIcd10CauseOfDeathCode')

  return (
    <CrudDialogPage<Icd10CauseOfDeathCode>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
