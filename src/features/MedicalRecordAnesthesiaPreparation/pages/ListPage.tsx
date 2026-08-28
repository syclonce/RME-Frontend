import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordAnesthesiaPreparationEndpoint, useAnesthesiaPreparationResource } from '../api'
import type { AnesthesiaPreparation } from '../types'

const columns: ColumnDef<AnesthesiaPreparation, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('prepared_by'),
    accessorKey: 'prepared_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prepared_by ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('fasting_hours'),
    accessorKey: 'fasting_hours',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).fasting_hours ?? '—'),
  },
  {
    header: humanizeField('allergy_checked'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).allergy_checked ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('mallampati_score'),
    accessorKey: 'mallampati_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mallampati_score ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'prepared_by', label: humanizeField('prepared_by'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'fasting_hours', label: humanizeField('fasting_hours'), type: 'number' },
  { key: 'allergy_checked', label: humanizeField('allergy_checked'), type: 'checkbox' },
  { key: 'mallampati_score', label: humanizeField('mallampati_score'), type: 'number' },
  { key: 'consent_confirmed', label: humanizeField('consent_confirmed'), type: 'checkbox' },
  { key: 'equipment_checklist', label: humanizeField('equipment_checklist') },
  { key: 'prepared_at', label: humanizeField('prepared_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  prepared_by: '',
  created_by: '',
  fasting_hours: '',
  allergy_checked: false,
  mallampati_score: '',
  consent_confirmed: false,
  equipment_checklist: '',
  prepared_at: '',
}

const actions: WorkflowAction<AnesthesiaPreparation>[] = []

export function AnesthesiaPreparationListPage() {
  const resource = useAnesthesiaPreparationResource()
  const title = humanizeModuleName('MedicalRecordAnesthesiaPreparation')

  return (
    <WorkflowListPage<AnesthesiaPreparation>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordAnesthesiaPreparationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.equipment_checklist ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
