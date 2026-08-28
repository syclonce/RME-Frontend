import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDocumentUploadResource } from '../api'
import type { DocumentUpload } from '../types'

const columns: ColumnDef<DocumentUpload, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('document_name'),
    accessorKey: 'document_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).document_name ?? '—'),
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
    header: humanizeField('file_size_bytes'),
    accessorKey: 'file_size_bytes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).file_size_bytes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits' },
  { key: 'document_name', label: humanizeField('document_name'), required: true },
  { key: 'document_type', label: humanizeField('document_type') },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'file_size_bytes', label: humanizeField('file_size_bytes'), type: 'number' },
  { key: 'uploaded_at', label: humanizeField('uploaded_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  document_name: '',
  document_type: '',
  file_path: '',
  file_size_bytes: '',
  uploaded_at: '',
  notes: '',
}

export function DocumentUploadListPage() {
  const resource = useDocumentUploadResource()
  const title = humanizeModuleName('MedicalRecordDocumentUpload')

  return (
    <CrudDialogPage<DocumentUpload>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.document_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
