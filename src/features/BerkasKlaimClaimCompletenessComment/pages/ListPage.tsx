import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBerkasKlaimClaimCompletenessCommentResource } from '../api'
import type { BerkasKlaimClaimCompletenessComment } from '../types'

const columns: ColumnDef<BerkasKlaimClaimCompletenessComment, unknown>[] = [
  {
    header: humanizeField('claim_completeness_id'),
    cell: ({ row }) => <RelationLabel endpoint="/claim-completeness" id={(row.original as unknown as Record<string, unknown>).claim_completeness_id as number | null} />,
  },
  {
    header: humanizeField('comment'),
    accessorKey: 'comment',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).comment ?? '—'),
  },
  {
    header: humanizeField('commented_by'),
    accessorKey: 'commented_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).commented_by ?? '—'),
  },
  {
    header: humanizeField('commented_at'),
    accessorKey: 'commented_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).commented_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'claim_completeness_id', label: humanizeField('claim_completeness_id'), type: 'relation', relationEndpoint: '/claim-completeness', required: true },
  { key: 'comment', label: humanizeField('comment'), required: true },
  { key: 'commented_by', label: humanizeField('commented_by') },
  { key: 'commented_at', label: humanizeField('commented_at'), type: 'date' },
]

const emptyForm = {
  claim_completeness_id: null,
  comment: '',
  commented_by: '',
  commented_at: '',
}

export function BerkasKlaimClaimCompletenessCommentListPage() {
  const resource = useBerkasKlaimClaimCompletenessCommentResource()
  const title = humanizeModuleName('BerkasKlaimClaimCompletenessComment')

  return (
    <CrudDialogPage<BerkasKlaimClaimCompletenessComment>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.comment ?? `#${item.id}`}
      resource={resource}
    />
  )
}
