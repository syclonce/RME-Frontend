import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useToeExaminationResource } from '../api'
import type { ToeExamination } from '../types'

const columns: ColumnDef<ToeExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('foot_side'),
    accessorKey: 'foot_side',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).foot_side ?? '—'),
  },
  {
    header: humanizeField('deformity'),
    accessorKey: 'deformity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).deformity ?? '—'),
  },
  {
    header: humanizeField('ulceration'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).ulceration ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('capillary_refill_seconds'),
    accessorKey: 'capillary_refill_seconds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).capillary_refill_seconds ?? '—'),
  },
  {
    header: humanizeField('sensation_monofilament'),
    accessorKey: 'sensation_monofilament',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensation_monofilament ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'foot_side', label: humanizeField('foot_side') },
  { key: 'deformity', label: humanizeField('deformity') },
  { key: 'ulceration', label: humanizeField('ulceration'), type: 'checkbox' },
  { key: 'capillary_refill_seconds', label: humanizeField('capillary_refill_seconds'), type: 'number' },
  { key: 'sensation_monofilament', label: humanizeField('sensation_monofilament') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  foot_side: '',
  deformity: '',
  ulceration: false,
  capillary_refill_seconds: '',
  sensation_monofilament: '',
  notes: '',
  examined_at: '',
}

export function ToeExaminationListPage() {
  const resource = useToeExaminationResource()
  const title = humanizeModuleName('MedicalRecordToeExamination')

  return (
    <CrudDialogPage<ToeExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.foot_side ?? `#${item.id}`}
      resource={resource}
    />
  )
}
