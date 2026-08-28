import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { BerkasKlaimPathologyClaimItemEndpoint, usePathologyClaimItemResource } from '../api'
import type { PathologyClaimItem } from '../types'

const columns: ColumnDef<PathologyClaimItem, unknown>[] = [
  {
    header: humanizeField('pathology_claim_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pathology-claims" id={(row.original as unknown as Record<string, unknown>).pathology_claim_id as number | null} />,
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
  { key: 'pathology_claim_id', label: humanizeField('pathology_claim_id'), type: 'relation', relationEndpoint: '/pathology-claims', required: true },
  { key: 'exam_name', label: humanizeField('exam_name'), required: true },
  { key: 'amount', label: humanizeField('amount'), type: 'number', required: true },
]

const emptyForm = {
  pathology_claim_id: null,
  exam_name: '',
  amount: '',
}

const actions: WorkflowAction<PathologyClaimItem>[] = []

export function PathologyClaimItemListPage() {
  const resource = usePathologyClaimItemResource()
  const title = humanizeModuleName('BerkasKlaimPathologyClaimItem')

  return (
    <WorkflowListPage<PathologyClaimItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={BerkasKlaimPathologyClaimItemEndpoint}
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
