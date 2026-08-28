import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipApprovalEndpoint, useAntimicrobialStewardshipApprovalResource } from '../api'
import type { AntimicrobialStewardshipApproval } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipApproval, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('approved_by'),
    accessorKey: 'approved_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).approved_by ?? '—'),
  },
  {
    header: humanizeField('decision'),
    accessorKey: 'decision',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decision ?? '—'),
  },
  {
    header: humanizeField('decision_note'),
    accessorKey: 'decision_note',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decision_note ?? '—'),
  },
  {
    header: humanizeField('decided_at'),
    accessorKey: 'decided_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).decided_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'approved_by', label: humanizeField('approved_by'), type: 'number' },
  { key: 'decision', label: humanizeField('decision'), required: true },
  { key: 'decision_note', label: humanizeField('decision_note') },
  { key: 'decided_at', label: humanizeField('decided_at'), type: 'date', required: true },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  approved_by: '',
  decision: '',
  decision_note: '',
  decided_at: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipApproval>[] = []

export function AntimicrobialStewardshipApprovalListPage() {
  const resource = useAntimicrobialStewardshipApprovalResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipApproval')

  return (
    <WorkflowListPage<AntimicrobialStewardshipApproval>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipApprovalEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.decision ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
