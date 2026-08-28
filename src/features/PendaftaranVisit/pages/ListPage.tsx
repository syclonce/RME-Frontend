import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PendaftaranVisitEndpoint, useVisitResource } from '../api'
import type { Visit } from '../types'

const columns: ColumnDef<Visit, unknown>[] = [
  {
    header: humanizeField('visit_number'),
    accessorKey: 'visit_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_number ?? '—'),
  },
  {
    header: humanizeField('registration_id'),
    accessorKey: 'registration_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).registration_id ?? '—'),
  },
  {
    header: humanizeField('attending_physician_id'),
    accessorKey: 'attending_physician_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).attending_physician_id ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
  },
  {
    header: humanizeField('bed_id'),
    cell: ({ row }) => <RelationLabel endpoint="/beds" id={(row.original as unknown as Record<string, unknown>).bed_id as number | null} />,
  },
  {
    header: humanizeField('admitted_at'),
    accessorKey: 'admitted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).admitted_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_number', label: humanizeField('visit_number') },
  { key: 'registration_id', label: humanizeField('registration_id'), type: 'number', required: true },
  { key: 'attending_physician_id', label: humanizeField('attending_physician_id'), type: 'number' },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards' },
  { key: 'bed_id', label: humanizeField('bed_id'), type: 'relation', relationEndpoint: '/beds' },
  { key: 'admitted_at', label: humanizeField('admitted_at'), type: 'date' },
  { key: 'is_new_visit', label: humanizeField('is_new_visit'), type: 'checkbox' },
  { key: 'is_deposit', label: humanizeField('is_deposit'), type: 'checkbox' },
  { key: 'deposit_class_id', label: humanizeField('deposit_class_id'), type: 'number' },
]

const emptyForm = {
  visit_number: '',
  registration_id: '',
  attending_physician_id: '',
  ward_id: null,
  bed_id: null,
  admitted_at: '',
  is_new_visit: false,
  is_deposit: false,
  deposit_class_id: '',
}

const actions: WorkflowAction<Visit>[] = [
  {
    key: 'transfer',
    label: 'Pindahkan',
    method: 'post',
    path: (item) => `/visits/${item.id}/transfer`,
    fields: [
        { key: 'target_bed_id', label: humanizeField('target_bed_id'), type: 'relation', relationEndpoint: '/beds', required: true },
        { key: 'notes', label: humanizeField('notes') },
    ],
    emptyForm: {
        target_bed_id: null,
        notes: '',
    },
  },
  {
    key: 'discharge',
    label: 'Pulangkan',
    method: 'post',
    path: (item) => `/visits/${item.id}/discharge`,
    variant: 'destructive',
    fields: [
        { key: 'final_outcome', label: humanizeField('final_outcome'), required: true },
        { key: 'discharge_method', label: humanizeField('discharge_method'), required: true },
        { key: 'follow_up_notes', label: humanizeField('follow_up_notes') },
    ],
    emptyForm: {
        final_outcome: '',
        discharge_method: '',
        follow_up_notes: '',
    },
  },
]

export function VisitListPage() {
  const resource = useVisitResource()
  const title = humanizeModuleName('PendaftaranVisit')

  return (
    <WorkflowListPage<Visit>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PendaftaranVisitEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.visit_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
