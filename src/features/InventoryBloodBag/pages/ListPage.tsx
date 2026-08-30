// codegen:preserve — aksi crossmatch dan transfusi mengikuti status kantong.
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { InventoryBloodBagEndpoint, useBloodBagResource } from '../api'
import type { BloodBag } from '../types'

const columns: ColumnDef<BloodBag, unknown>[] = [
  {
    header: humanizeField('bag_number'),
    accessorKey: 'bag_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bag_number ?? '—'),
  },
  {
    header: humanizeField('blood_type_id'),
    cell: ({ row }) => <RelationLabel endpoint="/blood_types" id={(row.original as unknown as Record<string, unknown>).blood_type_id as number | null} />,
  },
  {
    header: humanizeField('volume_ml'),
    accessorKey: 'volume_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).volume_ml ?? '—'),
  },
  {
    header: humanizeField('collected_at'),
    accessorKey: 'collected_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).collected_at ?? '—'),
  },
  {
    header: humanizeField('expires_at'),
    accessorKey: 'expires_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).expires_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'bag_number', label: humanizeField('bag_number'), required: true },
  { key: 'blood_type_id', label: humanizeField('blood_type_id'), type: 'relation', relationEndpoint: '/blood_types', required: true },
  { key: 'volume_ml', label: humanizeField('volume_ml'), type: 'number', required: true },
  { key: 'collected_at', label: humanizeField('collected_at'), type: 'date', required: true },
  { key: 'expires_at', label: humanizeField('expires_at'), type: 'date', required: true },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  bag_number: '',
  blood_type_id: null,
  volume_ml: '',
  collected_at: '',
  expires_at: '',
  status: '',
}

const actions: WorkflowAction<BloodBag>[] = [
  {
    key: 'crossmatch',
    label: 'Crossmatch',
    method: 'post',
    path: (item) => `/blood-bags/${item.id}/crossmatch`,
    fields: [
      { key: 'patient_id', label: 'Pasien', type: 'combobox', relationEndpoint: '/patients', required: true },
      { key: 'major_result', label: 'Hasil Mayor', type: 'select', required: true, options: [{ value: 'neg', label: 'Negatif' }, { value: 'pos', label: 'Positif' }] },
      { key: 'minor_result', label: 'Hasil Minor', type: 'select', required: true, options: [{ value: 'neg', label: 'Negatif' }, { value: 'pos', label: 'Positif' }] },
      { key: 'auto_control', label: 'Auto Control', type: 'select', required: true, options: [{ value: 'neg', label: 'Negatif' }, { value: 'pos', label: 'Positif' }] },
      { key: 'tested_by', label: 'Petugas Penguji', type: 'combobox', relationEndpoint: '/employees' },
    ],
    emptyForm: { patient_id: null, major_result: 'neg', minor_result: 'neg', auto_control: 'neg', tested_by: null },
    visibleWhen: (item) => item.status === 'in_stock',
  },
  {
    key: 'transfuse',
    label: 'Transfusikan',
    method: 'post',
    path: (item) => `/blood-bags/${item.id}/transfuse`,
    visibleWhen: (item) => item.status === 'crossmatch_reserved',
  },
]

export function BloodBagListPage() {
  const resource = useBloodBagResource()
  const title = humanizeModuleName('InventoryBloodBag')

  return (
    <WorkflowListPage<BloodBag>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={InventoryBloodBagEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.bag_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
