import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGuarantorParticipantTypeResource } from '../api'
import type { GuarantorParticipantType } from '../types'

const columns: ColumnDef<GuarantorParticipantType, unknown>[] = [
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).name ?? '—'),
  },
  {
    header: humanizeField('code'),
    accessorKey: 'code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).code ?? '—'),
  },
  {
    header: humanizeField('payer_type'),
    accessorKey: 'payer_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).payer_type ?? '—'),
  },
  {
    header: humanizeField('requires_verification'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).requires_verification ? 'Ya' : 'Tidak'),
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
  { key: 'name', label: humanizeField('name'), required: true },
  { key: 'code', label: humanizeField('code') },
  { key: 'payer_type', label: humanizeField('payer_type'), required: true },
  { key: 'requires_verification', label: humanizeField('requires_verification'), type: 'checkbox' },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  name: '',
  code: '',
  payer_type: '',
  requires_verification: false,
  is_active: false,
}

export function GuarantorParticipantTypeListPage() {
  const resource = useGuarantorParticipantTypeResource()
  const title = humanizeModuleName('GeneralGuarantorParticipantType')

  return (
    <CrudDialogPage<GuarantorParticipantType>
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
