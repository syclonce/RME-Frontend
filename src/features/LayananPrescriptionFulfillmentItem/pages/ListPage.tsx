import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePrescriptionFulfillmentItemResource } from '../api'
import type { PrescriptionFulfillmentItem } from '../types'

const columns: ColumnDef<PrescriptionFulfillmentItem, unknown>[] = [
  {
    header: humanizeField('prescription_fulfillment_id'),
    cell: ({ row }) => <RelationLabel endpoint="/prescription-fulfillments" id={(row.original as unknown as Record<string, unknown>).prescription_fulfillment_id as number | null} />,
  },
  {
    header: humanizeField('prescription_item_id'),
    accessorKey: 'prescription_item_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_item_id ?? '—'),
  },
  {
    header: humanizeField('quantity_served'),
    accessorKey: 'quantity_served',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity_served ?? '—'),
  },
  {
    header: humanizeField('is_substituted'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_substituted ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_fulfillment_id', label: humanizeField('prescription_fulfillment_id'), type: 'relation', relationEndpoint: '/prescription-fulfillments', required: true },
  { key: 'prescription_item_id', label: humanizeField('prescription_item_id'), type: 'combobox', relationEndpoint: '/prescription-items', required: true },
  { key: 'quantity_served', label: humanizeField('quantity_served'), type: 'number', required: true },
  { key: 'is_substituted', label: humanizeField('is_substituted'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  prescription_fulfillment_id: null,
  prescription_item_id: null,
  quantity_served: '',
  is_substituted: false,
  notes: '',
}

export function PrescriptionFulfillmentItemListPage() {
  const resource = usePrescriptionFulfillmentItemResource()
  const title = humanizeModuleName('LayananPrescriptionFulfillmentItem')

  return (
    <CrudDialogPage<PrescriptionFulfillmentItem>
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
