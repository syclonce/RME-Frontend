import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MaintenanceWorkOrderEndpoint, useMaintenanceWorkOrderResource } from '../api'
import type { MaintenanceWorkOrder } from '../types'

const STATUS_LABELS: Record<string, string> = {
  open: 'Terbuka',
  in_progress: 'Dalam Pengerjaan',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-red-100 text-red-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-500',
}

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
  critical: 'Kritis',
}

const columns: ColumnDef<MaintenanceWorkOrder, unknown>[] = [
  {
    header: humanizeField('asset_id'),
    cell: ({ row }) => <RelationLabel endpoint="/maintenance-assets" id={(row.original as unknown as Record<string, unknown>).asset_id as number | null} />,
  },
  {
    header: humanizeField('issue_description'),
    accessorKey: 'issue_description',
    cell: ({ row }) => {
      const v = String((row.original as unknown as Record<string, unknown>).issue_description ?? '—')
      return <span className="max-w-xs truncate block" title={v}>{v.length > 60 ? v.slice(0, 60) + '…' : v}</span>
    },
  },
  {
    header: humanizeField('priority'),
    accessorKey: 'priority',
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).priority as string | undefined
      return v ? PRIORITY_LABELS[v] ?? v : '—'
    },
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status as string | undefined
      if (!v) return '—'
      return (
        <Badge variant="outline" className={STATUS_COLORS[v] ?? ''}>
          {STATUS_LABELS[v] ?? v}
        </Badge>
      )
    },
  },
  {
    header: humanizeField('assigned_to'),
    cell: ({ row }) => <RelationLabel endpoint="/employees" id={(row.original as unknown as Record<string, unknown>).assigned_to as number | null} />,
  },
  {
    header: humanizeField('reported_at'),
    accessorKey: 'reported_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reported_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'asset_id', label: humanizeField('asset_id'), type: 'relation', relationEndpoint: '/maintenance-assets', required: true },
  { key: 'reported_by', label: humanizeField('reported_by'), type: 'number', required: true },
  { key: 'issue_description', label: humanizeField('issue_description'), type: 'textarea', required: true },
  {
    key: 'priority',
    label: humanizeField('priority'),
    type: 'select',
    options: [
      { value: 'low', label: 'Rendah' },
      { value: 'medium', label: 'Sedang' },
      { value: 'high', label: 'Tinggi' },
      { value: 'critical', label: 'Kritis' },
    ],
  },
  { key: 'reported_at', label: humanizeField('reported_at'), type: 'date' },
]

const emptyForm = {
  asset_id: null,
  reported_by: '',
  issue_description: '',
  priority: 'medium',
  reported_at: '',
}

const actions: WorkflowAction<MaintenanceWorkOrder>[] = [
  {
    key: 'assign',
    label: 'Tugaskan',
    method: 'post',
    path: (item) => `/work-orders/${item.id}/assign`,
    fields: [
      { key: 'assigned_to', label: humanizeField('assigned_to'), type: 'number', required: true },
    ],
    emptyForm: {
      assigned_to: '',
    },
    visibleWhen: (item) => {
      const s = (item as unknown as Record<string, unknown>).status
      return s === 'open'
    },
  },
  {
    key: 'complete',
    label: 'Selesaikan',
    method: 'post',
    path: (item) => `/work-orders/${item.id}/complete`,
    visibleWhen: (item) => {
      const s = (item as unknown as Record<string, unknown>).status
      return s === 'in_progress'
    },
    confirmDescription: (item, label) =>
      `Selesaikan work order "${label(item)}"? Status akan berubah menjadi completed.`,
  },
]

export function MaintenanceWorkOrderListPage() {
  const resource = useMaintenanceWorkOrderResource()
  const title = humanizeModuleName('GeneralFacilityMaintenance')

  return (
    <WorkflowListPage<MaintenanceWorkOrder>
      title={`${title} Work Order`}
      description="Kelola tiket perbaikan asset (work order) dengan alur: open → in_progress → completed."
      endpoint={MaintenanceWorkOrderEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.issue_description?.slice(0, 40) ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
