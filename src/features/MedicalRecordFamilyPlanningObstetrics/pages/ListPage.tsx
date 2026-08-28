import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFamilyPlanningObstetricsResource } from '../api'
import type { FamilyPlanningObstetrics } from '../types'

const columns: ColumnDef<FamilyPlanningObstetrics, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('contraceptive_method'),
    accessorKey: 'contraceptive_method',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contraceptive_method ?? '—'),
  },
  {
    header: humanizeField('installation_date'),
    accessorKey: 'installation_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).installation_date ?? '—'),
  },
  {
    header: humanizeField('removal_date'),
    accessorKey: 'removal_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).removal_date ?? '—'),
  },
  {
    header: humanizeField('side_effects'),
    accessorKey: 'side_effects',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).side_effects ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'contraceptive_method', label: humanizeField('contraceptive_method'), required: true },
  { key: 'installation_date', label: humanizeField('installation_date'), type: 'date' },
  { key: 'removal_date', label: humanizeField('removal_date'), type: 'date' },
  { key: 'side_effects', label: humanizeField('side_effects') },
  { key: 'action_taken', label: humanizeField('action_taken') },
  { key: 'next_visit_date', label: humanizeField('next_visit_date'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  contraceptive_method: '',
  installation_date: '',
  removal_date: '',
  side_effects: '',
  action_taken: '',
  next_visit_date: '',
}

export function FamilyPlanningObstetricsListPage() {
  const resource = useFamilyPlanningObstetricsResource()
  const title = humanizeModuleName('MedicalRecordFamilyPlanningObstetrics')

  return (
    <CrudDialogPage<FamilyPlanningObstetrics>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.contraceptive_method ?? `#${item.id}`}
      resource={resource}
    />
  )
}
