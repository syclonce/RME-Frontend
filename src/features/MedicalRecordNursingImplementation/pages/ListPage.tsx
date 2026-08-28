import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNursingImplementationResource } from '../api'
import type { NursingImplementation } from '../types'

const columns: ColumnDef<NursingImplementation, unknown>[] = [
  {
    header: humanizeField('nursing_diagnosis_id'),
    cell: ({ row }) => <RelationLabel endpoint="/nursing-diagnoses" id={(row.original as unknown as Record<string, unknown>).nursing_diagnosis_id as number | null} />,
  },
  {
    header: humanizeField('action_taken'),
    accessorKey: 'action_taken',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).action_taken ?? '—'),
  },
  {
    header: humanizeField('performed_by'),
    accessorKey: 'performed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_by ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
  {
    header: humanizeField('patient_response'),
    accessorKey: 'patient_response',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_response ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'nursing_diagnosis_id', label: humanizeField('nursing_diagnosis_id'), type: 'relation', relationEndpoint: '/nursing-diagnoses', required: true },
  { key: 'action_taken', label: humanizeField('action_taken') },
  { key: 'performed_by', label: humanizeField('performed_by'), type: 'number', required: true },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date', required: true },
  { key: 'patient_response', label: humanizeField('patient_response') },
]

const emptyForm = {
  nursing_diagnosis_id: null,
  action_taken: '',
  performed_by: '',
  performed_at: '',
  patient_response: '',
}

export function NursingImplementationListPage() {
  const resource = useNursingImplementationResource()
  const title = humanizeModuleName('MedicalRecordNursingImplementation')

  return (
    <CrudDialogPage<NursingImplementation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.action_taken ?? `#${item.id}`}
      resource={resource}
    />
  )
}
