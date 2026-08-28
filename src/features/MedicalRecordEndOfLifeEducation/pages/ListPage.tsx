import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEndOfLifeEducationResource } from '../api'
import type { EndOfLifeEducation } from '../types'

const columns: ColumnDef<EndOfLifeEducation, unknown>[] = [
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
    header: humanizeField('participants'),
    accessorKey: 'participants',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).participants ?? '—'),
  },
  {
    header: humanizeField('decision_summary'),
    accessorKey: 'decision_summary',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decision_summary ?? '—'),
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
  { key: 'participants', label: humanizeField('participants') },
  { key: 'decision_summary', label: humanizeField('decision_summary') },
  { key: 'educator_id', label: humanizeField('educator_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'educated_at', label: humanizeField('educated_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: null,
  topic: '',
  participants: '',
  decision_summary: '',
  educator_id: null,
  educated_at: '',
}

export function EndOfLifeEducationListPage() {
  const resource = useEndOfLifeEducationResource()
  const title = humanizeModuleName('MedicalRecordEndOfLifeEducation')

  return (
    <CrudDialogPage<EndOfLifeEducation>
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
