import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useExaminationGroupMappingResource } from '../api'
import type { ExaminationGroupMapping } from '../types'

const columns: ColumnDef<ExaminationGroupMapping, unknown>[] = [
  {
    header: humanizeField('examination_group_id'),
    cell: ({ row }) => <RelationLabel endpoint="/examination-groups" id={(row.original as unknown as Record<string, unknown>).examination_group_id as number | null} />,
  },
  {
    header: humanizeField('mapping_category'),
    accessorKey: 'mapping_category',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).mapping_category ?? '—'),
  },
  {
    header: humanizeField('external_code'),
    accessorKey: 'external_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).external_code ?? '—'),
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
  { key: 'examination_group_id', label: humanizeField('examination_group_id'), type: 'relation', relationEndpoint: '/examination-groups', required: true },
  { key: 'mapping_category', label: humanizeField('mapping_category'), required: true },
  { key: 'external_code', label: humanizeField('external_code') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  examination_group_id: null,
  mapping_category: '',
  external_code: '',
  is_active: false,
}

export function ExaminationGroupMappingListPage() {
  const resource = useExaminationGroupMappingResource()
  const title = humanizeModuleName('GeneralExaminationGroupMapping')

  return (
    <CrudDialogPage<ExaminationGroupMapping>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.mapping_category ?? `#${item.id}`}
      resource={resource}
    />
  )
}
