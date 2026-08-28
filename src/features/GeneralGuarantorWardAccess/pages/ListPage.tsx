import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGuarantorWardAccessResource } from '../api'
import type { GuarantorWardAccess } from '../types'

const columns: ColumnDef<GuarantorWardAccess, unknown>[] = [
  {
    header: humanizeField('guarantor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/guarantors" id={(row.original as unknown as Record<string, unknown>).guarantor_id as number | null} />,
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('is_allowed'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_allowed ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors', required: true },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards', required: true },
  { key: 'is_allowed', label: humanizeField('is_allowed'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  guarantor_id: null,
  ward_id: null,
  is_allowed: false,
  notes: '',
}

export function GuarantorWardAccessListPage() {
  const resource = useGuarantorWardAccessResource()
  const title = humanizeModuleName('GeneralGuarantorWardAccess')

  return (
    <CrudDialogPage<GuarantorWardAccess>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      resource={resource}
    />
  )
}
