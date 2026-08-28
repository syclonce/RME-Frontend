import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { PegawaiPracticeLicenseEndpoint, usePracticeLicenseResource } from '../api'
import type { PracticeLicense } from '../types'

const columns: ColumnDef<PracticeLicense, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('license_type'),
    accessorKey: 'license_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).license_type ?? '—'),
  },
  {
    header: humanizeField('license_number'),
    accessorKey: 'license_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).license_number ?? '—'),
  },
  {
    header: humanizeField('issued_at'),
    accessorKey: 'issued_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issued_at ?? '—'),
  },
  {
    header: humanizeField('expires_at'),
    accessorKey: 'expires_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).expires_at ?? '—'),
  },
  {
    header: humanizeField('issuing_authority'),
    accessorKey: 'issuing_authority',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).issuing_authority ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'number', required: true },
  { key: 'license_type', label: humanizeField('license_type'), type: 'select', required: true, options: [{"value":"STR","label":"STR"},{"value":"SIP","label":"SIP"}] },
  { key: 'license_number', label: humanizeField('license_number'), required: true },
  { key: 'issued_at', label: humanizeField('issued_at'), type: 'date' },
  { key: 'expires_at', label: humanizeField('expires_at'), type: 'date' },
  { key: 'issuing_authority', label: humanizeField('issuing_authority') },
]

const emptyForm = {
  employee_id: '',
  license_type: '',
  license_number: '',
  issued_at: '',
  expires_at: '',
  issuing_authority: '',
}

const actions: WorkflowAction<PracticeLicense>[] = []

export function PracticeLicenseListPage() {
  const resource = usePracticeLicenseResource()
  const title = humanizeModuleName('PegawaiPracticeLicense')

  return (
    <WorkflowListPage<PracticeLicense>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={PegawaiPracticeLicenseEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.license_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
