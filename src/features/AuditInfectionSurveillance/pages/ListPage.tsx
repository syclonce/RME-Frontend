import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDeviceDayResource } from '../api'
import type { DeviceDay } from '../types'

const columns: ColumnDef<DeviceDay, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('device_type'),
    accessorKey: 'device_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).device_type ?? '—'),
  },
  {
    header: humanizeField('inserted_at'),
    accessorKey: 'inserted_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).inserted_at ?? '—'),
  },
  {
    header: humanizeField('removed_at'),
    accessorKey: 'removed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).removed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'device_type', label: humanizeField('device_type'), required: true },
  { key: 'inserted_at', label: humanizeField('inserted_at'), type: 'date', required: true },
  { key: 'removed_at', label: humanizeField('removed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  device_type: '',
  inserted_at: '',
  removed_at: '',
}

export function DeviceDayListPage() {
  const resource = useDeviceDayResource()
  const title = humanizeModuleName('AuditInfectionSurveillance')

  return (
    <CrudDialogPage<DeviceDay>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.device_type ?? `#${item.id}`}
      resource={resource}
    />
  )
}
