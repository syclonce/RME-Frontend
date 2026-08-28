import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useCashierResource } from '../api'
import type { Cashier } from '../types'

const columns: ColumnDef<Cashier, unknown>[] = [
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('cashier_code'),
    accessorKey: 'cashier_code',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).cashier_code ?? '—'),
  },
  {
    header: humanizeField('shift'),
    accessorKey: 'shift',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).shift ?? '—'),
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
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'number', required: true },
  { key: 'cashier_code', label: humanizeField('cashier_code'), required: true },
  { key: 'shift', label: humanizeField('shift'), required: true },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox' },
]

const emptyForm = {
  employee_id: '',
  cashier_code: '',
  shift: '',
  is_active: false,
}

export function CashierListPage() {
  const resource = useCashierResource()
  const title = humanizeModuleName('PembayaranCashier')

  return (
    <CrudDialogPage<Cashier>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.cashier_code ?? `#${item.id}`}
      resource={resource}
    />
  )
}
