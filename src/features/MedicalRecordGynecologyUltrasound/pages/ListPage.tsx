import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useGynecologyUltrasoundResource } from '../api'
import type { GynecologyUltrasound } from '../types'

const columns: ColumnDef<GynecologyUltrasound, unknown>[] = [
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
    header: humanizeField('exam_date'),
    accessorKey: 'exam_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).exam_date ?? '—'),
  },
  {
    header: humanizeField('uterus_findings'),
    accessorKey: 'uterus_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).uterus_findings ?? '—'),
  },
  {
    header: humanizeField('right_ovary_findings'),
    accessorKey: 'right_ovary_findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).right_ovary_findings ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'combobox', relationEndpoint: '/patients', required: true },
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'doctor_id', label: humanizeField('doctor_id'), type: 'combobox', relationEndpoint: '/doctors' },
  { key: 'exam_date', label: humanizeField('exam_date'), type: 'date', required: true },
  { key: 'uterus_findings', label: humanizeField('uterus_findings') },
  { key: 'right_ovary_findings', label: humanizeField('right_ovary_findings') },
  { key: 'left_ovary_findings', label: humanizeField('left_ovary_findings') },
  { key: 'endometrial_thickness_mm', label: humanizeField('endometrial_thickness_mm'), type: 'number' },
  { key: 'conclusion', label: humanizeField('conclusion') },
]

const emptyForm = {
  patient_id: null,
  visit_id: null,
  doctor_id: null,
  exam_date: '',
  uterus_findings: '',
  right_ovary_findings: '',
  left_ovary_findings: '',
  endometrial_thickness_mm: '',
  conclusion: '',
}

export function GynecologyUltrasoundListPage() {
  const resource = useGynecologyUltrasoundResource()
  const title = humanizeModuleName('MedicalRecordGynecologyUltrasound')

  return (
    <CrudDialogPage<GynecologyUltrasound>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.uterus_findings ?? `#${item.id}`}
      resource={resource}
    />
  )
}
