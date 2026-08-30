// codegen:preserve — master linen dipisahkan dari siklus pergerakannya.
import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeModuleName } from '@/shared/labels'
import { useLinenItemResource } from '../api'
import type { LinenItem } from '../types'

const columns: ColumnDef<LinenItem, unknown>[] = [
  {
    header: 'Kode Linen', accessorKey: 'linen_code',
  },
  {
    header: 'Jenis Linen', accessorKey: 'linen_type',
  },
  {
    header: 'Bangsal', cell: ({ row }) => <RelationLabel endpoint="/wards" id={row.original.ward_id} />,
  },
]

const fields: CrudField[] = [
  { key: 'linen_code', label: 'Kode Linen', required: true }, { key: 'linen_type', label: 'Jenis Linen', required: true },
  { key: 'ward_id', label: 'Bangsal', type: 'relation', relationEndpoint: '/wards' },
]

const emptyForm = {
  linen_code: '', linen_type: '', ward_id: null,
}

export function LinenItemListPage() {
  const resource = useLinenItemResource()
  const title = humanizeModuleName('InventoryLinenTracking')

  return (
    <CrudDialogPage<LinenItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.linen_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
