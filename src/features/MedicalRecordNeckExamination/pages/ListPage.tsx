import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNeckExaminationResource } from '../api'
import type { NeckExamination } from '../types'

const columns: ColumnDef<NeckExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('lymph_nodes'),
    accessorKey: 'lymph_nodes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).lymph_nodes ?? '—'),
  },
  {
    header: humanizeField('thyroid'),
    accessorKey: 'thyroid',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).thyroid ?? '—'),
  },
  {
    header: humanizeField('jugular_venous_pressure'),
    accessorKey: 'jugular_venous_pressure',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).jugular_venous_pressure ?? '—'),
  },
  {
    header: humanizeField('trachea_position'),
    accessorKey: 'trachea_position',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).trachea_position ?? '—'),
  },
  {
    header: humanizeField('mass'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).mass ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'lymph_nodes', label: humanizeField('lymph_nodes') },
  { key: 'thyroid', label: humanizeField('thyroid') },
  { key: 'jugular_venous_pressure', label: humanizeField('jugular_venous_pressure') },
  { key: 'trachea_position', label: humanizeField('trachea_position') },
  { key: 'mass', label: humanizeField('mass'), type: 'checkbox' },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  lymph_nodes: '',
  thyroid: '',
  jugular_venous_pressure: '',
  trachea_position: '',
  mass: false,
  findings: '',
  examined_at: '',
}

export function NeckExaminationListPage() {
  const resource = useNeckExaminationResource()
  const title = humanizeModuleName('MedicalRecordNeckExamination')

  return (
    <CrudDialogPage<NeckExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.lymph_nodes ?? `#${item.id}`}
      resource={resource}
    />
  )
}
