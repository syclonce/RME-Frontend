import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEndOfLifePsychosocialRelationshipResource } from '../api'
import type { EndOfLifePsychosocialRelationship } from '../types'

const columns: ColumnDef<EndOfLifePsychosocialRelationship, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('relationship_type'),
    accessorKey: 'relationship_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).relationship_type ?? '—'),
  },
  {
    header: humanizeField('support_system'),
    accessorKey: 'support_system',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).support_system ?? '—'),
  },
  {
    header: humanizeField('spiritual_needs'),
    accessorKey: 'spiritual_needs',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).spiritual_needs ?? '—'),
  },
  {
    header: humanizeField('emotional_state'),
    accessorKey: 'emotional_state',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).emotional_state ?? '—'),
  },
  {
    header: humanizeField('assessed_by'),
    accessorKey: 'assessed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).assessed_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'relationship_type', label: humanizeField('relationship_type') },
  { key: 'support_system', label: humanizeField('support_system') },
  { key: 'spiritual_needs', label: humanizeField('spiritual_needs') },
  { key: 'emotional_state', label: humanizeField('emotional_state') },
  { key: 'assessed_by', label: humanizeField('assessed_by'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'assessed_at', label: humanizeField('assessed_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: null,
  relationship_type: '',
  support_system: '',
  spiritual_needs: '',
  emotional_state: '',
  assessed_by: null,
  assessed_at: '',
}

export function EndOfLifePsychosocialRelationshipListPage() {
  const resource = useEndOfLifePsychosocialRelationshipResource()
  const title = humanizeModuleName('MedicalRecordEndOfLifePsychosocialRelationship')

  return (
    <CrudDialogPage<EndOfLifePsychosocialRelationship>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.relationship_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
