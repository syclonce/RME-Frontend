import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEyeExaminationResource } from '../api'
import type { EyeExamination } from '../types'

const columns: ColumnDef<EyeExamination, unknown>[] = [
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
    header: humanizeField('visual_acuity'),
    accessorKey: 'visual_acuity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visual_acuity ?? '—'),
  },
  {
    header: humanizeField('pupil_size_mm'),
    accessorKey: 'pupil_size_mm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pupil_size_mm ?? '—'),
  },
  {
    header: humanizeField('pupil_reflex'),
    accessorKey: 'pupil_reflex',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pupil_reflex ?? '—'),
  },
  {
    header: humanizeField('conjunctiva'),
    accessorKey: 'conjunctiva',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).conjunctiva ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'side', label: humanizeField('side'), type: 'select', options: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"bilateral","label":"Bilateral"}] },
  { key: 'visual_acuity', label: humanizeField('visual_acuity') },
  { key: 'pupil_size_mm', label: humanizeField('pupil_size_mm'), type: 'number' },
  { key: 'pupil_reflex', label: humanizeField('pupil_reflex') },
  { key: 'conjunctiva', label: humanizeField('conjunctiva') },
  { key: 'sclera', label: humanizeField('sclera') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  side: '',
  visual_acuity: '',
  pupil_size_mm: '',
  pupil_reflex: '',
  conjunctiva: '',
  sclera: '',
  findings: '',
  examined_at: '',
}

export function EyeExaminationListPage() {
  const resource = useEyeExaminationResource()
  const title = humanizeModuleName('MedicalRecordEyeExamination')

  return (
    <CrudDialogPage<EyeExamination>
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
