import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useClinicalNoteVerificationResource } from '../api'
import type { ClinicalNoteVerification } from '../types'

const columns: ColumnDef<ClinicalNoteVerification, unknown>[] = [
  {
    header: humanizeField('clinical_note_id'),
    cell: ({ row }) => <RelationLabel endpoint="/clinical-notes" id={(row.original as unknown as Record<string, unknown>).clinical_note_id as number | null} />,
  },
  {
    header: humanizeField('verifier_doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).verifier_doctor_id as number | null} />,
  },
  {
    header: humanizeField('verification_status'),
    accessorKey: 'verification_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).verification_status ?? '—'),
  },
  {
    header: humanizeField('verified_at'),
    accessorKey: 'verified_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).verified_at ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'clinical_note_id', label: humanizeField('clinical_note_id'), type: 'relation', relationEndpoint: '/clinical-notes', required: true },
  { key: 'verifier_doctor_id', label: humanizeField('verifier_doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'verification_status', label: humanizeField('verification_status') },
  { key: 'verified_at', label: humanizeField('verified_at'), type: 'date', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  clinical_note_id: null,
  verifier_doctor_id: null,
  verification_status: '',
  verified_at: '',
  notes: '',
}

export function ClinicalNoteVerificationListPage() {
  const resource = useClinicalNoteVerificationResource()
  const title = humanizeModuleName('MedicalRecordClinicalNoteVerification')

  return (
    <CrudDialogPage<ClinicalNoteVerification>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.verification_status ?? `#${item.id}`}
      resource={resource}
    />
  )
}
