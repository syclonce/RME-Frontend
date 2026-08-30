// codegen:preserve — aksi order analyzer dibatasi berdasarkan status.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLabAnalyzerVendorResource } from '../api'
import type { LabAnalyzerVendor } from '../types'

const columns: ColumnDef<LabAnalyzerVendor, unknown>[] = [
  {
    header: humanizeField('vendor_name'),
    accessorKey: 'vendor_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).vendor_name ?? '—'),
  },
  {
    header: humanizeField('connection_notes'),
    accessorKey: 'connection_notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).connection_notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'vendor_name', label: humanizeField('vendor_name'), required: true },
  { key: 'connection_notes', label: humanizeField('connection_notes'), type: 'textarea' },
]

const emptyForm = {
  vendor_name: '',
  connection_notes: '',
}

export function LabAnalyzerVendorListPage() {
  const resource = useLabAnalyzerVendorResource()
  const title = humanizeModuleName('LayananLabAnalyzerOrder')

  return (
    <CrudDialogPage<LabAnalyzerVendor>
      title={`${title} Vendor`}
      description="Kelola katalog vendor/driver analyzer LIS."
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.vendor_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
