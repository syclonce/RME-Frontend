import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBloodRequestItemResource } from '../api'
import type { BloodRequestItem } from '../types'

const columns: ColumnDef<BloodRequestItem, unknown>[] = [
  {
    header: humanizeField('blood_transfusion_id'),
    cell: ({ row }) => <RelationLabel endpoint="/blood-transfusions" id={(row.original as unknown as Record<string, unknown>).blood_transfusion_id as number | null} />,
  },
  {
    header: humanizeField('blood_component'),
    accessorKey: 'blood_component',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_component ?? '—'),
  },
  {
    header: humanizeField('blood_type'),
    accessorKey: 'blood_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_type ?? '—'),
  },
  {
    header: humanizeField('bag_quantity'),
    accessorKey: 'bag_quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bag_quantity ?? '—'),
  },
  {
    header: humanizeField('cross_match_result'),
    accessorKey: 'cross_match_result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cross_match_result ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'blood_transfusion_id', label: humanizeField('blood_transfusion_id'), type: 'relation', relationEndpoint: '/blood-transfusions', required: true },
  { key: 'blood_component', label: humanizeField('blood_component'), required: true },
  { key: 'blood_type', label: humanizeField('blood_type') },
  { key: 'bag_quantity', label: humanizeField('bag_quantity'), type: 'number', required: true },
  { key: 'cross_match_result', label: humanizeField('cross_match_result') },
  { key: 'status', label: humanizeField('status') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  blood_transfusion_id: null,
  blood_component: '',
  blood_type: '',
  bag_quantity: '',
  cross_match_result: '',
  status: '',
  notes: '',
}

export function BloodRequestItemListPage() {
  const resource = useBloodRequestItemResource()
  const title = humanizeModuleName('LayananBloodRequestItem')

  return (
    <CrudDialogPage<BloodRequestItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.blood_component ?? `#${item.id}`}
      resource={resource}
    />
  )
}
