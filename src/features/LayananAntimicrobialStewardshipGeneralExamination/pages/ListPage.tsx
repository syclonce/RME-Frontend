import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipGeneralExaminationEndpoint, useAntimicrobialStewardshipGeneralExaminationResource } from '../api'
import type { AntimicrobialStewardshipGeneralExamination } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipGeneralExamination, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('temperature'),
    accessorKey: 'temperature',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).temperature ?? '—'),
  },
  {
    header: humanizeField('pulse'),
    accessorKey: 'pulse',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).pulse ?? '—'),
  },
  {
    header: humanizeField('respiration_rate'),
    accessorKey: 'respiration_rate',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).respiration_rate ?? '—'),
  },
  {
    header: humanizeField('blood_pressure'),
    accessorKey: 'blood_pressure',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).blood_pressure ?? '—'),
  },
  {
    header: humanizeField('weight_kg'),
    accessorKey: 'weight_kg',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).weight_kg ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'temperature', label: humanizeField('temperature'), type: 'number' },
  { key: 'pulse', label: humanizeField('pulse'), type: 'number' },
  { key: 'respiration_rate', label: humanizeField('respiration_rate'), type: 'number' },
  { key: 'blood_pressure', label: humanizeField('blood_pressure') },
  { key: 'weight_kg', label: humanizeField('weight_kg'), type: 'number' },
  { key: 'height_cm', label: humanizeField('height_cm'), type: 'number' },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  temperature: '',
  pulse: '',
  respiration_rate: '',
  blood_pressure: '',
  weight_kg: '',
  height_cm: '',
  examined_at: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipGeneralExamination>[] = []

export function AntimicrobialStewardshipGeneralExaminationListPage() {
  const resource = useAntimicrobialStewardshipGeneralExaminationResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipGeneralExamination')

  return (
    <WorkflowListPage<AntimicrobialStewardshipGeneralExamination>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipGeneralExaminationEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.blood_pressure ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
