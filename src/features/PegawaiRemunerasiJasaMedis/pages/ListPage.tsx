// codegen:preserve — ringkasan remunerasi adalah operasi laporan khusus.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useRemunerationEntryResource } from '../api'
import type { RemunerationEntry } from '../types'
import { EndpointQueryDialog } from '@/shared/components/EndpointQueryDialog'
import { apiClient } from '@/api/client'

const columns: ColumnDef<RemunerationEntry, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('source_type'),
    accessorKey: 'source_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_type ?? '—'),
  },
  {
    header: humanizeField('source_id'),
    accessorKey: 'source_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).source_id ?? '—'),
  },
  {
    header: humanizeField('role'),
    accessorKey: 'role',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).role ?? '—'),
  },
  {
    header: humanizeField('gross_amount'),
    accessorKey: 'gross_amount',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gross_amount ?? '—'),
  },
  {
    header: humanizeField('deduction_percentage'),
    accessorKey: 'deduction_percentage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).deduction_percentage ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'source_type', label: humanizeField('source_type'), required: true },
  { key: 'source_id', label: humanizeField('source_id'), type: 'number', required: true },
  { key: 'role', label: humanizeField('role'), required: true },
  { key: 'gross_amount', label: humanizeField('gross_amount'), type: 'number', required: true },
  { key: 'deduction_percentage', label: humanizeField('deduction_percentage'), type: 'number' },
  { key: 'fixed_deduction', label: humanizeField('fixed_deduction'), type: 'number' },
  { key: 'service_date', label: humanizeField('service_date'), type: 'date', required: true },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  employee_id: null,
  source_type: '',
  source_id: '',
  role: '',
  gross_amount: '',
  deduction_percentage: '',
  fixed_deduction: '',
  service_date: '',
  notes: '',
}

export function RemunerationEntryListPage() {
  const resource = useRemunerationEntryResource()
  const title = humanizeModuleName('PegawaiRemunerasiJasaMedis')

  return (
    <CrudDialogPage<RemunerationEntry>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.source_type ?? `#${item.id}`}
      resource={resource}
      headerActions={
        <EndpointQueryDialog
          triggerLabel="Ringkasan Remunerasi" title="Ringkasan Remunerasi Pegawai"
          description="Total bruto dan neto seorang pegawai dalam satu bulan."
          fields={[
            { key: 'employee_id', label: 'Pegawai', type: 'combobox', relationEndpoint: '/employees', required: true },
            { key: 'month', label: 'Bulan', type: 'number', required: true },
            { key: 'year', label: 'Tahun', type: 'number', required: true },
          ]}
          initialForm={{ employee_id: null, month: new Date().getMonth() + 1, year: new Date().getFullYear() }}
          query={async (form) => (await apiClient.get('/remuneration-entries/summary', { params: form })).data}
        />
      }
    />
  )
}
