import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananAntimicrobialStewardshipFormEndpoint, useAntimicrobialStewardshipFormResource } from '../api'
import type { AntimicrobialStewardshipForm } from '../types'

const columns: ColumnDef<AntimicrobialStewardshipForm, unknown>[] = [
  {
    header: humanizeField('visit_id'),
    accessorKey: 'visit_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).visit_id ?? '—'),
  },
  {
    header: humanizeField('patient_id'),
    accessorKey: 'patient_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).patient_id ?? '—'),
  },
  {
    header: humanizeField('requesting_doctor_id'),
    accessorKey: 'requesting_doctor_id',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).requesting_doctor_id ?? '—'),
  },
  {
    header: humanizeField('antibiotic_restriction_id'),
    cell: ({ row }) => <RelationLabel endpoint="/antibiotic-restrictions" id={(row.original as unknown as Record<string, unknown>).antibiotic_restriction_id as number | null} />,
  },
  {
    header: humanizeField('indication'),
    accessorKey: 'indication',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).indication ?? '—'),
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
  { key: 'patient_id', label: humanizeField('patient_id'), type: 'number', required: true },
  { key: 'requesting_doctor_id', label: humanizeField('requesting_doctor_id'), type: 'number' },
  { key: 'antibiotic_restriction_id', label: humanizeField('antibiotic_restriction_id'), type: 'relation', relationEndpoint: '/antibiotic-restrictions' },
  { key: 'indication', label: humanizeField('indication'), required: true },
  { key: 'status', label: humanizeField('status'), required: true },
  { key: 'submitted_at', label: humanizeField('submitted_at'), type: 'date' },
]

const emptyForm = {
  visit_id: '',
  patient_id: '',
  requesting_doctor_id: '',
  antibiotic_restriction_id: null,
  indication: '',
  status: '',
  submitted_at: '',
}

const actions: WorkflowAction<AntimicrobialStewardshipForm>[] = []

export function AntimicrobialStewardshipFormListPage() {
  const resource = useAntimicrobialStewardshipFormResource()
  const title = humanizeModuleName('LayananAntimicrobialStewardshipForm')

  return (
    <WorkflowListPage<AntimicrobialStewardshipForm>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      endpoint={LayananAntimicrobialStewardshipFormEndpoint}
      columns={columns}
      capabilities={{ canCreate: true, canUpdate: true, canDestroy: false }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.indication ?? `#${item.id}`}
      actions={actions}
      resource={resource}
    />
  )
}
