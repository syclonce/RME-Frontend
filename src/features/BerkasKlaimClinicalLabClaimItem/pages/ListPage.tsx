import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { BerkasKlaimClinicalLabClaimItemEndpoint, useClinicalLabClaimItemResource } from '../api'
import type { ClinicalLabClaimItem } from '../types'

const columns: ColumnDef<ClinicalLabClaimItem, unknown>[] = [
  {
    header: humanizeField('clinical_lab_claim_id'),
    cell: ({ row }) => <RelationLabel endpoint="/clinical-lab-claims" id={(row.original as unknown as Record<string, unknown>).clinical_lab_claim_id as number | null} />,
  },
  {
    header: humanizeField('test_name'),
    accessorKey: 'test_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_name ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'clinical_lab_claim_id', label: humanizeField('clinical_lab_claim_id'), type: 'relation', relationEndpoint: '/clinical-lab-claims', required: true },
  { key: 'test_name', label: humanizeField('test_name'), required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
]

const emptyForm = {
  clinical_lab_claim_id: null,
  test_name: '',
  amount: '',
}

const actions: WorkflowAction<ClinicalLabClaimItem>[] = []

export function ClinicalLabClaimItemListPage() {
  const resource = useClinicalLabClaimItemResource()
  const title = humanizeModuleName('BerkasKlaimClinicalLabClaimItem')

  return (
    <WorkflowListPage<ClinicalLabClaimItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={BerkasKlaimClinicalLabClaimItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
