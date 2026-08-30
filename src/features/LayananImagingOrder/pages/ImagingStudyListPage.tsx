import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { ImagingStudyEndpoint, useImagingStudyResource } from '../api'
import type { ImagingStudy } from '../types'

const columns: ColumnDef<ImagingStudy, unknown>[] = [
  {
    header: humanizeField('imaging_order_id'),
    cell: ({ row }) => <RelationLabel endpoint="/imaging-orders" id={(row.original as unknown as Record<string, unknown>).imaging_order_id as number | null} />,
  },
  {
    header: humanizeField('study_instance_uid'),
    accessorKey: 'study_instance_uid',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).study_instance_uid ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
  {
    header: humanizeField('findings_summary'),
    accessorKey: 'findings_summary',
    cell: ({ row }) => {
      const v = String((row.original as unknown as Record<string, unknown>).findings_summary ?? '—')
      return <span className="max-w-xs truncate block" title={v}>{v.length > 60 ? v.slice(0, 60) + '…' : v}</span>
    },
  },
]

const fields: CrudField[] = [
  { key: 'imaging_order_id', label: humanizeField('imaging_order_id'), type: 'relation', relationEndpoint: '/imaging-orders', required: true },
  { key: 'study_instance_uid', label: humanizeField('study_instance_uid') },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date', required: true },
  { key: 'findings_summary', label: humanizeField('findings_summary'), type: 'textarea' },
  { key: 'report_url', label: humanizeField('report_url') },
]

const emptyForm = {
  imaging_order_id: null,
  study_instance_uid: '',
  performed_at: '',
  findings_summary: '',
  report_url: '',
}

export function ImagingStudyListPage() {
  const resource = useImagingStudyResource()
  const title = humanizeModuleName('LayananImagingOrder')

  return (
    <WorkflowListPage<ImagingStudy>
      title={`${title} Studi`}
      description="Kelola hasil studi imaging (pencatatan pasca order selesai)."
      columns={columns}
      endpoint={ImagingStudyEndpoint}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.study_instance_uid ?? `#${item.id}`}
      resource={resource}
      actions={[]}
    />
  )
}
