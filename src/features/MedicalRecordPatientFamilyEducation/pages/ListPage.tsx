import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientFamilyEducationResource } from '../api'
import type { PatientFamilyEducation } from '../types'

const columns: ColumnDef<PatientFamilyEducation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('topic'),
    accessorKey: 'topic',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).topic ?? '—'),
  },
  {
    header: humanizeField('method'),
    accessorKey: 'method',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).method ?? '—'),
  },
  {
    header: humanizeField('barrier'),
    accessorKey: 'barrier',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).barrier ?? '—'),
  },
  {
    header: humanizeField('understanding_level'),
    accessorKey: 'understanding_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).understanding_level ?? '—'),
  },
  {
    header: humanizeField('re_education_needed'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).re_education_needed ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'topic', label: humanizeField('topic'), required: true },
  { key: 'method', label: humanizeField('method') },
  { key: 'barrier', label: humanizeField('barrier') },
  { key: 'understanding_level', label: humanizeField('understanding_level') },
  { key: 're_education_needed', label: humanizeField('re_education_needed'), type: 'checkbox' },
  { key: 'educator_id', label: humanizeField('educator_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'educated_at', label: humanizeField('educated_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: null,
  topic: '',
  method: '',
  barrier: '',
  understanding_level: '',
  re_education_needed: false,
  educator_id: null,
  educated_at: '',
}

export function PatientFamilyEducationListPage() {
  const resource = usePatientFamilyEducationResource()
  const title = humanizeModuleName('MedicalRecordPatientFamilyEducation')

  return (
    <CrudDialogPage<PatientFamilyEducation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.topic ?? `#${item.id}`}
      resource={resource}
    />
  )
}
