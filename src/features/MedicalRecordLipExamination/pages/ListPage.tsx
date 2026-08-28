import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLipExaminationResource } from '../api'
import type { LipExamination } from '../types'

const columns: ColumnDef<LipExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('color'),
    accessorKey: 'color',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).color ?? '—'),
  },
  {
    header: humanizeField('symmetry'),
    accessorKey: 'symmetry',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).symmetry ?? '—'),
  },
  {
    header: humanizeField('lesions'),
    accessorKey: 'lesions',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lesions ?? '—'),
  },
  {
    header: humanizeField('moisture'),
    accessorKey: 'moisture',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).moisture ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'color', label: humanizeField('color') },
  { key: 'symmetry', label: humanizeField('symmetry') },
  { key: 'lesions', label: humanizeField('lesions') },
  { key: 'moisture', label: humanizeField('moisture') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  color: '',
  symmetry: '',
  lesions: '',
  moisture: '',
  notes: '',
  examined_at: '',
}

export function LipExaminationListPage() {
  const resource = useLipExaminationResource()
  const title = humanizeModuleName('MedicalRecordLipExamination')

  return (
    <CrudDialogPage<LipExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.color ?? `#${item.id}`}
      resource={resource}
    />
  )
}
