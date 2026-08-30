// codegen:preserve — modul ini juga menampilkan item hasil sterilisasi.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSterilizationCycleResource } from '../api'
import type { SterilizationCycle } from '../types'

const columns: ColumnDef<SterilizationCycle, unknown>[] = [
  {
    header: humanizeField('machine_name'),
    accessorKey: 'machine_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).machine_name ?? '—'),
  },
  {
    header: humanizeField('temperature_celsius'),
    accessorKey: 'temperature_celsius',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).temperature_celsius ?? '—'),
  },
  {
    header: humanizeField('pressure_bar'),
    accessorKey: 'pressure_bar',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pressure_bar ?? '—'),
  },
  {
    header: humanizeField('duration_minutes'),
    accessorKey: 'duration_minutes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).duration_minutes ?? '—'),
  },
  {
    header: humanizeField('started_at'),
    accessorKey: 'started_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).started_at ?? '—'),
  },
  {
    header: humanizeField('completed_at'),
    accessorKey: 'completed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).completed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'machine_name', label: humanizeField('machine_name'), required: true },
  { key: 'temperature_celsius', label: humanizeField('temperature_celsius'), type: 'number', required: true },
  { key: 'pressure_bar', label: humanizeField('pressure_bar'), type: 'number', required: true },
  { key: 'duration_minutes', label: humanizeField('duration_minutes'), type: 'number', required: true },
  { key: 'started_at', label: humanizeField('started_at'), type: 'date', required: true },
  { key: 'completed_at', label: humanizeField('completed_at'), type: 'date' },
  { key: 'biological_indicator_result', label: humanizeField('biological_indicator_result'), type: 'select', options: [{"value":"pending","label":"Pending"},{"value":"negative","label":"Negative"},{"value":"positive","label":"Positive"}] },
  { key: 'status', label: humanizeField('status'), type: 'select', options: [{"value":"in_process","label":"In Process"},{"value":"passed","label":"Passed"},{"value":"failed","label":"Failed"}] },
]

const emptyForm = {
  machine_name: '',
  temperature_celsius: '',
  pressure_bar: '',
  duration_minutes: '',
  started_at: '',
  completed_at: '',
  biological_indicator_result: '',
  status: '',
}

export function SterilizationCycleListPage() {
  const resource = useSterilizationCycleResource()
  const title = humanizeModuleName('InventorySterilizationCycle')

  return (
    <CrudDialogPage<SterilizationCycle>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.machine_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
