import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFingerExaminationResource } from '../api'
import type { FingerExamination } from '../types'

const columns: ColumnDef<FingerExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('hand_side'),
    accessorKey: 'hand_side',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).hand_side ?? '—'),
  },
  {
    header: humanizeField('clubbing'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).clubbing ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('cyanosis'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).cyanosis ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('capillary_refill_seconds'),
    accessorKey: 'capillary_refill_seconds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).capillary_refill_seconds ?? '—'),
  },
  {
    header: humanizeField('range_of_motion'),
    accessorKey: 'range_of_motion',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).range_of_motion ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'hand_side', label: humanizeField('hand_side') },
  { key: 'clubbing', label: humanizeField('clubbing'), type: 'checkbox' },
  { key: 'cyanosis', label: humanizeField('cyanosis'), type: 'checkbox' },
  { key: 'capillary_refill_seconds', label: humanizeField('capillary_refill_seconds'), type: 'number' },
  { key: 'range_of_motion', label: humanizeField('range_of_motion') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  hand_side: '',
  clubbing: false,
  cyanosis: false,
  capillary_refill_seconds: '',
  range_of_motion: '',
  notes: '',
  examined_at: '',
}

export function FingerExaminationListPage() {
  const resource = useFingerExaminationResource()
  const title = humanizeModuleName('MedicalRecordFingerExamination')

  return (
    <CrudDialogPage<FingerExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.hand_side ?? `#${item.id}`}
      resource={resource}
    />
  )
}
