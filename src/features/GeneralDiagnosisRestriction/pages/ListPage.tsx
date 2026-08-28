import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDiagnosisRestrictionResource } from '../api'
import type { DiagnosisRestriction } from '../types'

const columns: ColumnDef<DiagnosisRestriction, unknown>[] = [
  {
    header: humanizeField('diagnosis_code_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnosis-codes" id={(row.original as unknown as Record<string, unknown>).diagnosis_code_id as number | null} />,
  },
  {
    header: humanizeField('restricted_antibiotic_name'),
    accessorKey: 'restricted_antibiotic_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).restricted_antibiotic_name ?? '—'),
  },
  {
    header: humanizeField('requires_justification'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_justification ? 'Ya' : 'Tidak'),
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
  { key: 'diagnosis_code_id', label: humanizeField('diagnosis_code_id'), type: 'relation', relationEndpoint: '/diagnosis-codes', required: true },
  { key: 'restricted_antibiotic_name', label: humanizeField('restricted_antibiotic_name'), required: true },
  { key: 'requires_justification', label: humanizeField('requires_justification'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  diagnosis_code_id: null,
  restricted_antibiotic_name: '',
  requires_justification: false,
  notes: '',
  is_active: false,
}

export function DiagnosisRestrictionListPage() {
  const resource = useDiagnosisRestrictionResource()
  const title = humanizeModuleName('GeneralDiagnosisRestriction')

  return (
    <CrudDialogPage<DiagnosisRestriction>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.restricted_antibiotic_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
