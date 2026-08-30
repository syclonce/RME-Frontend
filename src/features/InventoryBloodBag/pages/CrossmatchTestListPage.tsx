import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { WorkflowListPage, type WorkflowAction } from '@/shared/components/WorkflowListPage'
import { CrossmatchTestEndpoint, useCrossmatchTestResource } from '../api'
import type { CrossmatchTest } from '../types'

const columns: ColumnDef<CrossmatchTest, unknown>[] = [
  { header: 'Kantong Darah', cell: ({ row }) => <RelationLabel endpoint="/blood-bags" id={row.original.blood_bag_id} /> },
  { header: 'Pasien', cell: ({ row }) => <RelationLabel endpoint="/patients" id={row.original.patient_id} /> },
  { header: 'Mayor', accessorKey: 'major_result' }, { header: 'Minor', accessorKey: 'minor_result' },
  { header: 'Auto Control', accessorKey: 'auto_control' },
  { header: 'Kompatibel', cell: ({ row }) => <Badge variant={row.original.is_compatible ? 'default' : 'destructive'}>{row.original.is_compatible ? 'Ya' : 'Tidak'}</Badge> },
  { header: 'Reservasi Sampai', accessorKey: 'reserved_until' },
]

const actions: WorkflowAction<CrossmatchTest>[] = [{
  key: 'release', label: 'Lepas Reservasi', method: 'post', path: (item) => `/crossmatch-tests/${item.id}/release`,
  visibleWhen: (item) => item.is_compatible && item.blood_bag_status === 'crossmatch_reserved',
}]

export function CrossmatchTestListPage() {
  const resource = useCrossmatchTestResource()
  return <WorkflowListPage<CrossmatchTest>
    title="Hasil Crossmatch Darah" description="Tinjau hasil uji kompatibilitas dan lepaskan reservasi kantong bila batal digunakan."
    endpoint={CrossmatchTestEndpoint} columns={columns} capabilities={{ canCreate: false, canUpdate: false, canDestroy: false }}
    fields={[]} emptyForm={{}} itemLabel={(item) => `Crossmatch #${item.id}`} actions={actions} resource={resource}
  />
}
