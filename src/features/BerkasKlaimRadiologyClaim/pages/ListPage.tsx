import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { BerkasKlaimRadiologyClaimEndpoint, useRadiologyClaimResource } from '../api'
import type { RadiologyClaim } from '../types'

const columns: ColumnDef<RadiologyClaim, unknown>[] = [
  {
    header: humanizeField('claim_file_id'),
    cell: ({ row }) => <RelationLabel endpoint="/claim-files" id={(row.original as unknown as Record<string, unknown>).claim_file_id as number | null} />,
  },
  {
    header: humanizeField('order_id'),
    accessorKey: 'order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).order_id ?? '—'),
  },
  {
    header: humanizeField('submitted_at'),
    accessorKey: 'submitted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).submitted_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'claim_file_id', label: humanizeField('claim_file_id'), type: 'relation', relationEndpoint: '/claim-files', required: true },
  { key: 'order_id', label: humanizeField('order_id'), type: 'number' },
  { key: 'submitted_at', label: humanizeField('submitted_at'), type: 'date' },
]

const emptyForm = {
  claim_file_id: null,
  order_id: '',
  submitted_at: '',
}

const actions: WorkflowAction<RadiologyClaim>[] = []

export function RadiologyClaimListPage() {
  const resource = useRadiologyClaimResource()
  const title = humanizeModuleName('BerkasKlaimRadiologyClaim')

  return (
    <WorkflowListPage<RadiologyClaim>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={BerkasKlaimRadiologyClaimEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
