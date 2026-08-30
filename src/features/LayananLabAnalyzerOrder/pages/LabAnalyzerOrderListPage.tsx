import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabAnalyzerOrderEndpoint, useLabAnalyzerOrderResource } from '../api'
import type { LabAnalyzerOrder } from '../types'

const STATUS_COLORS: Record<string, string> = {
  ordered: 'bg-blue-100 text-blue-800',
  sent_to_analyzer: 'bg-yellow-100 text-yellow-800',
  result_received: 'bg-orange-100 text-orange-800',
  verified: 'bg-green-100 text-green-800',
}

const columns: ColumnDef<LabAnalyzerOrder, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('vendor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-analyzer-vendors" id={(row.original as unknown as Record<string, unknown>).vendor_id as number | null} />,
  },
  {
    header: humanizeField('test_code'),
    accessorKey: 'test_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_code ?? '—'),
  },
  {
    header: humanizeField('ordered_by'),
    accessorKey: 'ordered_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordered_by ?? '—'),
  },
  {
    header: humanizeField('ordered_at'),
    accessorKey: 'ordered_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).ordered_at ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status as string | undefined
      return v ? (
        <Badge variant="outline" className={STATUS_COLORS[v] ?? ''}>{v}</Badge>
      ) : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'vendor_id', label: humanizeField('vendor_id'), type: 'relation', relationEndpoint: '/lab-analyzer-vendors' },
  { key: 'test_code', label: humanizeField('test_code'), required: true },
  { key: 'ordered_by', label: humanizeField('ordered_by'), type: 'number', required: true },
  { key: 'ordered_at', label: humanizeField('ordered_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  vendor_id: null,
  test_code: '',
  ordered_by: '',
  ordered_at: '',
}

const actions: WorkflowAction<LabAnalyzerOrder>[] = [
  {
    key: 'send-to-analyzer',
    label: 'Kirim ke Analyzer',
    method: 'post',
    path: (item) => `/lab-analyzer-orders/${item.id}/send-to-analyzer`,
    visibleWhen: (item) => {
      const s = (item as unknown as Record<string, unknown>).status
      return s === 'ordered'
    },
    confirmDescription: (item, label) =>
      `Kirim order "${label(item)}" ke analyzer? Status akan berubah menjadi sent_to_analyzer.`,
  },
  {
    key: 'result',
    label: 'Catat Hasil',
    method: 'post',
    path: (item) => `/lab-analyzer-orders/${item.id}/result`,
    fields: [
      { key: 'raw_result_text', label: humanizeField('raw_result_text'), type: 'textarea', required: true },
    ],
    emptyForm: {
      raw_result_text: '',
    },
    visibleWhen: (item) => {
      const s = (item as unknown as Record<string, unknown>).status
      return s === 'sent_to_analyzer'
    },
  },
  {
    key: 'verify',
    label: 'Verifikasi',
    method: 'post',
    path: (item) => `/lab-analyzer-orders/${item.id}/verify`,
    visibleWhen: (item) => {
      const s = (item as unknown as Record<string, unknown>).status
      return s === 'result_received'
    },
    confirmDescription: (item, label) =>
      `Verifikasi hasil order "${label(item)}"? Status akan berubah menjadi verified.`,
  },
]

export function LabAnalyzerOrderListPage() {
  const resource = useLabAnalyzerOrderResource()
  const title = humanizeModuleName('LayananLabAnalyzerOrder')

  return (
    <WorkflowListPage<LabAnalyzerOrder>
      title={`${title} Order`}
      description="Kelola order lab analyzer LIS dengan alur: ordered → sent_to_analyzer → result_received → verified."
      endpoint={LayananLabAnalyzerOrderEndpoint}
      columns={columns}
      capabilities={{
        canCreate: true,
        canUpdate: true,
        canDestroy: true,
        canUpdateWhen: (item) => item.status === 'ordered',
        canDestroyWhen: (item) => item.status === 'ordered',
      }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_code ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
