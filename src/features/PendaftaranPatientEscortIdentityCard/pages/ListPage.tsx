import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientEscortIdentityCardResource } from '../api'
import type { PatientEscortIdentityCard } from '../types'

const columns: ColumnDef<PatientEscortIdentityCard, unknown>[] = [
  {
    header: humanizeField('patient_escort_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patient-escorts" id={(row.original as unknown as Record<string, unknown>).patient_escort_id as number | null} />,
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
    header: humanizeField('issued_date'),
    accessorKey: 'issued_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issued_date ?? '—'),
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
]

const fields: CrudField[] = [
  { key: 'patient_escort_id', label: humanizeField('patient_escort_id'), type: 'relation', relationEndpoint: '/patient-escorts', required: true },
  { key: 'card_type', label: humanizeField('card_type'), required: true },
  { key: 'card_number', label: humanizeField('card_number'), required: true },
  { key: 'issued_date', label: humanizeField('issued_date'), type: 'date' },
  { key: 'address', label: humanizeField('address') },
  { key: 'rt', label: humanizeField('rt') },
  { key: 'rw', label: humanizeField('rw') },
  { key: 'postal_code', label: humanizeField('postal_code') },
  { key: 'region_code', label: humanizeField('region_code') },
]

const emptyForm = {
  patient_escort_id: null,
  card_type: '',
  card_number: '',
  issued_date: '',
  address: '',
  rt: '',
  rw: '',
  postal_code: '',
  region_code: '',
}

export function PatientEscortIdentityCardListPage() {
  const resource = usePatientEscortIdentityCardResource()
  const title = humanizeModuleName('PendaftaranPatientEscortIdentityCard')

  return (
    <CrudDialogPage<PatientEscortIdentityCard>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.card_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
