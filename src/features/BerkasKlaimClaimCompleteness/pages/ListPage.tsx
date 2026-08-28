import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBerkasKlaimClaimCompletenessResource } from '../api'
import type { BerkasKlaimClaimCompleteness } from '../types'

const columns: ColumnDef<BerkasKlaimClaimCompleteness, unknown>[] = [
  {
    header: humanizeField('claim_file_id'),
    cell: ({ row }) => <RelationLabel endpoint="/claim-files" id={(row.original as unknown as Record<string, unknown>).claim_file_id as number | null} />,
  },
  {
    header: humanizeField('checklist_item'),
    accessorKey: 'checklist_item',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).checklist_item ?? '—'),
  },
  {
    header: humanizeField('is_complete'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_complete ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('checked_by'),
    accessorKey: 'checked_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).checked_by ?? '—'),
  },
  {
    header: humanizeField('checked_at'),
    accessorKey: 'checked_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).checked_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'claim_file_id', label: humanizeField('claim_file_id'), type: 'relation', relationEndpoint: '/claim-files', required: true },
  { key: 'checklist_item', label: humanizeField('checklist_item'), required: true },
  { key: 'is_complete', label: humanizeField('is_complete'), type: 'checkbox' },
  { key: 'checked_by', label: humanizeField('checked_by') },
  { key: 'checked_at', label: humanizeField('checked_at'), type: 'date' },
]

const emptyForm = {
  claim_file_id: null,
  checklist_item: '',
  is_complete: false,
  checked_by: '',
  checked_at: '',
}

export function BerkasKlaimClaimCompletenessListPage() {
  const resource = useBerkasKlaimClaimCompletenessResource()
  const title = humanizeModuleName('BerkasKlaimClaimCompleteness')

  return (
    <CrudDialogPage<BerkasKlaimClaimCompleteness>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.checklist_item ?? `#${item.id}`}
      resource={resource}
    />
  )
}
