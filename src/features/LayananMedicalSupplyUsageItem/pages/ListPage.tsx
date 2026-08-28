import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananMedicalSupplyUsageItemEndpoint, useMedicalSupplyUsageItemResource } from '../api'
import type { MedicalSupplyUsageItem } from '../types'

const columns: ColumnDef<MedicalSupplyUsageItem, unknown>[] = [
  {
    header: humanizeField('medical_supply_usage_id'),
    cell: ({ row }) => <RelationLabel endpoint="/medical-supply-usages" id={(row.original as unknown as Record<string, unknown>).medical_supply_usage_id as number | null} />,
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
  { key: 'medical_supply_usage_id', label: humanizeField('medical_supply_usage_id'), type: 'relation', relationEndpoint: '/medical-supply-usages', required: true },
  { key: 'item_id', label: humanizeField('item_id'), type: 'relation', relationEndpoint: '/items', required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit', label: humanizeField('unit') },
]

const emptyForm = {
  medical_supply_usage_id: null,
  item_id: null,
  quantity: '',
  unit: '',
}

const actions: WorkflowAction<MedicalSupplyUsageItem>[] = []

export function MedicalSupplyUsageItemListPage() {
  const resource = useMedicalSupplyUsageItemResource()
  const title = humanizeModuleName('LayananMedicalSupplyUsageItem')

  return (
    <WorkflowListPage<MedicalSupplyUsageItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananMedicalSupplyUsageItemEndpoint}
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
