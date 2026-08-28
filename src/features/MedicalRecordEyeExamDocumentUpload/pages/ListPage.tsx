import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEyeExamDocumentUploadResource } from '../api'
import type { EyeExamDocumentUpload } from '../types'

const columns: ColumnDef<EyeExamDocumentUpload, unknown>[] = [
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
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('exam_date'),
    accessorKey: 'exam_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).exam_date ?? '—'),
  },
  {
    header: humanizeField('file_path'),
    accessorKey: 'file_path',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).file_path ?? '—'),
  },
  {
    header: humanizeField('eye_side'),
    accessorKey: 'eye_side',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).eye_side ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors' },
  { key: 'exam_date', label: humanizeField('exam_date'), type: 'date', required: true },
  { key: 'file_path', label: humanizeField('file_path'), required: true },
  { key: 'eye_side', label: humanizeField('eye_side') },
  { key: 'findings', label: humanizeField('findings') },
]

const emptyForm = {
  patient_id: '',
  visit_id: '',
  doctor_id: null,
  exam_date: '',
  file_path: '',
  eye_side: '',
  findings: '',
}

export function EyeExamDocumentUploadListPage() {
  const resource = useEyeExamDocumentUploadResource()
  const title = humanizeModuleName('MedicalRecordEyeExamDocumentUpload')

  return (
    <CrudDialogPage<EyeExamDocumentUpload>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.file_path ?? `#${item.id}`}
      resource={resource}
    />
  )
}
