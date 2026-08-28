import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEmergencyEducationResource } from '../api'
import type { EmergencyEducation } from '../types'

const columns: ColumnDef<EmergencyEducation, unknown>[] = [
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
    header: humanizeField('understanding_level'),
    accessorKey: 'understanding_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).understanding_level ?? '—'),
  },
  {
    header: humanizeField('educator_id'),
    accessorKey: 'educator_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).educator_id ?? '—'),
  },
  {
    header: humanizeField('educated_at'),
    accessorKey: 'educated_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).educated_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'topic', label: humanizeField('topic'), required: true },
  { key: 'method', label: humanizeField('method') },
  { key: 'understanding_level', label: humanizeField('understanding_level') },
  { key: 'educator_id', label: humanizeField('educator_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'educated_at', label: humanizeField('educated_at'), type: 'date', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: null,
  topic: '',
  method: '',
  understanding_level: '',
  educator_id: null,
  educated_at: '',
  notes: '',
}

export function EmergencyEducationListPage() {
  const resource = useEmergencyEducationResource()
  const title = humanizeModuleName('MedicalRecordEmergencyEducation')

  return (
    <CrudDialogPage<EmergencyEducation>
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
