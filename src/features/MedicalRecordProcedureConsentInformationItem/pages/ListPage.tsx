import type { ColumnDef } from '@tanstack/react-table'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordProcedureConsentInformationItemEndpoint, useProcedureConsentInformationItemResource } from '../api'
import type { ProcedureConsentInformationItem } from '../types'

const columns: ColumnDef<ProcedureConsentInformationItem, unknown>[] = [
  {
    header: humanizeField('information_id'),
    cell: ({ row }) => <RelationLabel endpoint="/procedure-consent-information" id={(row.original as unknown as Record<string, unknown>).information_id as number | null} />,
  },
  {
    header: humanizeField('item_name'),
    accessorKey: 'item_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).item_name ?? '—'),
  },
  {
    header: humanizeField('is_explained'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_explained ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('is_understood'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_understood ? 'Ya' : 'Tidak'),
  },
]

const fields: CrudField[] = [
  { key: 'information_id', label: humanizeField('information_id'), type: 'relation', relationEndpoint: '/procedure-consent-information', required: true },
  { key: 'item_name', label: humanizeField('item_name'), required: true },
  { key: 'is_explained', label: humanizeField('is_explained'), type: 'checkbox' },
  { key: 'is_understood', label: humanizeField('is_understood'), type: 'checkbox' },
]

const emptyForm = {
  information_id: null,
  item_name: '',
  is_explained: false,
  is_understood: false,
}

const actions: WorkflowAction<ProcedureConsentInformationItem>[] = []

export function ProcedureConsentInformationItemListPage() {
  const resource = useProcedureConsentInformationItemResource()
  const title = humanizeModuleName('MedicalRecordProcedureConsentInformationItem')

  return (
    <WorkflowListPage<ProcedureConsentInformationItem>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordProcedureConsentInformationItemEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.item_name ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
