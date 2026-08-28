import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEmgExaminationResource } from '../api'
import type { EmgExamination } from '../types'

const columns: ColumnDef<EmgExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('nerve_conduction_velocity'),
    accessorKey: 'nerve_conduction_velocity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nerve_conduction_velocity ?? '—'),
  },
  {
    header: humanizeField('spontaneous_activity'),
    accessorKey: 'spontaneous_activity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).spontaneous_activity ?? '—'),
  },
  {
    header: humanizeField('motor_unit_potentials'),
    accessorKey: 'motor_unit_potentials',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).motor_unit_potentials ?? '—'),
  },
  {
    header: humanizeField('recruitment_pattern'),
    accessorKey: 'recruitment_pattern',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recruitment_pattern ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'nerve_conduction_velocity', label: humanizeField('nerve_conduction_velocity'), type: 'number' },
  { key: 'spontaneous_activity', label: humanizeField('spontaneous_activity') },
  { key: 'motor_unit_potentials', label: humanizeField('motor_unit_potentials') },
  { key: 'recruitment_pattern', label: humanizeField('recruitment_pattern') },
  { key: 'conclusion', label: humanizeField('conclusion') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  nerve_conduction_velocity: '',
  spontaneous_activity: '',
  motor_unit_potentials: '',
  recruitment_pattern: '',
  conclusion: '',
  examined_at: '',
}

export function EmgExaminationListPage() {
  const resource = useEmgExaminationResource()
  const title = humanizeModuleName('MedicalRecordEmgExamination')

  return (
    <CrudDialogPage<EmgExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.spontaneous_activity ?? `#${item.id}`}
      resource={resource}
    />
  )
}
