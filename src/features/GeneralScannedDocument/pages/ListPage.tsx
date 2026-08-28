import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { GeneralScannedDocumentEndpoint, useGeneralScannedDocumentResource } from '../api'
import type { GeneralScannedDocument } from '../types'

const columns: ColumnDef<GeneralScannedDocument, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
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
    header: humanizeField('scanned_at'),
    accessorKey: 'scanned_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scanned_at ?? '—'),
  },
  {
    header: humanizeField('scanned_by'),
    accessorKey: 'scanned_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scanned_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number' },
  { key: 'document_type', label: humanizeField('document_type'), required: true },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'scanned_at', label: humanizeField('scanned_at'), type: 'date', required: true },
  { key: 'scanned_by', label: humanizeField('scanned_by'), type: 'number', required: true },
]

const emptyForm = {
  patient_id: '',
  document_type: '',
  file_path: '',
  scanned_at: '',
  scanned_by: '',
}

const actions: WorkflowAction<GeneralScannedDocument>[] = []

export function GeneralScannedDocumentListPage() {
  const resource = useGeneralScannedDocumentResource()
  const title = humanizeModuleName('GeneralScannedDocument')

  return (
    <WorkflowListPage<GeneralScannedDocument>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={GeneralScannedDocumentEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.document_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
