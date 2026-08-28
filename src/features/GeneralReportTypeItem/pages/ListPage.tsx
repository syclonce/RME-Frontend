import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useReportTypeItemResource } from '../api'
import type { ReportTypeItem } from '../types'

const columns: ColumnDef<ReportTypeItem, unknown>[] = [
  {
    header: humanizeField('report_type_id'),
    cell: ({ row }) => <RelationLabel endpoint="/report-types" id={(row.original as unknown as Record<string, unknown>).report_type_id as number | null} />,
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('sequence'),
    accessorKey: 'sequence',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sequence ?? '—'),
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
  { key: 'report_type_id', label: humanizeField('report_type_id'), type: 'relation', relationEndpoint: '/report-types', required: true },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'code', label: humanizeField('code') },
  { key: 'sequence', label: humanizeField('sequence'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  report_type_id: null,
  name: '',
  code: '',
  sequence: '',
  is_active: false,
}

export function ReportTypeItemListPage() {
  const resource = useReportTypeItemResource()
  const title = humanizeModuleName('GeneralReportTypeItem')

  return (
    <CrudDialogPage<ReportTypeItem>
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
