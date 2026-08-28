import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRehabilitationProcedureExaminationResource } from '../api'
import type { RehabilitationProcedureExamination } from '../types'

const columns: ColumnDef<RehabilitationProcedureExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('procedure_name'),
    accessorKey: 'procedure_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_name ?? '—'),
  },
  {
    header: humanizeField('therapist_id'),
    accessorKey: 'therapist_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).therapist_id ?? '—'),
  },
  {
    header: humanizeField('diagnosis_summary'),
    accessorKey: 'diagnosis_summary',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis_summary ?? '—'),
  },
  {
    header: humanizeField('functional_goal'),
    accessorKey: 'functional_goal',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).functional_goal ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'procedure_name', label: humanizeField('procedure_name'), required: true },
  { key: 'therapist_id', label: humanizeField('therapist_id'), type: 'number' },
  { key: 'diagnosis_summary', label: humanizeField('diagnosis_summary') },
  { key: 'functional_goal', label: humanizeField('functional_goal') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  procedure_name: '',
  therapist_id: '',
  diagnosis_summary: '',
  functional_goal: '',
  notes: '',
  examined_at: '',
}

export function RehabilitationProcedureExaminationListPage() {
  const resource = useRehabilitationProcedureExaminationResource()
  const title = humanizeModuleName('MedicalRecordRehabilitationProcedureExamination')

  return (
    <CrudDialogPage<RehabilitationProcedureExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.procedure_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
