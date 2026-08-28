import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { BerkasKlaimRadiologyClaimItemEndpoint, useRadiologyClaimItemResource } from '../api'
import type { RadiologyClaimItem } from '../types'

const columns: ColumnDef<RadiologyClaimItem, unknown>[] = [
  {
    header: humanizeField('radiology_claim_id'),
    cell: ({ row }) => <RelationLabel endpoint="/radiology-claims" id={(row.original as unknown as Record<string, unknown>).radiology_claim_id as number | null} />,
  },
  {
    header: humanizeField('exam_name'),
    accessorKey: 'exam_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).exam_name ?? '—'),
  },
  {
    header: humanizeField('amount'),
    accessorKey: 'amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).amount ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'radiology_claim_id', label: humanizeField('radiology_claim_id'), type: 'relation', relationEndpoint: '/radiology-claims', required: true },
  { key: 'exam_name', label: humanizeField('exam_name'), required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
]

const emptyForm = {
  radiology_claim_id: null,
  exam_name: '',
  amount: '',
}

const actions: WorkflowAction<RadiologyClaimItem>[] = []

export function RadiologyClaimItemListPage() {
  const resource = useRadiologyClaimItemResource()
  const title = humanizeModuleName('BerkasKlaimRadiologyClaimItem')

  return (
    <WorkflowListPage<RadiologyClaimItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={BerkasKlaimRadiologyClaimItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.exam_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
