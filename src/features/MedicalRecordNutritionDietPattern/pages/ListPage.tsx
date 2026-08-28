import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordNutritionDietPatternEndpoint, useNutritionDietPatternResource } from '../api'
import type { NutritionDietPattern } from '../types'

const columns: ColumnDef<NutritionDietPattern, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('diet_type'),
    accessorKey: 'diet_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diet_type ?? '—'),
  },
  {
    header: humanizeField('appetite'),
    accessorKey: 'appetite',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).appetite ?? '—'),
  },
  {
    header: humanizeField('meal_frequency_per_day'),
    accessorKey: 'meal_frequency_per_day',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).meal_frequency_per_day ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'diet_type', label: humanizeField('diet_type'), required: true },
  { key: 'appetite', label: humanizeField('appetite'), type: 'select', options: [{"value":"good","label":"Good"},{"value":"fair","label":"Fair"},{"value":"poor","label":"Poor"}] },
  { key: 'meal_frequency_per_day', label: humanizeField('meal_frequency_per_day'), type: 'number' },
  { key: 'food_allergies', label: humanizeField('food_allergies') },
  { key: 'special_diet_notes', label: humanizeField('special_diet_notes') },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  assessed_by: '',
  created_by: '',
  diet_type: '',
  appetite: '',
  meal_frequency_per_day: '',
  food_allergies: '',
  special_diet_notes: '',
  assessed_at: '',
}

const actions: WorkflowAction<NutritionDietPattern>[] = []

export function NutritionDietPatternListPage() {
  const resource = useNutritionDietPatternResource()
  const title = humanizeModuleName('MedicalRecordNutritionDietPattern')

  return (
    <WorkflowListPage<NutritionDietPattern>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordNutritionDietPatternEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.diet_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
