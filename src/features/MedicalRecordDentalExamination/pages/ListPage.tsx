import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDentalExaminationResource } from '../api'
import type { DentalExamination } from '../types'

const columns: ColumnDef<DentalExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('decayed_teeth_count'),
    accessorKey: 'decayed_teeth_count',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decayed_teeth_count ?? '—'),
  },
  {
    header: humanizeField('missing_teeth_count'),
    accessorKey: 'missing_teeth_count',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).missing_teeth_count ?? '—'),
  },
  {
    header: humanizeField('filled_teeth_count'),
    accessorKey: 'filled_teeth_count',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).filled_teeth_count ?? '—'),
  },
  {
    header: humanizeField('odontogram_json'),
    accessorKey: 'odontogram_json',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).odontogram_json ?? '—'),
  },
  {
    header: humanizeField('occlusion_status'),
    accessorKey: 'occlusion_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).occlusion_status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'decayed_teeth_count', label: humanizeField('decayed_teeth_count'), type: 'number' },
  { key: 'missing_teeth_count', label: humanizeField('missing_teeth_count'), type: 'number' },
  { key: 'filled_teeth_count', label: humanizeField('filled_teeth_count'), type: 'number' },
  { key: 'odontogram_json', label: humanizeField('odontogram_json') },
  { key: 'occlusion_status', label: humanizeField('occlusion_status') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  decayed_teeth_count: '',
  missing_teeth_count: '',
  filled_teeth_count: '',
  odontogram_json: '',
  occlusion_status: '',
  notes: '',
  examined_at: '',
}

export function DentalExaminationListPage() {
  const resource = useDentalExaminationResource()
  const title = humanizeModuleName('MedicalRecordDentalExamination')

  return (
    <CrudDialogPage<DentalExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.occlusion_status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
