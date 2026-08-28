import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useHandJointExaminationResource } from '../api'
import type { HandJointExamination } from '../types'

const columns: ColumnDef<HandJointExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('joint'),
    accessorKey: 'joint',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).joint ?? '—'),
  },
  {
    header: humanizeField('range_of_motion'),
    accessorKey: 'range_of_motion',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).range_of_motion ?? '—'),
  },
  {
    header: humanizeField('swelling'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).swelling ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('tenderness'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).tenderness ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('deformity'),
    accessorKey: 'deformity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).deformity ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'joint', label: humanizeField('joint'), type: 'select', options: [{"value":"wrist","label":"Wrist"},{"value":"finger","label":"Finger"},{"value":"elbow","label":"Elbow"}] },
  { key: 'range_of_motion', label: humanizeField('range_of_motion') },
  { key: 'swelling', label: humanizeField('swelling'), type: 'checkbox' },
  { key: 'tenderness', label: humanizeField('tenderness'), type: 'checkbox' },
  { key: 'deformity', label: humanizeField('deformity') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  joint: '',
  range_of_motion: '',
  swelling: false,
  tenderness: false,
  deformity: '',
  findings: '',
  examined_at: '',
}

export function HandJointExaminationListPage() {
  const resource = useHandJointExaminationResource()
  const title = humanizeModuleName('MedicalRecordHandJointExamination')

  return (
    <CrudDialogPage<HandJointExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.joint ?? `#${item.id}`}
      resource={resource}
    />
  )
}
