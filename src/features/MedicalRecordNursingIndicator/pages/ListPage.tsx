import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useNursingIndicatorResource } from '../api'
import type { NursingIndicator } from '../types'

const columns: ColumnDef<NursingIndicator, unknown>[] = [
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('nursing_indicator_type_id'),
    cell: ({ row }) => <RelationLabel endpoint="/nursing-indicator-types" id={(row.original as unknown as Record<string, unknown>).nursing_indicator_type_id as number | null} />,
  },
  {
    header: humanizeField('unit'),
    accessorKey: 'unit',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).unit ?? '—'),
  },
  {
    header: humanizeField('target_value'),
    accessorKey: 'target_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).target_value ?? '—'),
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
  { key: 'code', label: humanizeField('code') },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'nursing_indicator_type_id', label: humanizeField('nursing_indicator_type_id'), type: 'relation', relationEndpoint: '/nursing-indicator-types' },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'target_value', label: humanizeField('target_value') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  code: '',
  name: '',
  nursing_indicator_type_id: null,
  unit: '',
  target_value: '',
  is_active: false,
}

export function NursingIndicatorListPage() {
  const resource = useNursingIndicatorResource()
  const title = humanizeModuleName('MedicalRecordNursingIndicator')

  return (
    <CrudDialogPage<NursingIndicator>
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
