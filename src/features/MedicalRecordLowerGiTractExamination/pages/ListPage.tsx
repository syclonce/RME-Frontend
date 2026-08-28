import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLowerGiTractExaminationResource } from '../api'
import type { LowerGiTractExamination } from '../types'

const columns: ColumnDef<LowerGiTractExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('procedure_type'),
    accessorKey: 'procedure_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_type ?? '—'),
  },
  {
    header: humanizeField('colon_findings'),
    accessorKey: 'colon_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).colon_findings ?? '—'),
  },
  {
    header: humanizeField('rectum_findings'),
    accessorKey: 'rectum_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).rectum_findings ?? '—'),
  },
  {
    header: humanizeField('polyps_found'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).polyps_found ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('biopsy_taken'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).biopsy_taken ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'procedure_type', label: humanizeField('procedure_type') },
  { key: 'colon_findings', label: humanizeField('colon_findings') },
  { key: 'rectum_findings', label: humanizeField('rectum_findings') },
  { key: 'polyps_found', label: humanizeField('polyps_found'), type: 'checkbox' },
  { key: 'biopsy_taken', label: humanizeField('biopsy_taken'), type: 'checkbox' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  procedure_type: '',
  colon_findings: '',
  rectum_findings: '',
  polyps_found: false,
  biopsy_taken: false,
  examined_at: '',
}

export function LowerGiTractExaminationListPage() {
  const resource = useLowerGiTractExaminationResource()
  const title = humanizeModuleName('MedicalRecordLowerGiTractExamination')

  return (
    <CrudDialogPage<LowerGiTractExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.procedure_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
