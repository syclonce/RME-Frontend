import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useInstitutionResource } from '../api'
import type { Institution } from '../types'

const columns: ColumnDef<Institution, unknown>[] = [
  {
    header: humanizeField('ppk_id'),
    cell: ({ row }) => <RelationLabel endpoint="/ppks" id={(row.original as unknown as Record<string, unknown>).ppk_id as number | null} />,
  },
  {
    header: humanizeField('email'),
    accessorKey: 'email',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).email ?? '—'),
  },
  {
    header: humanizeField('website'),
    accessorKey: 'website',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).website ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'ppk_id', label: humanizeField('ppk_id'), type: 'relation', relationEndpoint: '/ppks' },
  { key: 'email', label: humanizeField('email'), required: true },
  { key: 'website', label: humanizeField('website'), required: true },
]

const emptyForm = {
  ppk_id: null,
  email: '',
  website: '',
}

export function InstitutionListPage() {
  const resource = useInstitutionResource()
  const title = humanizeModuleName('GeneralInstitution')

  return (
    <CrudDialogPage<Institution>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.email ?? `#${item.id}`}
      resource={resource}
    />
  )
}
