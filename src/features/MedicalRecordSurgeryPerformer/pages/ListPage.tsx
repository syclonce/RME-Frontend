import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSurgeryPerformerResource } from '../api'
import type { SurgeryPerformer } from '../types'

const columns: ColumnDef<SurgeryPerformer, unknown>[] = [
  {
    header: humanizeField('surgery_id'),
    cell: ({ row }) => <RelationLabel endpoint="/surgeries" id={(row.original as unknown as Record<string, unknown>).surgery_id as number | null} />,
  },
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('role'),
    accessorKey: 'role',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).role ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'surgery_id', label: humanizeField('surgery_id'), type: 'relation', relationEndpoint: '/surgeries' },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits' },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors' },
  { key: 'role', label: humanizeField('role') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  surgery_id: null,
  visit_id: null,
  doctor_id: null,
  role: '',
  notes: '',
}

export function SurgeryPerformerListPage() {
  const resource = useSurgeryPerformerResource()
  const title = humanizeModuleName('MedicalRecordSurgeryPerformer')

  return (
    <CrudDialogPage<SurgeryPerformer>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.role ?? `#${item.id}`}
      resource={resource}
    />
  )
}
