import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { AuditIncidentReportEndpoint, useIncidentReportResource } from '../api'
import type { IncidentReport } from '../types'

const columns: ColumnDef<IncidentReport, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('incident_category'),
    accessorKey: 'incident_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).incident_category ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('occurred_at'),
    accessorKey: 'occurred_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).occurred_at ?? '—'),
  },
  {
    header: humanizeField('reported_by'),
    accessorKey: 'reported_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reported_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number' },
  { key: 'incident_category', label: humanizeField('incident_category'), required: true },
  { key: 'description', label: humanizeField('description'), required: true },
  { key: 'occurred_at', label: humanizeField('occurred_at'), type: 'date', required: true },
  { key: 'reported_by', label: humanizeField('reported_by'), type: 'number', required: true },
  { key: 'impact_score', label: humanizeField('impact_score'), type: 'number', required: true },
  { key: 'probability_score', label: humanizeField('probability_score'), type: 'number', required: true },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  incident_category: '',
  description: '',
  occurred_at: '',
  reported_by: '',
  impact_score: '',
  probability_score: '',
}

const actions: WorkflowAction<IncidentReport>[] = [
  {
    key: 'investigate',
    label: 'Investigasi',
    method: 'post',
    path: (item) => `/incident-reports/${item.id}/investigate`,
  },
  {
    key: 'rca',
    label: 'RCA',
    method: 'post',
    path: (item) => `/incident-reports/${item.id}/rca`,
  },
  {
    key: 'close',
    label: 'Tutup',
    method: 'post',
    path: (item) => `/incident-reports/${item.id}/close`,
    variant: 'destructive',
  },
]

export function IncidentReportListPage() {
  const resource = useIncidentReportResource()
  const title = humanizeModuleName('AuditIncidentReport')

  return (
    <WorkflowListPage<IncidentReport>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={AuditIncidentReportEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.incident_category ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
