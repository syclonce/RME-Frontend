import type { ColumnDef } from '@tanstack/react-table'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { usePatientSurveyResource } from '../api'
import type { PatientSurvey } from '../types'

const columns: ColumnDef<PatientSurvey, unknown>[] = [
  { header: 'Kunjungan', cell: ({ row }) => <RelationLabel endpoint="/visits" id={row.original.visit_id} /> },
  { header: 'Skor Kepuasan', accessorKey: 'satisfaction_score' }, { header: 'Masukan', accessorKey: 'feedback_text' },
  { header: 'Dikirim Pada', accessorKey: 'submitted_at' },
]
const fields: CrudField[] = [
  { key: 'visit_id', label: 'Kunjungan', type: 'combobox', relationEndpoint: '/visits', required: true },
  { key: 'satisfaction_score', label: 'Skor Kepuasan', type: 'select', required: true, options: [1, 2, 3, 4, 5].map((value) => ({ value: String(value), label: String(value) })) },
  { key: 'feedback_text', label: 'Masukan', type: 'textarea' }, { key: 'submitted_at', label: 'Dikirim Pada', type: 'date', required: true },
]

export function PatientSurveyListPage() {
  const resource = usePatientSurveyResource()
  return <CrudDialogPage<PatientSurvey> title="Survei Kepuasan Pasien" description="Satu survei untuk setiap kunjungan pasien."
    columns={columns} fields={fields} emptyForm={{ visit_id: null, satisfaction_score: '5', feedback_text: '', submitted_at: '' }}
    itemLabel={(item) => `Survei kunjungan #${item.visit_id}`} resource={resource} />
}
