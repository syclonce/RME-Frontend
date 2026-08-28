import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { usePhysicianRestrictionResource } from '../api'
import type { PhysicianRestriction } from '../types'

const columns: ColumnDef<PhysicianRestriction, unknown>[] = [
  {
    header: humanizeField('doctor_id'),
    cell: ({ row }) => <RelationLabel endpoint="/doctors" id={(row.original as unknown as Record<string, unknown>).doctor_id as number | null} />,
  },
  {
    header: humanizeField('restricted_antibiotic_name'),
    accessorKey: 'restricted_antibiotic_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).restricted_antibiotic_name ?? '—'),
  },
  {
    header: humanizeField('authorization_level'),
    accessorKey: 'authorization_level',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).authorization_level ?? '—'),
  },
  {
    header: humanizeField('is_authorized_prescriber'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_authorized_prescriber ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'relation', relationEndpoint: '/doctors', required: true },
  { key: 'restricted_antibiotic_name', label: humanizeField('restricted_antibiotic_name'), required: true },
  { key: 'authorization_level', label: humanizeField('authorization_level') },
  { key: 'is_authorized_prescriber', label: humanizeField('is_authorized_prescriber'), type: 'checkbox' },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  doctor_id: null,
  restricted_antibiotic_name: '',
  authorization_level: '',
  is_authorized_prescriber: false,
  notes: '',
}

export function PhysicianRestrictionListPage() {
  const resource = usePhysicianRestrictionResource()
  const title = humanizeModuleName('GeneralPhysicianRestriction')

  return (
    <CrudDialogPage<PhysicianRestriction>
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
