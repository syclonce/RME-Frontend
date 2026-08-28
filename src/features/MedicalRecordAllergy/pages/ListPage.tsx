import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordAllergyEndpoint, useAllergyResource } from '../api'
import type { Allergy } from '../types'

const columns: ColumnDef<Allergy, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('category'),
    accessorKey: 'category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).category ?? '—'),
  },
  {
    header: humanizeField('allergen'),
    accessorKey: 'allergen',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).allergen ?? '—'),
  },
  {
    header: humanizeField('reaction'),
    accessorKey: 'reaction',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reaction ?? '—'),
  },
  {
    header: humanizeField('severity'),
    accessorKey: 'severity',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).severity ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    accessorKey: 'is_active',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).is_active ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'category', label: humanizeField('category'), type: 'select', required: true, options: [{"value":"drug","label":"Drug"},{"value":"food","label":"Food"},{"value":"environment","label":"Environment"}] },
  { key: 'allergen', label: humanizeField('allergen'), required: true },
  { key: 'reaction', label: humanizeField('reaction') },
  { key: 'severity', label: humanizeField('severity'), type: 'select', options: [{"value":"mild","label":"Mild"},{"value":"moderate","label":"Moderate"},{"value":"severe","label":"Severe"}] },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
]

const emptyForm = {
  patient_id: '',
  category: '',
  allergen: '',
  reaction: '',
  severity: '',
  recorded_by: '',
}

const actions: WorkflowAction<Allergy>[] = []

export function AllergyListPage() {
  const resource = useAllergyResource()
  const title = humanizeModuleName('MedicalRecordAllergy')

  return (
    <WorkflowListPage<Allergy>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordAllergyEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.category ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
