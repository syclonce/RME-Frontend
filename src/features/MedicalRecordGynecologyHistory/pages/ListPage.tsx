import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordGynecologyHistoryEndpoint, useGynecologyHistoryResource } from '../api'
import type { GynecologyHistory } from '../types'

const columns: ColumnDef<GynecologyHistory, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('created_by'),
    accessorKey: 'created_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).created_by ?? '—'),
  },
  {
    header: humanizeField('menarche_age'),
    accessorKey: 'menarche_age',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).menarche_age ?? '—'),
  },
  {
    header: humanizeField('menstrual_cycle_pattern'),
    accessorKey: 'menstrual_cycle_pattern',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).menstrual_cycle_pattern ?? '—'),
  },
  {
    header: humanizeField('contraception_history'),
    accessorKey: 'contraception_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).contraception_history ?? '—'),
  },
  {
    header: humanizeField('gynecological_surgery_history'),
    accessorKey: 'gynecological_surgery_history',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).gynecological_surgery_history ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'created_by', label: humanizeField('created_by'), type: 'number' },
  { key: 'menarche_age', label: humanizeField('menarche_age'), type: 'number' },
  { key: 'menstrual_cycle_pattern', label: humanizeField('menstrual_cycle_pattern') },
  { key: 'contraception_history', label: humanizeField('contraception_history') },
  { key: 'gynecological_surgery_history', label: humanizeField('gynecological_surgery_history') },
  { key: 'notes', label: humanizeField('notes') },
]

const emptyForm = {
  visit_id: '',
  created_by: '',
  menarche_age: '',
  menstrual_cycle_pattern: '',
  contraception_history: '',
  gynecological_surgery_history: '',
  notes: '',
}

const actions: WorkflowAction<GynecologyHistory>[] = []

export function GynecologyHistoryListPage() {
  const resource = useGynecologyHistoryResource()
  const title = humanizeModuleName('MedicalRecordGynecologyHistory')

  return (
    <WorkflowListPage<GynecologyHistory>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordGynecologyHistoryEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.menstrual_cycle_pattern ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
