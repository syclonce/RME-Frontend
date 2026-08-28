import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEarExaminationResource } from '../api'
import type { EarExamination } from '../types'

const columns: ColumnDef<EarExamination, unknown>[] = [
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
    header: humanizeField('otoscopy'),
    accessorKey: 'otoscopy',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).otoscopy ?? '—'),
  },
  {
    header: humanizeField('tympanic_membrane'),
    accessorKey: 'tympanic_membrane',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).tympanic_membrane ?? '—'),
  },
  {
    header: humanizeField('hearing_test_result'),
    accessorKey: 'hearing_test_result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).hearing_test_result ?? '—'),
  },
  {
    header: humanizeField('discharge'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).discharge ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'side', label: humanizeField('side'), type: 'select', options: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"bilateral","label":"Bilateral"}] },
  { key: 'otoscopy', label: humanizeField('otoscopy') },
  { key: 'tympanic_membrane', label: humanizeField('tympanic_membrane') },
  { key: 'hearing_test_result', label: humanizeField('hearing_test_result') },
  { key: 'discharge', label: humanizeField('discharge'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  side: '',
  otoscopy: '',
  tympanic_membrane: '',
  hearing_test_result: '',
  discharge: false,
  findings: '',
  examined_at: '',
}

export function EarExaminationListPage() {
  const resource = useEarExaminationResource()
  const title = humanizeModuleName('MedicalRecordEarExamination')

  return (
    <CrudDialogPage<EarExamination>
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
