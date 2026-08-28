import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePpkResource } from '../api'
import type { Ppk } from '../types'

const columns: ColumnDef<Ppk, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('bpjs_code'),
    accessorKey: 'bpjs_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bpjs_code ?? '—'),
  },
  {
    header: humanizeField('type'),
    accessorKey: 'type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).type ?? '—'),
  },
  {
    header: humanizeField('ownership'),
    accessorKey: 'ownership',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ownership ?? '—'),
  },
  {
    header: humanizeField('jpk'),
    accessorKey: 'jpk',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).jpk ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'code', label: humanizeField('code'), section: 'Detail' },
  { key: 'bpjs_code', label: humanizeField('bpjs_code'), section: 'Detail' },
  { key: 'type', label: humanizeField('type'), type: 'number', section: 'Detail' },
  { key: 'ownership', label: humanizeField('ownership'), type: 'number', section: 'Detail' },
  { key: 'jpk', label: humanizeField('jpk'), type: 'number', section: 'Detail' },
  { key: 'name', label: humanizeField('name'), required: true, section: 'Detail' },
  { key: 'class', label: humanizeField('class'), required: true, section: 'Detail' },
  { key: 'address', label: humanizeField('address'), required: true, section: 'Detail' },
  { key: 'rt', label: humanizeField('rt'), section: 'Detail' },
  { key: 'rw', label: humanizeField('rw'), section: 'Detail Tambahan' },
  { key: 'postal_code', label: humanizeField('postal_code'), section: 'Detail Tambahan' },
  { key: 'phone', label: humanizeField('phone'), section: 'Detail Tambahan' },
  { key: 'fax', label: humanizeField('fax'), required: true, section: 'Detail Tambahan' },
  { key: 'region_code', label: humanizeField('region_code'), section: 'Detail Tambahan' },
  { key: 'region_name', label: humanizeField('region_name'), required: true, section: 'Detail Tambahan' },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date', section: 'Detail Tambahan' },
  { key: 'ended_at', label: humanizeField('ended_at'), type: 'date', section: 'Detail Tambahan' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox', section: 'Detail Tambahan' },
]

const emptyForm = {
  code: '',
  bpjs_code: '',
  type: '',
  ownership: '',
  jpk: '',
  name: '',
  class: '',
  address: '',
  rt: '',
  rw: '',
  postal_code: '',
  phone: '',
  fax: '',
  region_code: '',
  region_name: '',
  started_at: '',
  ended_at: '',
  is_active: false,
}

export function PpkListPage() {
  const resource = usePpkResource()
  const title = humanizeModuleName('GeneralPpk')

  return (
    <CrudDialogPage<Ppk>
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
