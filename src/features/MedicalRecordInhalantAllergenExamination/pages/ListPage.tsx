import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInhalantAllergenExaminationResource } from '../api'
import type { InhalantAllergenExamination } from '../types'

const columns: ColumnDef<InhalantAllergenExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('allergen_name'),
    accessorKey: 'allergen_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).allergen_name ?? '—'),
  },
  {
    header: humanizeField('reaction_grade'),
    accessorKey: 'reaction_grade',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reaction_grade ?? '—'),
  },
  {
    header: humanizeField('wheal_diameter_mm'),
    accessorKey: 'wheal_diameter_mm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).wheal_diameter_mm ?? '—'),
  },
  {
    header: humanizeField('erythema_diameter_mm'),
    accessorKey: 'erythema_diameter_mm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).erythema_diameter_mm ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'allergen_name', label: humanizeField('allergen_name'), required: true },
  { key: 'reaction_grade', label: humanizeField('reaction_grade') },
  { key: 'wheal_diameter_mm', label: humanizeField('wheal_diameter_mm'), type: 'number' },
  { key: 'erythema_diameter_mm', label: humanizeField('erythema_diameter_mm'), type: 'number' },
  { key: 'interpretation', label: humanizeField('interpretation') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  allergen_name: '',
  reaction_grade: '',
  wheal_diameter_mm: '',
  erythema_diameter_mm: '',
  interpretation: '',
  examined_at: '',
}

export function InhalantAllergenExaminationListPage() {
  const resource = useInhalantAllergenExaminationResource()
  const title = humanizeModuleName('MedicalRecordInhalantAllergenExamination')

  return (
    <CrudDialogPage<InhalantAllergenExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.allergen_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
