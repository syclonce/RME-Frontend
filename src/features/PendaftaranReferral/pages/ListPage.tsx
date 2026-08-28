import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranReferralEndpoint, useReferralResource } from '../api'
import type { Referral } from '../types'

const columns: ColumnDef<Referral, unknown>[] = [
  {
    header: humanizeField('referral_number'),
    accessorKey: 'referral_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).referral_number ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('direction'),
    accessorKey: 'direction',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).direction ?? '—'),
  },
  {
    header: humanizeField('facility_name'),
    accessorKey: 'facility_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).facility_name ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('referred_at'),
    accessorKey: 'referred_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).referred_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'direction', label: humanizeField('direction'), type: 'select', required: true, options: [{"value":"incoming","label":"Incoming"},{"value":"outgoing","label":"Outgoing"}] },
  { key: 'facility_name', label: humanizeField('facility_name'), required: true },
  { key: 'reason', label: humanizeField('reason') },
  { key: 'referred_at', label: humanizeField('referred_at'), type: 'date' },
]

const emptyForm = {
  patient_id: '',
  direction: '',
  facility_name: '',
  reason: '',
  referred_at: '',
}

const actions: WorkflowAction<Referral>[] = []

export function ReferralListPage() {
  const resource = useReferralResource()
  const title = humanizeModuleName('PendaftaranReferral')

  return (
    <WorkflowListPage<Referral>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranReferralEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.direction ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
