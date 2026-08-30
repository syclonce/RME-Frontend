import type { ColumnDef } from '@tanstack/react-table'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { useInfectionCaseResource } from '../api'
import type { InfectionCase } from '../types'

const columns: ColumnDef<InfectionCase, unknown>[] = [
  { header: 'Kunjungan', cell: ({ row }) => <RelationLabel endpoint="/visits" id={row.original.visit_id} /> },
  { header: 'Jenis Infeksi', accessorKey: 'infection_type' }, { header: 'Tanggal Diagnosis', accessorKey: 'diagnosed_at' },
  { header: 'Hari-Alat Terkait', cell: ({ row }) => <RelationLabel endpoint="/device-days" id={row.original.related_device_day_id} /> },
]
const fields: CrudField[] = [
  { key: 'visit_id', label: 'Kunjungan', type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'infection_type', label: 'Jenis Infeksi', type: 'select', required: true, options: [
    { value: 'ISK', label: 'ISK' }, { value: 'plebitis', label: 'Plebitis' }, { value: 'IDO', label: 'IDO' }, { value: 'VAP', label: 'VAP' },
  ] },
  { key: 'diagnosed_at', label: 'Tanggal Diagnosis', type: 'date', required: true },
  { key: 'related_device_day_id', label: 'Hari-Alat Terkait', type: 'relation', relationEndpoint: '/device-days' },
]

export function InfectionCaseListPage() {
  const resource = useInfectionCaseResource()
  return <CrudDialogPage<InfectionCase> title="Kasus Infeksi" description="Catat numerator surveilans infeksi terkait pelayanan."
    columns={columns} fields={fields} emptyForm={{ visit_id: null, infection_type: 'ISK', diagnosed_at: '', related_device_day_id: null }}
    itemLabel={(item) => `${item.infection_type} #${item.id}`} resource={resource} />
}
