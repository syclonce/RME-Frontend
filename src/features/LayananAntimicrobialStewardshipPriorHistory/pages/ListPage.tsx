import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipPriorHistoryEndpoint, useAntimicrobialStewardshipPriorHistoryResource } from '../api'
import type { AntimicrobialStewardshipPriorHistory } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipPriorHistory, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('previous_antibiotic'),
    accessorKey: 'previous_antibiotic',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).previous_antibiotic ?? '—'),
  },
  {
    header: humanizeField('start_date'),
    accessorKey: 'start_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).start_date ?? '—'),
  },
  {
    header: humanizeField('end_date'),
    accessorKey: 'end_date',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).end_date ?? '—'),
  },
  {
    header: humanizeField('outcome'),
    accessorKey: 'outcome',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).outcome ?? '—'),
  },
  {
    header: humanizeField('notes'),
    accessorKey: 'notes',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).notes ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'previous_antibiotic', label: humanizeField('previous_antibiotic'), required: true },
  { key: 'start_date', label: humanizeField('start_date'), type: 'date' },
  { key: 'end_date', label: humanizeField('end_date'), type: 'date' },
  { key: 'outcome', label: humanizeField('outcome') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  previous_antibiotic: '',
  start_date: '',
  end_date: '',
  outcome: '',
  notes: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipPriorHistory>[] = []

export function AntimicrobialStewardshipPriorHistoryListPage() {
  const resource = useAntimicrobialStewardshipPriorHistoryResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipPriorHistory')

  return (
    <WorkflowListPage<AntimicrobialStewardshipPriorHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipPriorHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.previous_antibiotic ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
