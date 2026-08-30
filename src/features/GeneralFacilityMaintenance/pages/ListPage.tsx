// codegen:preserve — modul ini juga memiliki workflow work order pemeliharaan.
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { GeneralFacilityMaintenanceEndpoint, useMaintenanceAssetResource } from '../api'
import type { MaintenanceAsset } from '../types'

const columns: ColumnDef<MaintenanceAsset, unknown>[] = [
  {
    header: humanizeField('asset_code'),
    accessorKey: 'asset_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).asset_code ?? '—'),
  },
  {
    header: humanizeField('asset_name'),
    accessorKey: 'asset_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).asset_name ?? '—'),
  },
  {
    header: humanizeField('location'),
    accessorKey: 'location',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).location ?? '—'),
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={(row.original as unknown as Record<string, unknown>).ward_id as number | null} />,
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
  { key: 'asset_code', label: humanizeField('asset_code'), required: true },
  { key: 'asset_name', label: humanizeField('asset_name'), required: true },
  { key: 'location', label: humanizeField('location') },
  { key: 'ward_id', label: humanizeField('ward_id'), type: 'relation', relationEndpoint: '/wards' },
  { key: 'status', label: humanizeField('status') },
]

const emptyForm = {
  asset_code: '',
  asset_name: '',
  location: '',
  ward_id: null,
  status: '',
}

const actions: WorkflowAction<MaintenanceAsset>[] = []

export function MaintenanceAssetListPage() {
  const resource = useMaintenanceAssetResource()
  const title = humanizeModuleName('GeneralFacilityMaintenance')

  return (
    <WorkflowListPage<MaintenanceAsset>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={GeneralFacilityMaintenanceEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.asset_code ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
