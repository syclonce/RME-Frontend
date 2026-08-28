import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { MedicalRecordDiagnosisEndpoint, useDiagnosisResource } from '../api'
import type { Diagnosis } from '../types'

const columns: ColumnDef<Diagnosis, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('diagnosis_code_id'),
    cell: ({ row }) => <RelationLabel endpoint="/diagnosis-codes" id={(row.original as unknown as Record<string, unknown>).diagnosis_code_id as number | null} />,
  },
  {
    header: humanizeField('is_primary'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).is_primary ? 'Ya' : 'Tidak'),
  },
  {
    header: humanizeField('recorded_at'),
    accessorKey: 'recorded_at',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_at ?? '—'),
  },
  {
    header: humanizeField('recorded_by'),
    accessorKey: 'recorded_by',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).recorded_by ?? '—'),
  },
  {
    header: humanizeField('status'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).status
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },
]

const fields: CrudField[] = [
  { key: 'visit_id', label: humanizeField('visit_id'), type: 'number', required: true },
  { key: 'diagnosis_code_id', label: humanizeField('diagnosis_code_id'), type: 'relation', relationEndpoint: '/diagnosis-codes', required: true },
  { key: 'is_primary', label: humanizeField('is_primary'), type: 'checkbox' },
  { key: 'recorded_at', label: humanizeField('recorded_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  diagnosis_code_id: null,
  is_primary: false,
  recorded_at: '',
}

const actions: WorkflowAction<Diagnosis>[] = []

export function DiagnosisListPage() {
  const resource = useDiagnosisResource()
  const title = humanizeModuleName('MedicalRecordDiagnosis')

  return (
    <WorkflowListPage<Diagnosis>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={MedicalRecordDiagnosisEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: false, canDestroy: true }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
