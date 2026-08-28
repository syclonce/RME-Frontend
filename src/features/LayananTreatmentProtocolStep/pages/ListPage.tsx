import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTreatmentProtocolStepResource } from '../api'
import type { TreatmentProtocolStep } from '../types'

const columns: ColumnDef<TreatmentProtocolStep, unknown>[] = [
  {
    header: humanizeField('treatment_protocol_id'),
    cell: ({ row }) => <RelationLabel endpoint="/treatment-protocols" id={(row.original as unknown as Record<string, unknown>).treatment_protocol_id as number | null} />,
  },
  {
    header: humanizeField('sequence'),
    accessorKey: 'sequence',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sequence ?? '—'),
  },
  {
    header: humanizeField('instruction'),
    accessorKey: 'instruction',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).instruction ?? '—'),
  },
  {
    header: humanizeField('scheduled_at'),
    accessorKey: 'scheduled_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scheduled_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    accessorKey: 'status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).status ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'treatment_protocol_id', label: humanizeField('treatment_protocol_id'), type: 'relation', relationEndpoint: '/treatment-protocols', required: true },
  { key: 'sequence', label: humanizeField('sequence'), type: 'number', required: true },
  { key: 'instruction', label: humanizeField('instruction'), required: true },
  { key: 'scheduled_at', label: humanizeField('scheduled_at'), type: 'date' },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  treatment_protocol_id: null,
  sequence: '',
  instruction: '',
  scheduled_at: '',
  status: '',
}

export function TreatmentProtocolStepListPage() {
  const resource = useTreatmentProtocolStepResource()
  const title = humanizeModuleName('LayananTreatmentProtocolStep')

  return (
    <CrudDialogPage<TreatmentProtocolStep>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.instruction ?? `#${item.id}`}
      resource={resource}
    />
  )
}
