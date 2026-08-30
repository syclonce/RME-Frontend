// codegen:preserve — master surveilans, kasus, dan laporan laju dipisahkan.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDeviceDayResource } from '../api'
import type { DeviceDay } from '../types'
import { EndpointQueryDialog } from '@/shared/components/EndpointQueryDialog'
import { apiClient } from '@/api/client'

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
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'device_type', label: humanizeField('device_type'), required: true },
  { key: 'inserted_at', label: humanizeField('inserted_at'), type: 'date', required: true },
  { key: 'removed_at', label: humanizeField('removed_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
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
      headerActions={
        <EndpointQueryDialog
          triggerLabel="Hitung Laju Infeksi" title="Laju Infeksi per 1.000 Hari-Alat"
          description="Pilih jenis infeksi dan periode surveilans."
          fields={[
            { key: 'type', label: 'Jenis Infeksi', type: 'select', required: true, options: [
              { value: 'ISK', label: 'ISK' }, { value: 'plebitis', label: 'Plebitis' }, { value: 'IDO', label: 'IDO' }, { value: 'VAP', label: 'VAP' },
            ] },
            { key: 'start', label: 'Mulai', type: 'date', required: true },
            { key: 'end', label: 'Selesai', type: 'date', required: true },
          ]}
          initialForm={{ type: 'ISK', start: '', end: '' }}
          query={async (form) => (await apiClient.get('/infection-surveillance/rate', { params: form })).data}
        />
      }
    />
  )
}
