import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMedicalPersonnelResource } from '../api'
import type { MedicalPersonnel } from '../types'

const columns: ColumnDef<MedicalPersonnel, unknown>[] = [
  {
    header: humanizeField('identity_number'),
    accessorKey: 'identity_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).identity_number ?? '—'),
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('personnel_type'),
    accessorKey: 'personnel_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).personnel_type ?? '—'),
  },
  {
    header: humanizeField('profession_id'),
    cell: ({ row }) => <RelationLabel endpoint="/professions" id={(row.original as unknown as Record<string, unknown>).profession_id as number | null} />,
  },
  {
    header: humanizeField('license_number'),
    accessorKey: 'license_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).license_number ?? '—'),
  },
  {
    header: humanizeField('phone'),
    accessorKey: 'phone',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).phone ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'identity_number', label: humanizeField('identity_number') },
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'personnel_type', label: humanizeField('personnel_type'), required: true },
  { key: 'profession_id', label: humanizeField('profession_id'), type: 'relation', relationEndpoint: '/professions' },
  { key: 'license_number', label: humanizeField('license_number') },
  { key: 'phone', label: humanizeField('phone') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  identity_number: '',
  name: '',
  personnel_type: '',
  profession_id: null,
  license_number: '',
  phone: '',
  is_active: false,
}

export function MedicalPersonnelListPage() {
  const resource = useMedicalPersonnelResource()
  const title = humanizeModuleName('GeneralMedicalPersonnel')

  return (
    <CrudDialogPage<MedicalPersonnel>
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
