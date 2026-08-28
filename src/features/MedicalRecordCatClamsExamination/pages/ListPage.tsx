import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useCatClamsExaminationResource } from '../api'
import type { CatClamsExamination } from '../types'

const columns: ColumnDef<CatClamsExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('cat_score'),
    accessorKey: 'cat_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cat_score ?? '—'),
  },
  {
    header: humanizeField('clams_score'),
    accessorKey: 'clams_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).clams_score ?? '—'),
  },
  {
    header: humanizeField('developmental_quotient'),
    accessorKey: 'developmental_quotient',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).developmental_quotient ?? '—'),
  },
  {
    header: humanizeField('developmental_age_months'),
    accessorKey: 'developmental_age_months',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).developmental_age_months ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'cat_score', label: humanizeField('cat_score'), type: 'number' },
  { key: 'clams_score', label: humanizeField('clams_score'), type: 'number' },
  { key: 'developmental_quotient', label: humanizeField('developmental_quotient'), type: 'number' },
  { key: 'developmental_age_months', label: humanizeField('developmental_age_months'), type: 'number' },
  { key: 'interpretation', label: humanizeField('interpretation') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  cat_score: '',
  clams_score: '',
  developmental_quotient: '',
  developmental_age_months: '',
  interpretation: '',
  examined_at: '',
}

export function CatClamsExaminationListPage() {
  const resource = useCatClamsExaminationResource()
  const title = humanizeModuleName('MedicalRecordCatClamsExamination')

  return (
    <CrudDialogPage<CatClamsExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.interpretation ?? `#${item.id}`}
      resource={resource}
    />
  )
}
