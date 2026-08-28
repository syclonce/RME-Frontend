import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useUpperGiTractExaminationResource } from '../api'
import type { UpperGiTractExamination } from '../types'

const columns: ColumnDef<UpperGiTractExamination, unknown>[] = [
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
    header: humanizeField('esophagus_findings'),
    accessorKey: 'esophagus_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).esophagus_findings ?? '—'),
  },
  {
    header: humanizeField('stomach_findings'),
    accessorKey: 'stomach_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).stomach_findings ?? '—'),
  },
  {
    header: humanizeField('duodenum_findings'),
    accessorKey: 'duodenum_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).duodenum_findings ?? '—'),
  },
  {
    header: humanizeField('hpylori_result'),
    accessorKey: 'hpylori_result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).hpylori_result ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'procedure_type', label: humanizeField('procedure_type') },
  { key: 'esophagus_findings', label: humanizeField('esophagus_findings') },
  { key: 'stomach_findings', label: humanizeField('stomach_findings') },
  { key: 'duodenum_findings', label: humanizeField('duodenum_findings') },
  { key: 'hpylori_result', label: humanizeField('hpylori_result'), type: 'select', options: [{"value":"positive","label":"Positive"},{"value":"negative","label":"Negative"},{"value":"not_tested","label":"Not Tested"}] },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  procedure_type: '',
  esophagus_findings: '',
  stomach_findings: '',
  duodenum_findings: '',
  hpylori_result: '',
  examined_at: '',
}

export function UpperGiTractExaminationListPage() {
  const resource = useUpperGiTractExaminationResource()
  const title = humanizeModuleName('MedicalRecordUpperGiTractExamination')

  return (
    <CrudDialogPage<UpperGiTractExamination>
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
