import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBerkasKlaimSupportingDocumentResource } from '../api'
import type { BerkasKlaimSupportingDocument } from '../types'

const columns: ColumnDef<BerkasKlaimSupportingDocument, unknown>[] = [
  {
    header: humanizeField('claim_file_id'),
    cell: ({ row }) => <RelationLabel endpoint="/claim-files" id={(row.original as unknown as Record<string, unknown>).claim_file_id as number | null} />,
  },
  {
    header: humanizeField('document_type'),
    accessorKey: 'document_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).document_type ?? '—'),
  },
  {
    header: humanizeField('file_path'),
    accessorKey: 'file_path',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).file_path ?? '—'),
  },
  {
    header: humanizeField('uploaded_at'),
    accessorKey: 'uploaded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).uploaded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'claim_file_id', label: humanizeField('claim_file_id'), type: 'relation', relationEndpoint: '/claim-files', required: true },
  { key: 'document_type', label: humanizeField('document_type'), required: true },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'uploaded_at', label: humanizeField('uploaded_at'), type: 'date' },
]

const emptyForm = {
  claim_file_id: null,
  document_type: '',
  file_path: '',
  uploaded_at: '',
}

export function BerkasKlaimSupportingDocumentListPage() {
  const resource = useBerkasKlaimSupportingDocumentResource()
  const title = humanizeModuleName('BerkasKlaimSupportingDocument')

  return (
    <CrudDialogPage<BerkasKlaimSupportingDocument>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.document_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
