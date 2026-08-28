import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGuarantorResource } from '../api'
import type { Guarantor } from '../types'

const columns: ColumnDef<Guarantor, unknown>[] = [
  {
    header: humanizeField('registration_id'),
    accessorKey: 'registration_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registration_id ?? '—'),
  },
  {
    header: humanizeField('payer_type'),
    accessorKey: 'payer_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).payer_type ?? '—'),
  },
  {
    header: humanizeField('member_number'),
    accessorKey: 'member_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).member_number ?? '—'),
  },
  {
    header: humanizeField('room_class_id'),
    cell: ({ row }) => <RelationLabel endpoint="/room-classes" id={(row.original as unknown as Record<string, unknown>).room_class_id as number | null} />,
  },
  {
    header: humanizeField('reference_letter_number'),
    accessorKey: 'reference_letter_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reference_letter_number ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'registration_id', label: humanizeField('registration_id'), type: 'number', required: true },
  { key: 'payer_type', label: humanizeField('payer_type'), required: true },
  { key: 'member_number', label: humanizeField('member_number') },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'reference_letter_number', label: humanizeField('reference_letter_number') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  registration_id: '',
  payer_type: '',
  member_number: '',
  room_class_id: null,
  reference_letter_number: '',
  notes: '',
}

export function GuarantorListPage() {
  const resource = useGuarantorResource()
  const title = humanizeModuleName('PendaftaranGuarantor')

  return (
    <CrudDialogPage<Guarantor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.payer_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
