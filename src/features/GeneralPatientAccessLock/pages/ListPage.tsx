import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePatientAccessLockResource } from '../api'
import type { PatientAccessLock } from '../types'

const columns: ColumnDef<PatientAccessLock, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('locked_by'),
    accessorKey: 'locked_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).locked_by ?? '—'),
  },
  {
    header: humanizeField('reason'),
    accessorKey: 'reason',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).reason ?? '—'),
  },
  {
    header: humanizeField('locked_at'),
    accessorKey: 'locked_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).locked_at ?? '—'),
  },
  {
    header: humanizeField('unlocked_at'),
    accessorKey: 'unlocked_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unlocked_at ?? '—'),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) =>
      (row.original as unknown as Record<string, unknown>).is_active ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">Nonaktif</Badge>
      ),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'locked_by', label: humanizeField('locked_by'), type: 'number' },
  { key: 'reason', label: humanizeField('reason'), required: true },
  { key: 'locked_at', label: humanizeField('locked_at'), type: 'date' },
]

const emptyForm = {
  patient_id: '',
  locked_by: '',
  reason: '',
  locked_at: '',
}

export function PatientAccessLockListPage() {
  const resource = usePatientAccessLockResource()
  const title = humanizeModuleName('GeneralPatientAccessLock')

  return (
    <CrudDialogPage<PatientAccessLock>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.reason ?? `#${item.id}`}
      resource={resource}
    />
  )
}
