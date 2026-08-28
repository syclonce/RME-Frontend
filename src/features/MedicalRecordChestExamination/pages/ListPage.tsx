import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useChestExaminationResource } from '../api'
import type { ChestExamination } from '../types'

const columns: ColumnDef<ChestExamination, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    cell: ({ row }) => <RelationLabel endpoint="/visits" id={(row.original as unknown as Record<string, unknown>).visit_id as number | null} />,
  },
  {
    header: humanizeField('inspection'),
    accessorKey: 'inspection',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).inspection ?? '—'),
  },
  {
    header: humanizeField('palpation'),
    accessorKey: 'palpation',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).palpation ?? '—'),
  },
  {
    header: humanizeField('percussion'),
    accessorKey: 'percussion',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).percussion ?? '—'),
  },
  {
    header: humanizeField('auscultation_breath_sounds'),
    accessorKey: 'auscultation_breath_sounds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).auscultation_breath_sounds ?? '—'),
  },
  {
    header: humanizeField('auscultation_heart_sounds'),
    accessorKey: 'auscultation_heart_sounds',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).auscultation_heart_sounds ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'relation', relationEndpoint: '/visits', required: true },
  { key: 'inspection', label: humanizeField('inspection') },
  { key: 'palpation', label: humanizeField('palpation') },
  { key: 'percussion', label: humanizeField('percussion') },
  { key: 'auscultation_breath_sounds', label: humanizeField('auscultation_breath_sounds') },
  { key: 'auscultation_heart_sounds', label: humanizeField('auscultation_heart_sounds') },
  { key: 'findings', label: humanizeField('findings') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date' },
]

const emptyForm = {
  visit_id: null,
  inspection: '',
  palpation: '',
  percussion: '',
  auscultation_breath_sounds: '',
  auscultation_heart_sounds: '',
  findings: '',
  examined_at: '',
}

export function ChestExaminationListPage() {
  const resource = useChestExaminationResource()
  const title = humanizeModuleName('MedicalRecordChestExamination')

  return (
    <CrudDialogPage<ChestExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.inspection ?? `#${item.id}`}
      resource={resource}
    />
  )
}
