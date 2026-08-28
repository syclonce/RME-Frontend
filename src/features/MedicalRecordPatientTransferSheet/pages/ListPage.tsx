import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientTransferSheetResource } from '../api'
import type { PatientTransferSheet } from '../types'

const columns: ColumnDef<PatientTransferSheet, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('from_ward_id'),
    accessorKey: 'from_ward_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).from_ward_id ?? '—'),
  },
  {
    header: humanizeField('to_ward_id'),
    accessorKey: 'to_ward_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).to_ward_id ?? '—'),
  },
  {
    header: humanizeField('transfer_reason'),
    accessorKey: 'transfer_reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).transfer_reason ?? '—'),
  },
  {
    header: humanizeField('patient_condition'),
    accessorKey: 'patient_condition',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_condition ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'from_ward_id', label: humanizeField('from_ward_id'), type: 'number' },
  { key: 'to_ward_id', label: humanizeField('to_ward_id'), type: 'number' },
  { key: 'transfer_reason', label: humanizeField('transfer_reason') },
  { key: 'patient_condition', label: humanizeField('patient_condition') },
  { key: 'transferred_at', label: humanizeField('transferred_at'), type: 'date' },
  { key: 'transferred_by', label: humanizeField('transferred_by'), type: 'number' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  from_ward_id: '',
  to_ward_id: '',
  transfer_reason: '',
  patient_condition: '',
  transferred_at: '',
  transferred_by: '',
}

export function PatientTransferSheetListPage() {
  const resource = usePatientTransferSheetResource()
  const title = humanizeModuleName('MedicalRecordPatientTransferSheet')

  return (
    <CrudDialogPage<PatientTransferSheet>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.transfer_reason ?? `#${item.id}`}
      resource={resource}
    />
  )
}
