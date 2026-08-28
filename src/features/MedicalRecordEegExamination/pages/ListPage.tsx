import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useEegExaminationResource } from '../api'
import type { EegExamination } from '../types'

const columns: ColumnDef<EegExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('patient_id'),
    cell: ({ row }) => <RelationLabel endpoint="/patients" id={(row.original as unknown as Record<string, unknown>).patient_id as number | null} />,
  },
  {
    header: humanizeField('background_rhythm'),
    accessorKey: 'background_rhythm',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).background_rhythm ?? '—'),
  },
  {
    header: humanizeField('epileptiform_discharges'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).epileptiform_discharges ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('abnormality_type'),
    accessorKey: 'abnormality_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).abnormality_type ?? '—'),
  },
  {
    header: humanizeField('clinical_correlation'),
    accessorKey: 'clinical_correlation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).clinical_correlation ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'relation', relationEndpoint: '/patients', required: true },
  { key: 'background_rhythm', label: humanizeField('background_rhythm') },
  { key: 'epileptiform_discharges', label: humanizeField('epileptiform_discharges'), type: 'checkbox' },
  { key: 'abnormality_type', label: humanizeField('abnormality_type') },
  { key: 'clinical_correlation', label: humanizeField('clinical_correlation') },
  { key: 'conclusion', label: humanizeField('conclusion') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  patient_id: null,
  background_rhythm: '',
  epileptiform_discharges: false,
  abnormality_type: '',
  clinical_correlation: '',
  conclusion: '',
  examined_at: '',
}

export function EegExaminationListPage() {
  const resource = useEegExaminationResource()
  const title = humanizeModuleName('MedicalRecordEegExamination')

  return (
    <CrudDialogPage<EegExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.background_rhythm ?? `#${item.id}`}
      resource={resource}
    />
  )
}
