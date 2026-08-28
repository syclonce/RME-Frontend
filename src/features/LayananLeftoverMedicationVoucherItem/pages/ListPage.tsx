import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLeftoverMedicationVoucherItemEndpoint, useLeftoverMedicationVoucherItemResource } from '../api'
import type { LeftoverMedicationVoucherItem } from '../types'

const columns: ColumnDef<LeftoverMedicationVoucherItem, unknown>[] = [
  {
    header: humanizeField('leftover_medication_voucher_id'),
    cell: ({ row }) => <RelationLabel endpoint="/leftover-medication-vouchers" id={(row.original as unknown as Record<string, unknown>).leftover_medication_voucher_id as number | null} />,
  },
  {
    header: humanizeField('item_id'),
    cell: ({ row }) => <RelationLabel endpoint="/items" id={(row.original as unknown as Record<string, unknown>).item_id as number | null} />,
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'leftover_medication_voucher_id', label: humanizeField('leftover_medication_voucher_id'), type: 'relation', relationEndpoint: '/leftover-medication-vouchers', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit', label: humanizeField('unit') },
]

const emptyForm = {
  leftover_medication_voucher_id: null,
  item_id: null,
  quantity: '',
  unit: '',
}

const actions: WorkflowAction<LeftoverMedicationVoucherItem>[] = []

export function LeftoverMedicationVoucherItemListPage() {
  const resource = useLeftoverMedicationVoucherItemResource()
  const title = humanizeModuleName('LayananLeftoverMedicationVoucherItem')

  return (
    <WorkflowListPage<LeftoverMedicationVoucherItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLeftoverMedicationVoucherItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.unit ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
