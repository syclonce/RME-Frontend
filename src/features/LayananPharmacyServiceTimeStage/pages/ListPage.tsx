import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPharmacyServiceTimeStageEndpoint, usePharmacyServiceTimeStageResource } from '../api'
import type { PharmacyServiceTimeStage } from '../types'

const columns: ColumnDef<PharmacyServiceTimeStage, unknown>[] = [
  {
    header: humanizeField('pharmacy_service_time_id'),
    cell: ({ row }) => <RelationLabel endpoint="/pharmacy-service-times" id={(row.original as unknown as Record<string, unknown>).pharmacy_service_time_id as number | null} />,
  },
  {
    header: humanizeField('stage_name'),
    accessorKey: 'stage_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).stage_name ?? '—'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'pharmacy_service_time_id', label: humanizeField('pharmacy_service_time_id'), type: 'relation', relationEndpoint: '/pharmacy-service-times', required: true },
  { key: 'stage_name', label: humanizeField('stage_name'), required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number' },
]

const emptyForm = {
  pharmacy_service_time_id: null,
  stage_name: '',
  recorded_at: '',
  recorded_by: '',
}

const actions: WorkflowAction<PharmacyServiceTimeStage>[] = []

export function PharmacyServiceTimeStageListPage() {
  const resource = usePharmacyServiceTimeStageResource()
  const title = humanizeModuleName('LayananPharmacyServiceTimeStage')

  return (
    <WorkflowListPage<PharmacyServiceTimeStage>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananPharmacyServiceTimeStageEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.stage_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
