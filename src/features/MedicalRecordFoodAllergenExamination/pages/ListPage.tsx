import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFoodAllergenExaminationResource } from '../api'
import type { FoodAllergenExamination } from '../types'

const columns: ColumnDef<FoodAllergenExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('food_item'),
    accessorKey: 'food_item',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).food_item ?? '—'),
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
    header: humanizeField('symptoms_observed'),
    accessorKey: 'symptoms_observed',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).symptoms_observed ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'food_item', label: humanizeField('food_item'), required: true },
  { key: 'reaction_grade', label: humanizeField('reaction_grade') },
  { key: 'wheal_diameter_mm', label: humanizeField('wheal_diameter_mm'), type: 'number' },
  { key: 'symptoms_observed', label: humanizeField('symptoms_observed') },
  { key: 'interpretation', label: humanizeField('interpretation') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  food_item: '',
  reaction_grade: '',
  wheal_diameter_mm: '',
  symptoms_observed: '',
  interpretation: '',
  examined_at: '',
}

export function FoodAllergenExaminationListPage() {
  const resource = useFoodAllergenExaminationResource()
  const title = humanizeModuleName('MedicalRecordFoodAllergenExamination')

  return (
    <CrudDialogPage<FoodAllergenExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.food_item ?? `#${item.id}`}
      resource={resource}
    />
  )
}
