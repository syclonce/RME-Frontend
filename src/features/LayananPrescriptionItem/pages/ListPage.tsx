import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPrescriptionItemEndpoint, usePrescriptionItemResource } from '../api'
import type { PrescriptionItem } from '../types'

const columns: ColumnDef<PrescriptionItem, unknown>[] = [
  {
    header: humanizeField('prescription_id'),
    accessorKey: 'prescription_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('drug_name'),
    accessorKey: 'drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).drug_name ?? '—'),
  },
  {
    header: humanizeField('dosage'),
    accessorKey: 'dosage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dosage ?? '—'),
  },
  {
    header: humanizeField('frequency'),
    accessorKey: 'frequency',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).frequency ?? '—'),
  },
  {
    header: humanizeField('route'),
    accessorKey: 'route',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).route ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'number', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items' },
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'dosage', label: humanizeField('dosage'), required: true },
  { key: 'frequency', label: humanizeField('frequency'), required: true },
  { key: 'route', label: humanizeField('route') },
  { key: 'duration', label: humanizeField('duration') },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  prescription_id: '',
  item_id: null,
  drug_name: '',
  dosage: '',
  frequency: '',
  route: '',
  duration: '',
  quantity: '',
  notes: '',
}

const actions: WorkflowAction<PrescriptionItem>[] = []

export function PrescriptionItemListPage() {
  const resource = usePrescriptionItemResource()
  const title = humanizeModuleName('LayananPrescriptionItem')

  return (
    <WorkflowListPage<PrescriptionItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPrescriptionItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.drug_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
