import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSitbTb03RoTransferResource } from '../api'
import type { SitbTb03RoTransfer } from '../types'

const columns: ColumnDef<SitbTb03RoTransfer, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
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
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'code', label: humanizeField('code') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  name: '',
  code: '',
  is_active: false,
}

export function SitbTb03RoTransferListPage() {
  const resource = useSitbTb03RoTransferResource()
  const title = humanizeModuleName('GeneralSitbTb03RoTransfer')

  return (
    <CrudDialogPage<SitbTb03RoTransfer>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
