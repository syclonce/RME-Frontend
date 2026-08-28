import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useAnamnesisSourceResource } from '../api'
import type { AnamnesisSource } from '../types'

const columns: ColumnDef<AnamnesisSource, unknown>[] = [
  {
    header: humanizeField('anamnesis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/anamneses" id={(row.original as unknown as Record<string, unknown>).anamnesis_id as number | null} />,
  },
  {
    header: humanizeField('source_type'),
    accessorKey: 'source_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_type ?? '—'),
  },
  {
    header: humanizeField('source_name'),
    accessorKey: 'source_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_name ?? '—'),
  },
  {
    header: humanizeField('relationship'),
    accessorKey: 'relationship',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).relationship ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'anamnesis_id', label: humanizeField('anamnesis_id'), type: 'relation', relationEndpoint: '/anamneses', required: true },
  { key: 'source_type', label: humanizeField('source_type'), required: true },
  { key: 'source_name', label: humanizeField('source_name') },
  { key: 'relationship', label: humanizeField('relationship') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  anamnesis_id: null,
  source_type: '',
  source_name: '',
  relationship: '',
  notes: '',
}

export function AnamnesisSourceListPage() {
  const resource = useAnamnesisSourceResource()
  const title = humanizeModuleName('MedicalRecordAnamnesisSource')

  return (
    <CrudDialogPage<AnamnesisSource>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.source_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
