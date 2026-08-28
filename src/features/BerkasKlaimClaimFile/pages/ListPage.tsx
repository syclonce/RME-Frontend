import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBerkasKlaimClaimFileResource } from '../api'
import type { BerkasKlaimClaimFile } from '../types'

const columns: ColumnDef<BerkasKlaimClaimFile, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('invoice_id'),
    accessorKey: 'invoice_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).invoice_id ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'invoice_id', label: humanizeField('invoice_id'), type: 'combobox', relationEndpoint: '/invoices' },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  visit_id: null,
  invoice_id: null,
  status: '',
}

export function BerkasKlaimClaimFileListPage() {
  const resource = useBerkasKlaimClaimFileResource()
  const title = humanizeModuleName('BerkasKlaimClaimFile')

  return (
    <CrudDialogPage<BerkasKlaimClaimFile>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
