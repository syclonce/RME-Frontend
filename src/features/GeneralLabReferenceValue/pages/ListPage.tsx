import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useLabReferenceValueResource } from '../api'
import type { LabReferenceValue } from '../types'

const columns: ColumnDef<LabReferenceValue, unknown>[] = [
  {
    header: humanizeField('lab_service_parameter_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-service-parameters" id={(row.original as unknown as Record<string, unknown>).lab_service_parameter_id as number | null} />,
  },
  {
    header: humanizeField('gender'),
    accessorKey: 'gender',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gender ?? '—'),
  },
  {
    header: humanizeField('min_age'),
    accessorKey: 'min_age',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).min_age ?? '—'),
  },
  {
    header: humanizeField('max_age'),
    accessorKey: 'max_age',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).max_age ?? '—'),
  },
  {
    header: humanizeField('min_value'),
    accessorKey: 'min_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).min_value ?? '—'),
  },
  {
    header: humanizeField('max_value'),
    accessorKey: 'max_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).max_value ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'lab_service_parameter_id', label: humanizeField('lab_service_parameter_id'), type: 'relation', relationEndpoint: '/lab-service-parameters', required: true },
  { key: 'gender', label: humanizeField('gender'), type: 'select', options: [{"value":"male","label":"Male"},{"value":"female","label":"Female"},{"value":"all","label":"All"}] },
  { key: 'min_age', label: humanizeField('min_age'), type: 'number' },
  { key: 'max_age', label: humanizeField('max_age'), type: 'number' },
  { key: 'min_value', label: humanizeField('min_value'), type: 'number' },
  { key: 'max_value', label: humanizeField('max_value'), type: 'number' },
  { key: 'unit', label: humanizeField('unit') },
  { key: 'note', label: humanizeField('note') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  lab_service_parameter_id: null,
  gender: '',
  min_age: '',
  max_age: '',
  min_value: '',
  max_value: '',
  unit: '',
  note: '',
  is_active: false,
}

export function LabReferenceValueListPage() {
  const resource = useLabReferenceValueResource()
  const title = humanizeModuleName('GeneralLabReferenceValue')

  return (
    <CrudDialogPage<LabReferenceValue>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.gender ?? `#${item.id}`}
      resource={resource}
    />
  )
}
