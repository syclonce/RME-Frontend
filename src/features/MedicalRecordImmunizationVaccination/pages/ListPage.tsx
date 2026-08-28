import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useImmunizationVaccinationResource } from '../api'
import type { ImmunizationVaccination } from '../types'

const columns: ColumnDef<ImmunizationVaccination, unknown>[] = [
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
    header: humanizeField('vaccine_name'),
    accessorKey: 'vaccine_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).vaccine_name ?? '—'),
  },
  {
    header: humanizeField('dose_number'),
    accessorKey: 'dose_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dose_number ?? '—'),
  },
  {
    header: humanizeField('batch_number'),
    accessorKey: 'batch_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).batch_number ?? '—'),
  },
  {
    header: humanizeField('administered_at'),
    accessorKey: 'administered_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).administered_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true, section: 'Detail' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', section: 'Detail' },
  { key: 'vaccine_name', label: humanizeField('vaccine_name'), required: true, section: 'Detail' },
  { key: 'dose_number', label: humanizeField('dose_number'), type: 'number', section: 'Detail' },
  { key: 'batch_number', label: humanizeField('batch_number'), section: 'Detail' },
  { key: 'administered_at', label: humanizeField('administered_at'), type: 'date', required: true, section: 'Detail' },
  { key: 'administered_by', label: humanizeField('administered_by'), type: 'combobox', relationEndpoint: '/employees', required: true, section: 'Detail Tambahan' },
  { key: 'site', label: humanizeField('site'), section: 'Detail Tambahan' },
  { key: 'route', label: humanizeField('route'), section: 'Detail Tambahan' },
  { key: 'adverse_reaction', label: humanizeField('adverse_reaction'), section: 'Detail Tambahan' },
  { key: 'status', label: humanizeField('status'), section: 'Detail Tambahan' },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  vaccine_name: '',
  dose_number: '',
  batch_number: '',
  administered_at: '',
  administered_by: null,
  site: '',
  route: '',
  adverse_reaction: '',
  status: '',
}

export function ImmunizationVaccinationListPage() {
  const resource = useImmunizationVaccinationResource()
  const title = humanizeModuleName('MedicalRecordImmunizationVaccination')

  return (
    <CrudDialogPage<ImmunizationVaccination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.vaccine_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
