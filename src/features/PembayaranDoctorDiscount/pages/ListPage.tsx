import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useDoctorDiscountResource } from '../api'
import type { DoctorDiscount } from '../types'

const columns: ColumnDef<DoctorDiscount, unknown>[] = [
  {
    header: humanizeField('discount_id'),
    cell: ({ row }) => <RelationLabel endpoint="/discounts" id={(row.original as unknown as Record<string, unknown>).discount_id as number | null} />,
  },
  {
    header: humanizeField('employee_id'),
    accessorKey: 'employee_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).employee_id ?? '—'),
  },
  {
    header: humanizeField('percentage'),
    accessorKey: 'percentage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).percentage ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'discount_id', label: humanizeField('discount_id'), type: 'relation', relationEndpoint: '/discounts', required: true },
  { key: 'employee_id', label: humanizeField('employee_id'), type: 'combobox', relationEndpoint: '/employees', required: true },
  { key: 'percentage', label: humanizeField('percentage'), type: 'number', required: true },
]

const emptyForm = {
  discount_id: null,
  employee_id: null,
  percentage: '',
}

export function DoctorDiscountListPage() {
  const resource = useDoctorDiscountResource()
  const title = humanizeModuleName('PembayaranDoctorDiscount')

  return (
    <CrudDialogPage<DoctorDiscount>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      resource={resource}
    />
  )
}
