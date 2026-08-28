import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useControlScheduleResource } from '../api'
import type { ControlSchedule } from '../types'

const columns: ColumnDef<ControlSchedule, unknown>[] = [
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
    header: humanizeField('medical_department_id'),
    cell: ({ row }) => <RelationLabel endpoint="/medical-departments" id={(row.original as unknown as Record<string, unknown>).medical_department_id as number | null} />,
  },
  {
    header: humanizeField('scheduled_date'),
    accessorKey: 'scheduled_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scheduled_date ?? '—'),
  },
  {
    header: humanizeField('purpose'),
    accessorKey: 'purpose',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).purpose ?? '—'),
  },
  {
    header: humanizeField('scheduled_by'),
    accessorKey: 'scheduled_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).scheduled_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
  { key: 'medical_department_id', label: humanizeField('medical_department_id'), type: 'relation', relationEndpoint: '/medical-departments' },
  { key: 'scheduled_date', label: humanizeField('scheduled_date'), type: 'date', required: true },
  { key: 'purpose', label: humanizeField('purpose') },
  { key: 'scheduled_by', label: humanizeField('scheduled_by'), type: 'number', required: true },
  { key: 'status', label: humanizeField('status') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  patient_id: '',
  visit_id: '',
  medical_department_id: null,
  scheduled_date: '',
  purpose: '',
  scheduled_by: '',
  status: '',
  notes: '',
}

export function ControlScheduleListPage() {
  const resource = useControlScheduleResource()
  const title = humanizeModuleName('MedicalRecordControlSchedule')

  return (
    <CrudDialogPage<ControlSchedule>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.purpose ?? `#${item.id}`}
      resource={resource}
    />
  )
}
