import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabResultEndpoint, useLabResultResource } from '../api'
import { OrderStatusBadge } from '@/shared/components/OrderStatusBadge'
import type { LabResult } from '../types'

const columns: ColumnDef<LabResult, unknown>[] = [
  {
    header: humanizeField('lab_order_id'),
    accessorKey: 'lab_order_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lab_order_id ?? '—'),
  },
  {
    header: humanizeField('test_name'),
    accessorKey: 'test_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_name ?? '—'),
  },
  {
    header: humanizeField('result_value'),
    accessorKey: 'result_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result_value ?? '—'),
  },
  {
    header: humanizeField('normal_range'),
    accessorKey: 'normal_range',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).normal_range ?? '—'),
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
  {
    header: humanizeField('is_abnormal'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_abnormal ? 'Ya' : 'Tidak'),
  },
]

const statusColumn: ColumnDef<LabResult, unknown> = {
  header: 'Status',
  accessorKey: 'status',
  cell: ({ row }) => <OrderStatusBadge status={(row.original as LabResult).status} />,
}

const fields: CrudField[] = [
  { key: 'lab_order_id', label: humanizeField('lab_order_id'), type: 'number', required: true },
  { key: 'test_name', label: humanizeField('test_name'), required: true },
  { key: 'result_value', label: humanizeField('result_value'), required: true },
  { key: 'normal_range', label: humanizeField('normal_range') },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'is_abnormal', label: humanizeField('is_abnormal'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  lab_order_id: '',
  test_name: '',
  result_value: '',
  normal_range: '',
  unit: '',
  is_abnormal: false,
  notes: '',
  recorded_at: '',
}

/**
 * Transisi status hasil lab: final -> completed / cancelled.
 *
 * Keduanya jalan buntu — LabResultService::TRANSITIONS tidak memberi jalan
 * keluar dari completed maupun cancelled. Karena itu tombolnya hilang begitu
 * status berpindah, bukan sekadar dinonaktifkan: menyisakan tombol yang pasti
 * ditolak hanya membuat petugas menebak apa yang salah.
 */
const actions: WorkflowAction<LabResult>[] = [
  {
    key: 'complete',
    label: 'Selesaikan',
    method: 'post',
    path: (item) => `/lab-results/${item.id}/transition`,
    payload: { status: 'completed' },
    visibleWhen: (item) => item.status === 'final',
    confirmDescription: (item, label) =>
      `Hasil ${label(item)} ditandai selesai dan tidak dapat diubah lagi.`,
  },
  {
    key: 'cancel',
    label: 'Batalkan',
    method: 'post',
    path: (item) => `/lab-results/${item.id}/transition`,
    payload: { status: 'cancelled' },
    variant: 'destructive',
    visibleWhen: (item) => item.status === 'final',
    confirmDescription: (item, label) =>
      `Hasil ${label(item)} dibatalkan dan tidak dapat dikembalikan.`,
  },
]

export function LabResultListPage() {
  const resource = useLabResultResource()
  const title = humanizeModuleName('LayananLabResult')

  return (
    <WorkflowListPage<LabResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabResultEndpoint}
      columns={[...columns, statusColumn]}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
