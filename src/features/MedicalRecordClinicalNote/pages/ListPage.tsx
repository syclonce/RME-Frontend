import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordClinicalNoteEndpoint, useClinicalNoteResource } from '../api'
import type { ClinicalNote } from '../types'

const columns: ColumnDef<ClinicalNote, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
  {
    header: humanizeField('subjective'),
    accessorKey: 'subjective',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).subjective ?? '—'),
  },
  {
    header: humanizeField('objective'),
    accessorKey: 'objective',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).objective ?? '—'),
  },
  {
    header: humanizeField('assessment'),
    accessorKey: 'assessment',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessment ?? '—'),
  },
  {
    header: humanizeField('planning'),
    accessorKey: 'planning',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).planning ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', section: 'Detail' },
  { key: 'subjective', label: humanizeField('subjective'), section: 'Detail' },
  { key: 'objective', label: humanizeField('objective'), section: 'Detail' },
  { key: 'assessment', label: humanizeField('assessment'), section: 'Detail' },
  { key: 'planning', label: humanizeField('planning'), section: 'Detail' },
  { key: 'instructions', label: humanizeField('instructions'), section: 'Detail Tambahan' },
  { key: 'note_type', label: humanizeField('note_type'), section: 'Detail Tambahan' },
  { key: 'author_id', label: humanizeField('author_id'), type: 'number', required: true, section: 'Detail Tambahan' },
  { key: 'sub_division', label: humanizeField('sub_division'), section: 'Detail Tambahan' },
  { key: 'has_discharge_plan', label: humanizeField('has_discharge_plan'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'discharge_plan_date', label: humanizeField('discharge_plan_date'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: '',
  recorded_at: '',
  subjective: '',
  objective: '',
  assessment: '',
  planning: '',
  instructions: '',
  note_type: '',
  author_id: '',
  sub_division: '',
  has_discharge_plan: false,
  discharge_plan_date: '',
}

const actions: WorkflowAction<ClinicalNote>[] = []

export function ClinicalNoteListPage() {
  const resource = useClinicalNoteResource()
  const title = humanizeModuleName('MedicalRecordClinicalNote')

  return (
    <WorkflowListPage<ClinicalNote>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordClinicalNoteEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.subjective ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
