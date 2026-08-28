import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useBankAccountResource } from '../api'
import type { BankAccount } from '../types'

const columns: ColumnDef<BankAccount, unknown>[] = [
  {
    header: humanizeField('bank_name'),
    accessorKey: 'bank_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).bank_name ?? '—'),
  },
  {
    header: humanizeField('account_number'),
    accessorKey: 'account_number',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).account_number ?? '—'),
  },
  {
    header: humanizeField('account_holder'),
    accessorKey: 'account_holder',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).account_holder ?? '—'),
  },
  {
    header: humanizeField('account_type'),
    accessorKey: 'account_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).account_type ?? '—'),
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
  { key: 'bank_name', label: humanizeField('bank_name'), required: true },
  { key: 'account_number', label: humanizeField('account_number'), required: true },
  { key: 'account_holder', label: humanizeField('account_holder'), required: true },
  { key: 'account_type', label: humanizeField('account_type') },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  bank_name: '',
  account_number: '',
  account_holder: '',
  account_type: '',
  is_active: false,
}

export function BankAccountListPage() {
  const resource = useBankAccountResource()
  const title = humanizeModuleName('GeneralBankAccount')

  return (
    <CrudDialogPage<BankAccount>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.bank_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
