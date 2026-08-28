import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePrescriptionFrequencyRuleResource } from '../api'
import type { PrescriptionFrequencyRule } from '../types'

const columns: ColumnDef<PrescriptionFrequencyRule, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
  },
  {
    header: humanizeField('times_per_day'),
    accessorKey: 'times_per_day',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).times_per_day ?? '—'),
  },
  {
    header: humanizeField('interval_hours'),
    accessorKey: 'interval_hours',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).interval_hours ?? '—'),
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
  { key: 'code', label: humanizeField('code'), required: true },
  { key: 'description', label: humanizeField('description') },
  { key: 'times_per_day', label: humanizeField('times_per_day'), type: 'number', required: true },
  { key: 'interval_hours', label: humanizeField('interval_hours'), type: 'number' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  code: '',
  description: '',
  times_per_day: '',
  interval_hours: '',
  is_active: false,
}

export function PrescriptionFrequencyRuleListPage() {
  const resource = usePrescriptionFrequencyRuleResource()
  const title = humanizeModuleName('GeneralPrescriptionFrequencyRule')

  return (
    <CrudDialogPage<PrescriptionFrequencyRule>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
