import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipLabResultEndpoint, useAntimicrobialStewardshipLabResultResource } from '../api'
import type { AntimicrobialStewardshipLabResult } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipLabResult, unknown>[] = [
  {
    header: humanizeField('antimicrobial_stewardship_form_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antimicrobial-stewardship-forms" id={(row.original as unknown as Record<string, unknown>).antimicrobial_stewardship_form_id as number | null} />,
  },
  {
    header: humanizeField('lab_result_id'),
    cell: ({ row }) => <RelationLabel endpoint="/lab-results" id={(row.original as unknown as Record<string, unknown>).lab_result_id as number | null} />,
  },
  {
    header: humanizeField('examination_name'),
    accessorKey: 'examination_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examination_name ?? '—'),
  },
  {
    header: humanizeField('result_value'),
    accessorKey: 'result_value',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).result_value ?? '—'),
  },
  {
    header: humanizeField('examined_at'),
    accessorKey: 'examined_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).examined_at ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'antimicrobial_stewardship_form_id', label: humanizeField('antimicrobial_stewardship_form_id'), type: 'relation', relationEndpoint: '/antimicrobial-stewardship-forms', required: true },
  { key: 'lab_result_id', label: humanizeField('lab_result_id'), type: 'relation', relationEndpoint: '/lab-results' },
  { key: 'examination_name', label: humanizeField('examination_name'), required: true },
  { key: 'result_value', label: humanizeField('result_value'), required: true },
  { key: 'examined_at', label: humanizeField('examined_at'), type: 'date', required: true },
]

const emptyForm = {
  antimicrobial_stewardship_form_id: null,
  lab_result_id: null,
  examination_name: '',
  result_value: '',
  examined_at: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipLabResult>[] = []

export function AntimicrobialStewardshipLabResultListPage() {
  const resource = useAntimicrobialStewardshipLabResultResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipLabResult')

  return (
    <WorkflowListPage<AntimicrobialStewardshipLabResult>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipLabResultEndpoint}
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
