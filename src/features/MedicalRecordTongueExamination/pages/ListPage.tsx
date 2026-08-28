import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTongueExaminationResource } from '../api'
import type { TongueExamination } from '../types'

const columns: ColumnDef<TongueExamination, unknown>[] = [
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
    header: humanizeField('coating'),
    accessorKey: 'coating',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).coating ?? '—'),
  },
  {
    header: humanizeField('moisture'),
    accessorKey: 'moisture',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).moisture ?? '—'),
  },
  {
    header: humanizeField('lesions'),
    accessorKey: 'lesions',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lesions ?? '—'),
  },
  {
    header: humanizeField('movement'),
    accessorKey: 'movement',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).movement ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'color', label: humanizeField('color') },
  { key: 'coating', label: humanizeField('coating') },
  { key: 'moisture', label: humanizeField('moisture') },
  { key: 'lesions', label: humanizeField('lesions') },
  { key: 'movement', label: humanizeField('movement') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  color: '',
  coating: '',
  moisture: '',
  lesions: '',
  movement: '',
  findings: '',
  examined_at: '',
}

export function TongueExaminationListPage() {
  const resource = useTongueExaminationResource()
  const title = humanizeModuleName('MedicalRecordTongueExamination')

  return (
    <CrudDialogPage<TongueExamination>
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
