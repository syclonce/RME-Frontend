import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useKipResource } from '../api'
import type { Kip } from '../types'

const columns: ColumnDef<Kip, unknown>[] = [
  {
    header: humanizeField('patient_norm'),
    accessorKey: 'patient_norm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_norm ?? '—'),
  },
  {
    header: humanizeField('card_type'),
    accessorKey: 'card_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).card_type ?? '—'),
  },
  {
    header: humanizeField('card_number'),
    accessorKey: 'card_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).card_number ?? '—'),
  },
  {
    header: humanizeField('address'),
    accessorKey: 'address',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).address ?? '—'),
  },
  {
    header: humanizeField('rt'),
    accessorKey: 'rt',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rt ?? '—'),
  },
  {
    header: humanizeField('rw'),
    accessorKey: 'rw',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rw ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_norm', label: humanizeField('patient_norm'), required: true },
  { key: 'card_type', label: humanizeField('card_type'), required: true },
  { key: 'card_number', label: humanizeField('card_number'), required: true },
  { key: 'address', label: humanizeField('address') },
  { key: 'rt', label: humanizeField('rt') },
  { key: 'rw', label: humanizeField('rw') },
  { key: 'postal_code', label: humanizeField('postal_code') },
  { key: 'region_code', label: humanizeField('region_code') },
]

const emptyForm = {
  patient_norm: '',
  card_type: '',
  card_number: '',
  address: '',
  rt: '',
  rw: '',
  postal_code: '',
  region_code: '',
}

export function KipListPage() {
  const resource = useKipResource()
  const title = humanizeModuleName('GeneralKip')

  return (
    <CrudDialogPage<Kip>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.patient_norm ?? `#${item.id}`}
      resource={resource}
    />
  )
}
