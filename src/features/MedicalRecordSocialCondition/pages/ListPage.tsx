import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useSocialConditionResource } from '../api'
import type { SocialCondition } from '../types'

const columns: ColumnDef<SocialCondition, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('living_situation'),
    accessorKey: 'living_situation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).living_situation ?? '—'),
  },
  {
    header: humanizeField('occupation_status'),
    accessorKey: 'occupation_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).occupation_status ?? '—'),
  },
  {
    header: humanizeField('financial_status'),
    accessorKey: 'financial_status',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).financial_status ?? '—'),
  },
  {
    header: humanizeField('support_system'),
    accessorKey: 'support_system',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).support_system ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'living_situation', label: humanizeField('living_situation') },
  { key: 'occupation_status', label: humanizeField('occupation_status') },
  { key: 'financial_status', label: humanizeField('financial_status') },
  { key: 'support_system', label: humanizeField('support_system') },
  { key: 'recorded_by', label: humanizeField('recorded_by'), type: 'number', required: true },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date', required: true },
]

const emptyForm = {
  visit_id: '',
  living_situation: '',
  occupation_status: '',
  financial_status: '',
  support_system: '',
  recorded_by: '',
  recorded_at: '',
}

export function SocialConditionListPage() {
  const resource = useSocialConditionResource()
  const title = humanizeModuleName('MedicalRecordSocialCondition')

  return (
    <CrudDialogPage<SocialCondition>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.living_situation ?? `#${item.id}`}
      resource={resource}
    />
  )
}
