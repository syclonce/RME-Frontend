import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useObstetricsResource } from '../api'
import type { Obstetrics } from '../types'

const columns: ColumnDef<Obstetrics, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('gravida'),
    accessorKey: 'gravida',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gravida ?? '—'),
  },
  {
    header: humanizeField('para'),
    accessorKey: 'para',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).para ?? '—'),
  },
  {
    header: humanizeField('abortus'),
    accessorKey: 'abortus',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).abortus ?? '—'),
  },
  {
    header: humanizeField('gestational_age_weeks'),
    accessorKey: 'gestational_age_weeks',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gestational_age_weeks ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true, section: 'Detail' },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true, section: 'Detail' },
  { key: 'gravida', label: humanizeField('gravida'), type: 'number', section: 'Detail' },
  { key: 'para', label: humanizeField('para'), type: 'number', section: 'Detail' },
  { key: 'abortus', label: humanizeField('abortus'), type: 'number', section: 'Detail' },
  { key: 'gestational_age_weeks', label: humanizeField('gestational_age_weeks'), type: 'number', section: 'Detail' },
  { key: 'fundal_height_cm', label: humanizeField('fundal_height_cm'), type: 'number', section: 'Detail Tambahan' },
  { key: 'fetal_heart_rate', label: humanizeField('fetal_heart_rate'), type: 'number', section: 'Detail Tambahan' },
  { key: 'fetal_presentation', label: humanizeField('fetal_presentation'), section: 'Detail Tambahan' },
  { key: 'estimated_fetal_weight', label: humanizeField('estimated_fetal_weight'), type: 'number', section: 'Detail Tambahan' },
  { key: 'notes', label: humanizeField('notes'), section: 'Detail Tambahan' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', section: 'Detail Tambahan' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  gravida: '',
  para: '',
  abortus: '',
  gestational_age_weeks: '',
  fundal_height_cm: '',
  fetal_heart_rate: '',
  fetal_presentation: '',
  estimated_fetal_weight: '',
  notes: '',
  examined_at: '',
}

export function ObstetricsListPage() {
  const resource = useObstetricsResource()
  const title = humanizeModuleName('MedicalRecordObstetrics')

  return (
    <CrudDialogPage<Obstetrics>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.fetal_presentation ?? `#${item.id}`}
      resource={resource}
    />
  )
}
