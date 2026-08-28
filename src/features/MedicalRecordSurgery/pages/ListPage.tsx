import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordSurgeryEndpoint, useSurgeryResource } from '../api'
import type { Surgery } from '../types'

const columns: ColumnDef<Surgery, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('diagnosis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnoses" id={(row.original as unknown as Record<string, unknown>).diagnosis_id as number | null} />,
  },
  {
    header: humanizeField('procedure_name'),
    accessorKey: 'procedure_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_name ?? '—'),
  },
  {
    header: humanizeField('surgeon_id'),
    accessorKey: 'surgeon_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).surgeon_id ?? '—'),
  },
  {
    header: humanizeField('anesthesia_type'),
    accessorKey: 'anesthesia_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).anesthesia_type ?? '—'),
  },
  {
    header: humanizeField('started_at'),
    accessorKey: 'started_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).started_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'diagnosis_id', label: humanizeField('diagnosis_id'), type: 'relation', relationEndpoint: '/diagnoses' },
  { key: 'procedure_name', label: humanizeField('procedure_name'), required: true },
  { key: 'surgeon_id', label: humanizeField('surgeon_id'), type: 'number', required: true },
  { key: 'anesthesia_type', label: humanizeField('anesthesia_type') },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date' },
  { key: 'ended_at', label: humanizeField('ended_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  diagnosis_id: null,
  procedure_name: '',
  surgeon_id: '',
  anesthesia_type: '',
  started_at: '',
  ended_at: '',
  notes: '',
}

const actions: WorkflowAction<Surgery>[] = []

export function SurgeryListPage() {
  const resource = useSurgeryResource()
  const title = humanizeModuleName('MedicalRecordSurgery')

  return (
    <WorkflowListPage<Surgery>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordSurgeryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.procedure_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
