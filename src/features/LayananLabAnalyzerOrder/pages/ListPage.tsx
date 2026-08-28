import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananLabAnalyzerOrderEndpoint, useLabAnalyzerVendorResource } from '../api'
import type { LabAnalyzerVendor } from '../types'

const columns: ColumnDef<LabAnalyzerVendor, unknown>[] = [
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
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
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

const actions: WorkflowAction<LabAnalyzerVendor>[] = []

export function LabAnalyzerVendorListPage() {
  const resource = useLabAnalyzerVendorResource()
  const title = humanizeModuleName('LayananLabAnalyzerOrder')

  return (
    <WorkflowListPage<LabAnalyzerVendor>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananLabAnalyzerOrderEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.test_code ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
