import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRehabilitationProcedureExaminationItemResource } from '../api'
import type { RehabilitationProcedureExaminationItem } from '../types'

const columns: ColumnDef<RehabilitationProcedureExaminationItem, unknown>[] = [
  {
    header: humanizeField('rehabilitation_procedure_examination_id'),
    cell: ({ row }) => <RelationLabel endpoint="/rehab-procedure-examinations" id={(row.original as unknown as Record<string, unknown>).rehabilitation_procedure_examination_id as number | null} />,
  },
  {
    header: humanizeField('step_name'),
    accessorKey: 'step_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).step_name ?? '—'),
  },
  {
    header: humanizeField('duration_minutes'),
    accessorKey: 'duration_minutes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).duration_minutes ?? '—'),
  },
  {
    header: humanizeField('result'),
    accessorKey: 'result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result ?? '—'),
  },
  {
    header: humanizeField('sequence'),
    accessorKey: 'sequence',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sequence ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'rehabilitation_procedure_examination_id', label: humanizeField('rehabilitation_procedure_examination_id'), type: 'relation', relationEndpoint: '/rehab-procedure-examinations', required: true },
  { key: 'step_name', label: humanizeField('step_name'), required: true },
  { key: 'duration_minutes', label: humanizeField('duration_minutes'), type: 'number' },
  { key: 'result', label: humanizeField('result') },
  { key: 'sequence', label: humanizeField('sequence'), type: 'number' },
]

const emptyForm = {
  rehabilitation_procedure_examination_id: null,
  step_name: '',
  duration_minutes: '',
  result: '',
  sequence: '',
}

export function RehabilitationProcedureExaminationItemListPage() {
  const resource = useRehabilitationProcedureExaminationItemResource()
  const title = humanizeModuleName('MedicalRecordRehabilitationProcedureExaminationItem')

  return (
    <CrudDialogPage<RehabilitationProcedureExaminationItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.step_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
