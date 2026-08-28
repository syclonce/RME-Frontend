import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDiagnosisIndicatorMappingResource } from '../api'
import type { DiagnosisIndicatorMapping } from '../types'

const columns: ColumnDef<DiagnosisIndicatorMapping, unknown>[] = [
  {
    header: humanizeField('diagnosis_id'),
    accessorKey: 'diagnosis_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).diagnosis_id ?? '—'),
  },
  {
    header: humanizeField('indicator_code'),
    accessorKey: 'indicator_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indicator_code ?? '—'),
  },
  {
    header: humanizeField('indicator_name'),
    accessorKey: 'indicator_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indicator_name ?? '—'),
  },
  {
    header: humanizeField('target_score'),
    accessorKey: 'target_score',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).target_score ?? '—'),
  },
  {
    header: humanizeField('description'),
    accessorKey: 'description',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).description ?? '—'),
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
  { key: 'diagnosis_id', label: humanizeField('diagnosis_id'), type: 'number', required: true },
  { key: 'indicator_code', label: humanizeField('indicator_code'), required: true },
  { key: 'indicator_name', label: humanizeField('indicator_name'), required: true },
  { key: 'target_score', label: humanizeField('target_score') },
  { key: 'description', label: humanizeField('description') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  diagnosis_id: '',
  indicator_code: '',
  indicator_name: '',
  target_score: '',
  description: '',
  is_active: false,
}

export function DiagnosisIndicatorMappingListPage() {
  const resource = useDiagnosisIndicatorMappingResource()
  const title = humanizeModuleName('MedicalRecordDiagnosisIndicatorMapping')

  return (
    <CrudDialogPage<DiagnosisIndicatorMapping>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.indicator_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
