import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBloodTransfusionDetailResource } from '../api'
import type { BloodTransfusionDetail } from '../types'

const columns: ColumnDef<BloodTransfusionDetail, unknown>[] = [
  {
    header: humanizeField('transfusion_id'),
    cell: ({ row }) => <RelationLabel endpoint="/blood-transfusions" id={(row.original as unknown as Record<string, unknown>).transfusion_id as number | null} />,
  },
  {
    header: humanizeField('blood_bag_number'),
    accessorKey: 'blood_bag_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_bag_number ?? '—'),
  },
  {
    header: humanizeField('blood_type'),
    accessorKey: 'blood_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_type ?? '—'),
  },
  {
    header: humanizeField('volume_ml'),
    accessorKey: 'volume_ml',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).volume_ml ?? '—'),
  },
  {
    header: humanizeField('start_time'),
    accessorKey: 'start_time',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).start_time ?? '—'),
  },
  {
    header: humanizeField('end_time'),
    accessorKey: 'end_time',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).end_time ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'transfusion_id', label: humanizeField('transfusion_id'), type: 'relation', relationEndpoint: '/blood-transfusions', required: true },
  { key: 'blood_bag_number', label: humanizeField('blood_bag_number'), required: true },
  { key: 'blood_type', label: humanizeField('blood_type') },
  { key: 'volume_ml', label: humanizeField('volume_ml'), type: 'number', required: true },
  { key: 'start_time', label: humanizeField('start_time'), type: 'date' },
  { key: 'end_time', label: humanizeField('end_time'), type: 'date' },
  { key: 'reaction_observed', label: humanizeField('reaction_observed') },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  transfusion_id: null,
  blood_bag_number: '',
  blood_type: '',
  volume_ml: '',
  start_time: '',
  end_time: '',
  reaction_observed: '',
  status: '',
}

export function BloodTransfusionDetailListPage() {
  const resource = useBloodTransfusionDetailResource()
  const title = humanizeModuleName('MedicalRecordBloodTransfusionDetail')

  return (
    <CrudDialogPage<BloodTransfusionDetail>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.blood_bag_number ?? `#${item.id}`}
      resource={resource}
    />
  )
}
