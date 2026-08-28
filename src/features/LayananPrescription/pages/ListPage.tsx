import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPrescriptionEndpoint, usePrescriptionResource } from '../api'
import type { Prescription } from '../types'

const columns: ColumnDef<Prescription, unknown>[] = [
  {
    header: humanizeField('prescription_number'),
    accessorKey: 'prescription_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_number ?? '—'),
  },
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
    header: humanizeField('prescribed_by'),
    accessorKey: 'prescribed_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescribed_by ?? '—'),
  },
  {
    header: humanizeField('prescribed_at'),
    accessorKey: 'prescribed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescribed_at ?? '—'),
  },
  {
    header: humanizeField('weight_kg'),
    accessorKey: 'weight_kg',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).weight_kg ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'prescription_number', label: humanizeField('prescription_number'), section: 'Detail' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true, section: 'Detail' },
  { key: 'diagnosis_id', label: humanizeField('diagnosis_id'), type: 'relation', relationEndpoint: '/diagnoses', section: 'Detail' },
  { key: 'prescribed_by', label: humanizeField('prescribed_by'), type: 'number', required: true, section: 'Detail' },
  { key: 'prescribed_at', label: humanizeField('prescribed_at'), type: 'date', section: 'Detail' },
  { key: 'weight_kg', label: humanizeField('weight_kg'), type: 'number', section: 'Detail' },
  { key: 'height_cm', label: humanizeField('height_cm'), type: 'number', section: 'Detail' },
  { key: 'has_drug_allergy', label: humanizeField('has_drug_allergy'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'is_pregnant', label: humanizeField('is_pregnant'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'is_breastfeeding', label: humanizeField('is_breastfeeding'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'is_discharge_prescription', label: humanizeField('is_discharge_prescription'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'is_emergency', label: humanizeField('is_emergency'), type: 'checkbox', section: 'Detail Tambahan' },
  { key: 'notes', label: humanizeField('notes'), section: 'Detail Tambahan' },
]

const emptyForm = {
  prescription_number: '',
  visit_id: '',
  diagnosis_id: null,
  prescribed_by: '',
  prescribed_at: '',
  weight_kg: '',
  height_cm: '',
  has_drug_allergy: false,
  is_pregnant: false,
  is_breastfeeding: false,
  is_discharge_prescription: false,
  is_emergency: false,
  notes: '',
}

const actions: WorkflowAction<Prescription>[] = []

export function PrescriptionListPage() {
  const resource = usePrescriptionResource()
  const title = humanizeModuleName('LayananPrescription')

  return (
    <WorkflowListPage<Prescription>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPrescriptionEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.prescription_number ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
