import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipMicrobiologyResultEndpoint, useAntimicrobialStewardshipMicrobiologyResultResource } from '../api'
import type { AntimicrobialStewardshipMicrobiologyResult } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipMicrobiologyResult, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('specimen_type'),
    accessorKey: 'specimen_type',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).specimen_type ?? '—'),
  },
  {
    header: humanizeField('organism_found'),
    accessorKey: 'organism_found',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).organism_found ?? '—'),
  },
  {
    header: humanizeField('sensitivity_result'),
    accessorKey: 'sensitivity_result',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).sensitivity_result ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'specimen_type', label: humanizeField('specimen_type'), required: true },
  { key: 'organism_found', label: humanizeField('organism_found') },
  { key: 'sensitivity_result', label: humanizeField('sensitivity_result') },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  specimen_type: '',
  organism_found: '',
  sensitivity_result: '',
  examined_at: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipMicrobiologyResult>[] = []

export function AntimicrobialStewardshipMicrobiologyResultListPage() {
  const resource = useAntimicrobialStewardshipMicrobiologyResultResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipMicrobiologyResult')

  return (
    <WorkflowListPage<AntimicrobialStewardshipMicrobiologyResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipMicrobiologyResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.specimen_type ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
