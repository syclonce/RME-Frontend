import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useMmpiTestResource } from '../api'
import type { MmpiTest } from '../types'

const columns: ColumnDef<MmpiTest, unknown>[] = [
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('doctor_id'),
    accessorKey: 'doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).doctor_id ?? '—'),
  },
  {
    header: humanizeField('test_date'),
    accessorKey: 'test_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).test_date ?? '—'),
  },
  {
    header: humanizeField('validity_scale_l'),
    accessorKey: 'validity_scale_l',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).validity_scale_l ?? '—'),
  },
  {
    header: humanizeField('validity_scale_f'),
    accessorKey: 'validity_scale_f',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).validity_scale_f ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'combobox', relationEndpoint: '/doctors' },
  { key: 'test_date', label: humanizeField('test_date'), type: 'date', required: true },
  { key: 'validity_scale_l', label: humanizeField('validity_scale_l'), type: 'number' },
  { key: 'validity_scale_f', label: humanizeField('validity_scale_f'), type: 'number' },
  { key: 'validity_scale_k', label: humanizeField('validity_scale_k'), type: 'number' },
  { key: 'clinical_scales_summary', label: humanizeField('clinical_scales_summary') },
  { key: 'interpretation', label: humanizeField('interpretation') },
  { key: 'conclusion', label: humanizeField('conclusion') },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  doctor_id: null,
  test_date: '',
  validity_scale_l: '',
  validity_scale_f: '',
  validity_scale_k: '',
  clinical_scales_summary: '',
  interpretation: '',
  conclusion: '',
}

export function MmpiTestListPage() {
  const resource = useMmpiTestResource()
  const title = humanizeModuleName('MedicalRecordMmpiTest')

  return (
    <CrudDialogPage<MmpiTest>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.interpretation ?? `#${item.id}`}
      resource={resource}
    />
  )
}
