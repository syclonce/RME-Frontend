import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useUltrasoundGuidedProcedureResource } from '../api'
import type { UltrasoundGuidedProcedure } from '../types'

const columns: ColumnDef<UltrasoundGuidedProcedure, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_id'),
    accessorKey: 'doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).doctor_id ?? '—'),
  },
  {
    header: humanizeField('procedure_name'),
    accessorKey: 'procedure_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).procedure_name ?? '—'),
  },
  {
    header: humanizeField('target_site'),
    accessorKey: 'target_site',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).target_site ?? '—'),
  },
  {
    header: humanizeField('needle_gauge'),
    accessorKey: 'needle_gauge',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).needle_gauge ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'combobox', relationEndpoint: '/doctors' },
  { key: 'procedure_name', label: humanizeField('procedure_name'), required: true },
  { key: 'target_site', label: humanizeField('target_site') },
  { key: 'needle_gauge', label: humanizeField('needle_gauge') },
  { key: 'findings_and_outcome', label: humanizeField('findings_and_outcome') },
  { key: 'complications', label: humanizeField('complications') },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date', required: true },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  doctor_id: null,
  procedure_name: '',
  target_site: '',
  needle_gauge: '',
  findings_and_outcome: '',
  complications: '',
  performed_at: '',
}

export function UltrasoundGuidedProcedureListPage() {
  const resource = useUltrasoundGuidedProcedureResource()
  const title = humanizeModuleName('MedicalRecordUltrasoundGuidedProcedure')

  return (
    <CrudDialogPage<UltrasoundGuidedProcedure>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.procedure_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
