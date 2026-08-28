import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useReportTypeResource } from '../api'
import type { ReportType } from '../types'

const columns: ColumnDef<ReportType, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('class_name'),
    accessorKey: 'class_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).class_name ?? '—'),
  },
  {
    header: humanizeField('module'),
    accessorKey: 'module',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).module ?? '—'),
  },
  {
    header: humanizeField('level'),
    accessorKey: 'level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).level ?? '—'),
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
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'class_name', label: humanizeField('class_name'), required: true },
  { key: 'module', label: humanizeField('module'), required: true },
  { key: 'level', label: humanizeField('level'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  name: '',
  class_name: '',
  module: '',
  level: '',
  is_active: false,
}

export function ReportTypeListPage() {
  const resource = useReportTypeResource()
  const title = humanizeModuleName('GeneralReportType')

  return (
    <CrudDialogPage<ReportType>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
