import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDurationRestrictionResource } from '../api'
import type { DurationRestriction } from '../types'

const columns: ColumnDef<DurationRestriction, unknown>[] = [
  {
    header: humanizeField('antibiotic_name'),
    accessorKey: 'antibiotic_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).antibiotic_name ?? '—'),
  },
  {
    header: humanizeField('max_days'),
    accessorKey: 'max_days',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).max_days ?? '—'),
  },
  {
    header: humanizeField('min_days'),
    accessorKey: 'min_days',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).min_days ?? '—'),
  },
  {
    header: humanizeField('requires_reevaluation'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_reevaluation ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
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
  { key: 'antibiotic_name', label: humanizeField('antibiotic_name'), required: true },
  { key: 'max_days', label: humanizeField('max_days'), type: 'number', required: true },
  { key: 'min_days', label: humanizeField('min_days'), type: 'number' },
  { key: 'requires_reevaluation', label: humanizeField('requires_reevaluation'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  antibiotic_name: '',
  max_days: '',
  min_days: '',
  requires_reevaluation: false,
  notes: '',
  is_active: false,
}

export function DurationRestrictionListPage() {
  const resource = useDurationRestrictionResource()
  const title = humanizeModuleName('GeneralDurationRestriction')

  return (
    <CrudDialogPage<DurationRestriction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.antibiotic_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
