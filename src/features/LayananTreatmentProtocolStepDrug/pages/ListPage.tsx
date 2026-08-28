import type { ColumnDef } from '@tanstack/react-table'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { useTreatmentProtocolStepDrugResource } from '../api'
import type { TreatmentProtocolStepDrug } from '../types'

const columns: ColumnDef<TreatmentProtocolStepDrug, unknown>[] = [
  {
    header: humanizeField('treatment_protocol_step_id'),
    cell: ({ row }) => <RelationLabel endpoint="/treatment-protocol-steps" id={(row.original as unknown as Record<string, unknown>).treatment_protocol_step_id as number | null} />,
  },
  {
    header: humanizeField('drug_name'),
    accessorKey: 'drug_name',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).drug_name ?? '—'),
  },
  {
    header: humanizeField('dosage'),
    accessorKey: 'dosage',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dosage ?? '—'),
  },
  {
    header: humanizeField('frequency'),
    accessorKey: 'frequency',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).frequency ?? '—'),
  },
  {
    header: humanizeField('route'),
    accessorKey: 'route',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).route ?? '—'),
  },
]

const fields: CrudField[] = [
  { key: 'treatment_protocol_step_id', label: humanizeField('treatment_protocol_step_id'), type: 'relation', relationEndpoint: '/treatment-protocol-steps', required: true },
  { key: 'drug_name', label: humanizeField('drug_name'), required: true },
  { key: 'dosage', label: humanizeField('dosage'), required: true },
  { key: 'frequency', label: humanizeField('frequency'), required: true },
  { key: 'route', label: humanizeField('route') },
]

const emptyForm = {
  treatment_protocol_step_id: null,
  drug_name: '',
  dosage: '',
  frequency: '',
  route: '',
}

export function TreatmentProtocolStepDrugListPage() {
  const resource = useTreatmentProtocolStepDrugResource()
  const title = humanizeModuleName('LayananTreatmentProtocolStepDrug')

  return (
    <CrudDialogPage<TreatmentProtocolStepDrug>
      title={title}
      description={`Kelola data ${title.toLowerCase()}.`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.drug_name ?? `#${item.id}`}
      resource={resource}
    />
  )
}
