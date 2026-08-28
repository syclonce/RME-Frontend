import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { BerkasKlaimPharmacyClaimItemEndpoint, usePharmacyClaimItemResource } from '../api'
import type { PharmacyClaimItem } from '../types'

const columns: ColumnDef<PharmacyClaimItem, unknown>[] = [
  {
    header: humanizeField('pharmacy_claim_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pharmacy-claims" id={(row.original as unknown as Record<string, unknown>).pharmacy_claim_id as number | null} />,
  },
  {
    header: humanizeField('drug_name'),
    accessorKey: 'drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).drug_name ?? '—'),
  },
  {
    header: humanizeField('quantity'),
    accessorKey: 'quantity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
  },
  {
    header: humanizeField('unit_price'),
    accessorKey: 'unit_price',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit_price ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'pharmacy_claim_id', label: humanizeField('pharmacy_claim_id'), type: 'relation', relationEndpoint: '/pharmacy-claims', required: true },
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'quantity', label: humanizeField('quantity'), type: 'number', required: true },
  { key: 'unit_price', label: humanizeField('unit_price'), type: 'number', required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
]

const emptyForm = {
  pharmacy_claim_id: null,
  drug_name: '',
  quantity: '',
  unit_price: '',
  amount: '',
}

const actions: WorkflowAction<PharmacyClaimItem>[] = []

export function PharmacyClaimItemListPage() {
  const resource = usePharmacyClaimItemResource()
  const title = humanizeModuleName('BerkasKlaimPharmacyClaimItem')

  return (
    <WorkflowListPage<PharmacyClaimItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={BerkasKlaimPharmacyClaimItemEndpoint}
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
