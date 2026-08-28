import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGuarantorSubspecialtyResource } from '../api'
import type { GuarantorSubspecialty } from '../types'

const columns: ColumnDef<GuarantorSubspecialty, unknown>[] = [
  {
    header: humanizeField('guarantor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/guarantors" id={(row.original as unknown as Record<string, unknown>).guarantor_id as number | null} />,
  },
  {
    header: humanizeField('subspecialty_name'),
    accessorKey: 'subspecialty_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subspecialty_name ?? '—'),
  },
  {
    header: humanizeField('is_covered'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_covered ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('coverage_note'),
    accessorKey: 'coverage_note',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).coverage_note ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'guarantor_id', label: humanizeField('guarantor_id'), type: 'relation', relationEndpoint: '/guarantors', required: true },
  { key: 'subspecialty_name', label: humanizeField('subspecialty_name'), required: true },
  { key: 'is_covered', label: humanizeField('is_covered'), type: 'checkbox' },
  { key: 'coverage_note', label: humanizeField('coverage_note') },
]

const emptyForm = {
  guarantor_id: null,
  subspecialty_name: '',
  is_covered: false,
  coverage_note: '',
}

export function GuarantorSubspecialtyListPage() {
  const resource = useGuarantorSubspecialtyResource()
  const title = humanizeModuleName('GeneralGuarantorSubspecialty')

  return (
    <CrudDialogPage<GuarantorSubspecialty>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.subspecialty_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
