import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useToenailExaminationResource } from '../api'
import type { ToenailExamination } from '../types'

const columns: ColumnDef<ToenailExamination, unknown>[] = [
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
    header: humanizeField('capillary_refill_seconds'),
    accessorKey: 'capillary_refill_seconds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).capillary_refill_seconds ?? '—'),
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
    header: humanizeField('lesions'),
    accessorKey: 'lesions',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lesions ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'color', label: humanizeField('color') },
  { key: 'capillary_refill_seconds', label: humanizeField('capillary_refill_seconds'), type: 'number' },
  { key: 'clubbing', label: humanizeField('clubbing'), type: 'checkbox' },
  { key: 'cyanosis', label: humanizeField('cyanosis'), type: 'checkbox' },
  { key: 'lesions', label: humanizeField('lesions') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  color: '',
  capillary_refill_seconds: '',
  clubbing: false,
  cyanosis: false,
  lesions: '',
  findings: '',
  examined_at: '',
}

export function ToenailExaminationListPage() {
  const resource = useToenailExaminationResource()
  const title = humanizeModuleName('MedicalRecordToenailExamination')

  return (
    <CrudDialogPage<ToenailExamination>
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
