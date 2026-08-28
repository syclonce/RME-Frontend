import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useClinicalNoteCoManagementResource } from '../api'
import type { ClinicalNoteCoManagement } from '../types'

const columns: ColumnDef<ClinicalNoteCoManagement, unknown>[] = [
  {
    header: humanizeField('clinical_note_id'),
    cell: ({ row }) => <RelationLabel endpoint="/clinical-notes" id={(row.original as unknown as Record<string, unknown>).clinical_note_id as number | null} />,
  },
  {
    header: humanizeField('medical_department_id'),
    cell: ({ row }) => <RelationLabel endpoint="/medical-departments" id={(row.original as unknown as Record<string, unknown>).medical_department_id as number | null} />,
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
  {
    header: humanizeField('author_id'),
    accessorKey: 'author_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).author_id ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'clinical_note_id', label: humanizeField('clinical_note_id'), type: 'relation', relationEndpoint: '/clinical-notes', required: true },
  { key: 'medical_department_id', label: humanizeField('medical_department_id'), type: 'relation', relationEndpoint: '/medical-departments', required: true },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'author_id', label: humanizeField('author_id'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  clinical_note_id: null,
  medical_department_id: null,
  notes: '',
  author_id: '',
  recorded_at: '',
}

export function ClinicalNoteCoManagementListPage() {
  const resource = useClinicalNoteCoManagementResource()
  const title = humanizeModuleName('MedicalRecordClinicalNoteCoManagement')

  return (
    <CrudDialogPage<ClinicalNoteCoManagement>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.notes ?? `#${item.id}`}
      resource={resource}
    />
  )
}
