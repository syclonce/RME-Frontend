import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useProcedureSurgeryResource } from '../api'
import type { ProcedureSurgery } from '../types'

const columns: ColumnDef<ProcedureSurgery, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('procedure_id'),
    cell: ({ row }) => <RelationLabel endpoint="/procedures" id={(row.original as unknown as Record<string, unknown>).procedure_id as number | null} />,
  },
  {
    header: humanizeField('surgery_name'),
    accessorKey: 'surgery_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).surgery_name ?? '—'),
  },
  {
    header: humanizeField('surgery_type'),
    accessorKey: 'surgery_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).surgery_type ?? '—'),
  },
  {
    header: humanizeField('anesthesia_type'),
    accessorKey: 'anesthesia_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).anesthesia_type ?? '—'),
  },
  {
    header: humanizeField('performed_at'),
    accessorKey: 'performed_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).performed_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'procedure_id', label: humanizeField('procedure_id'), type: 'relation', relationEndpoint: '/procedures' },
  { key: 'surgery_name', label: humanizeField('surgery_name'), required: true },
  { key: 'surgery_type', label: humanizeField('surgery_type') },
  { key: 'anesthesia_type', label: humanizeField('anesthesia_type') },
  { key: 'performed_at', label: humanizeField('performed_at'), type: 'date' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: null,
  procedure_id: null,
  surgery_name: '',
  surgery_type: '',
  anesthesia_type: '',
  performed_at: '',
  notes: '',
}

export function ProcedureSurgeryListPage() {
  const resource = useProcedureSurgeryResource()
  const title = humanizeModuleName('MedicalRecordProcedureSurgery')

  return (
    <CrudDialogPage<ProcedureSurgery>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.surgery_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
