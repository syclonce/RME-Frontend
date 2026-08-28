import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useKapResource } from '../api'
import type { Kap } from '../types'

const columns: ColumnDef<Kap, unknown>[] = [
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
]

const fields: CrudField[] = [
  { key: 'patient_norm', label: humanizeField('patient_norm'), required: true },
  { key: 'card_type', label: humanizeField('card_type'), required: true },
  { key: 'card_number', label: humanizeField('card_number'), required: true },
]

const emptyForm = {
  patient_norm: '',
  card_type: '',
  card_number: '',
}

export function KapListPage() {
  const resource = useKapResource()
  const title = humanizeModuleName('GeneralKap')

  return (
    <CrudDialogPage<Kap>
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
