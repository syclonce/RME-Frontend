import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBreastExaminationResource } from '../api'
import type { BreastExamination } from '../types'

const columns: ColumnDef<BreastExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('side'),
    accessorKey: 'side',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).side ?? '—'),
  },
  {
    header: humanizeField('inspection'),
    accessorKey: 'inspection',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).inspection ?? '—'),
  },
  {
    header: humanizeField('palpation'),
    accessorKey: 'palpation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).palpation ?? '—'),
  },
  {
    header: humanizeField('lump_present'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).lump_present ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('nipple_discharge'),
    accessorKey: 'nipple_discharge',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).nipple_discharge ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'side', label: humanizeField('side'), type: 'select', options: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"bilateral","label":"Bilateral"}] },
  { key: 'inspection', label: humanizeField('inspection') },
  { key: 'palpation', label: humanizeField('palpation') },
  { key: 'lump_present', label: humanizeField('lump_present'), type: 'checkbox' },
  { key: 'nipple_discharge', label: humanizeField('nipple_discharge') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  side: '',
  inspection: '',
  palpation: '',
  lump_present: false,
  nipple_discharge: '',
  findings: '',
  examined_at: '',
}

export function BreastExaminationListPage() {
  const resource = useBreastExaminationResource()
  const title = humanizeModuleName('MedicalRecordBreastExamination')

  return (
    <CrudDialogPage<BreastExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.side ?? `#${item.id}`}
      resource={resource}
    />
  )
}
