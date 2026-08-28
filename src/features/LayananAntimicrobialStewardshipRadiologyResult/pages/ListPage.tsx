import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipRadiologyResultEndpoint, useAntimicrobialStewardshipRadiologyResultResource } from '../api'
import type { AntimicrobialStewardshipRadiologyResult } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipRadiologyResult, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('examination_name'),
    accessorKey: 'examination_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examination_name ?? '—'),
  },
  {
    header: humanizeField('findings'),
    accessorKey: 'findings',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).findings ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'examination_name', label: humanizeField('examination_name'), required: true },
  { key: 'findings', label: humanizeField('findings'), required: true },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  examination_name: '',
  findings: '',
  examined_at: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipRadiologyResult>[] = []

export function AntimicrobialStewardshipRadiologyResultListPage() {
  const resource = useAntimicrobialStewardshipRadiologyResultResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipRadiologyResult')

  return (
    <WorkflowListPage<AntimicrobialStewardshipRadiologyResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipRadiologyResultEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.examination_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
