import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useFormularyRestrictionResource } from '../api'
import type { FormularyRestriction } from '../types'

const columns: ColumnDef<FormularyRestriction, unknown>[] = [
  {
    header: humanizeField('drug_name'),
    accessorKey: 'drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).drug_name ?? '—'),
  },
  {
    header: humanizeField('formulary_category'),
    accessorKey: 'formulary_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).formulary_category ?? '—'),
  },
  {
    header: humanizeField('requires_substitution'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_substitution ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('substitution_drug_name'),
    accessorKey: 'substitution_drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).substitution_drug_name ?? '—'),
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
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'formulary_category', label: humanizeField('formulary_category'), required: true },
  { key: 'requires_substitution', label: humanizeField('requires_substitution'), type: 'checkbox' },
  { key: 'substitution_drug_name', label: humanizeField('substitution_drug_name') },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  drug_name: '',
  formulary_category: '',
  requires_substitution: false,
  substitution_drug_name: '',
  notes: '',
  is_active: false,
}

export function FormularyRestrictionListPage() {
  const resource = useFormularyRestrictionResource()
  const title = humanizeModuleName('GeneralFormularyRestriction')

  return (
    <CrudDialogPage<FormularyRestriction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.drug_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
