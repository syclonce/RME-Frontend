import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNoseExaminationResource } from '../api'
import type { NoseExamination } from '../types'

const columns: ColumnDef<NoseExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('deformity'),
    accessorKey: 'deformity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).deformity ?? '—'),
  },
  {
    header: humanizeField('septum_deviation'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).septum_deviation ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('turbinate_hypertrophy'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).turbinate_hypertrophy ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('nasal_discharge'),
    accessorKey: 'nasal_discharge',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nasal_discharge ?? '—'),
  },
  {
    header: humanizeField('polyp_present'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).polyp_present ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'deformity', label: humanizeField('deformity') },
  { key: 'septum_deviation', label: humanizeField('septum_deviation'), type: 'checkbox' },
  { key: 'turbinate_hypertrophy', label: humanizeField('turbinate_hypertrophy'), type: 'checkbox' },
  { key: 'nasal_discharge', label: humanizeField('nasal_discharge') },
  { key: 'polyp_present', label: humanizeField('polyp_present'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  deformity: '',
  septum_deviation: false,
  turbinate_hypertrophy: false,
  nasal_discharge: '',
  polyp_present: false,
  notes: '',
  examined_at: '',
}

export function NoseExaminationListPage() {
  const resource = useNoseExaminationResource()
  const title = humanizeModuleName('MedicalRecordNoseExamination')

  return (
    <CrudDialogPage<NoseExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.deformity ?? `#${item.id}`}
      resource={resource}
    />
  )
}
