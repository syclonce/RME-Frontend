import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGenitalExaminationResource } from '../api'
import type { GenitalExamination } from '../types'

const columns: ColumnDef<GenitalExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('external_genitalia'),
    accessorKey: 'external_genitalia',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).external_genitalia ?? '—'),
  },
  {
    header: humanizeField('discharge_characteristics'),
    accessorKey: 'discharge_characteristics',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).discharge_characteristics ?? '—'),
  },
  {
    header: humanizeField('lesions_or_masses'),
    accessorKey: 'lesions_or_masses',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lesions_or_masses ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'external_genitalia', label: humanizeField('external_genitalia') },
  { key: 'discharge_characteristics', label: humanizeField('discharge_characteristics') },
  { key: 'lesions_or_masses', label: humanizeField('lesions_or_masses') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  external_genitalia: '',
  discharge_characteristics: '',
  lesions_or_masses: '',
  notes: '',
  examined_at: '',
}

export function GenitalExaminationListPage() {
  const resource = useGenitalExaminationResource()
  const title = humanizeModuleName('MedicalRecordGenitalExamination')

  return (
    <CrudDialogPage<GenitalExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.external_genitalia ?? `#${item.id}`}
      resource={resource}
    />
  )
}
