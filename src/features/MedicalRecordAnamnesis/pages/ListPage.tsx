import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAnamnesisResource } from '../api'
import type { Anamnesis } from '../types'

const columns: ColumnDef<Anamnesis, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('present_illness_history'),
    accessorKey: 'present_illness_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).present_illness_history ?? '—'),
  },
  {
    header: humanizeField('past_medical_history'),
    accessorKey: 'past_medical_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).past_medical_history ?? '—'),
  },
  {
    header: humanizeField('family_medical_history'),
    accessorKey: 'family_medical_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).family_medical_history ?? '—'),
  },
  {
    header: humanizeField('allergy_history'),
    accessorKey: 'allergy_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).allergy_history ?? '—'),
  },
  {
    header: humanizeField('social_history'),
    accessorKey: 'social_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).social_history ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'present_illness_history', label: humanizeField('present_illness_history') },
  { key: 'past_medical_history', label: humanizeField('past_medical_history') },
  { key: 'family_medical_history', label: humanizeField('family_medical_history') },
  { key: 'allergy_history', label: humanizeField('allergy_history') },
  { key: 'social_history', label: humanizeField('social_history') },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  present_illness_history: '',
  past_medical_history: '',
  family_medical_history: '',
  allergy_history: '',
  social_history: '',
  recorded_by: '',
  recorded_at: '',
}

export function AnamnesisListPage() {
  const resource = useAnamnesisResource()
  const title = humanizeModuleName('MedicalRecordAnamnesis')

  return (
    <CrudDialogPage<Anamnesis>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.present_illness_history ?? `#${item.id}`}
      resource={resource}
    />
  )
}
