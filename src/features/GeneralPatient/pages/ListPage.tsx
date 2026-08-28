import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { usePatientContactResource } from '@/features/GeneralPatientContact/api'
import { usePatientFamilyResource } from '@/features/GeneralPatientFamily/api'
import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'
import { InlineNestedList } from '@/shared/components/InlineNestedList'
import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField } from '@/shared/labels'
import { usePatientResource } from '../api'
import type { Patient } from '../types'

const UNIDENTIFIED_PLACEHOLDER_NAME = 'Pasien Tidak Dikenal'

/**
 * Curated columns for the list view — not all 27 DB columns; a staff member
 * scanning this table needs identity + a couple of key facts, the rest live
 * in the edit dialog.
 */
const columns: ColumnDef<Patient, unknown>[] = [
  {
    header: humanizeField('medical_record_number'),
    accessorKey: 'medical_record_number',
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.medical_record_number ?? '—'}</span>,
  },
  {
    header: humanizeField('name'),
    accessorKey: 'name',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name ?? '—'}</div>
        {row.original.nickname && <div className="text-muted-foreground text-xs">{row.original.nickname}</div>}
      </div>
    ),
  },
  {
    header: humanizeField('birth_date'),
    accessorKey: 'birth_date',
    cell: ({ row }) => (row.original.birth_date ? new Date(row.original.birth_date).toLocaleDateString('id-ID') : '—'),
  },
  {
    header: humanizeField('gender_id'),
    cell: ({ row }) => <RelationLabel endpoint="/genders" id={row.original.gender_id} />,
  },
  {
    header: humanizeField('address'),
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-1 max-w-[280px]">{row.original.address ?? '—'}</span>
    ),
  },
  {
    header: humanizeField('is_active'),
    cell: ({ row }) =>
      row.original.is_active ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">
          Nonaktif
        </Badge>
      ),
  },
]

// medical_record_number SENGAJA tidak ada di form — backend auto-generate
// kalau dikosongkan (lihat StorePatientRequest: nullable + Patient::generateMedicalRecordNumber()),
// persis seperti referensi yang cuma menampilkannya sebagai teks readonly saat edit, bukan input.
const fields: CrudField[] = [
  {
    key: 'name',
    label: humanizeField('name'),
    required: true,
    section: 'Identitas',
    disabledWhen: (form) => Boolean(form.is_unidentified),
  },
  {
    key: 'nickname',
    label: humanizeField('nickname'),
    section: 'Identitas',
    disabledWhen: (form) => Boolean(form.is_unidentified),
  },
  {
    key: 'title_prefix',
    label: humanizeField('title_prefix'),
    section: 'Identitas',
    disabledWhen: (form) => Boolean(form.is_unidentified),
  },
  {
    key: 'title_suffix',
    label: humanizeField('title_suffix'),
    section: 'Identitas',
    disabledWhen: (form) => Boolean(form.is_unidentified),
  },
  { key: 'birth_place', label: humanizeField('birth_place'), section: 'Identitas' },
  { key: 'birth_date', label: humanizeField('birth_date'), type: 'date', section: 'Identitas' },
  { key: 'gender_id', label: humanizeField('gender_id'), type: 'relation', relationEndpoint: '/genders', section: 'Identitas' },
  { key: 'religion_id', label: humanizeField('religion_id'), type: 'relation', relationEndpoint: '/religions', section: 'Identitas' },

  { key: 'address', label: humanizeField('address'), section: 'Alamat' },
  { key: 'rt', label: 'RT', section: 'Alamat' },
  { key: 'rw', label: 'RW', section: 'Alamat' },
  { key: 'postal_code', label: humanizeField('postal_code'), section: 'Alamat' },
  {
    key: 'village_id',
    label: humanizeField('village_id'),
    type: 'custom',
    section: 'Alamat',
    render: (value, onChange) => (
      <RegionVillagePicker value={(value as number) ?? null} onChange={(v) => onChange(v)} />
    ),
  },

  { key: 'education_id', label: humanizeField('education_id'), type: 'relation', relationEndpoint: '/educations', section: 'Data Tambahan' },
  { key: 'occupation_id', label: humanizeField('occupation_id'), type: 'relation', relationEndpoint: '/occupations', section: 'Data Tambahan' },
  {
    key: 'marital_status_id',
    label: humanizeField('marital_status_id'),
    type: 'relation',
    relationEndpoint: '/marital_statuses',
    section: 'Data Tambahan',
  },
  { key: 'blood_type_id', label: humanizeField('blood_type_id'), type: 'relation', relationEndpoint: '/blood_types', section: 'Data Tambahan' },
  { key: 'nationality_id', label: humanizeField('nationality_id'), type: 'relation', relationEndpoint: '/countries', section: 'Data Tambahan' },
  { key: 'ethnicity_id', label: humanizeField('ethnicity_id'), type: 'relation', relationEndpoint: '/ethnicities', section: 'Data Tambahan' },
  { key: 'language_id', label: humanizeField('language_id'), type: 'relation', relationEndpoint: '/languages', section: 'Data Tambahan' },
  {
    key: 'is_unidentified',
    label: 'Tidak Dikenal',
    type: 'checkbox',
    section: 'Data Tambahan',
    // Efek nyata, bukan sekadar flag: pasien tanpa identitas tidak mungkin
    // punya nama/gelar asli, jadi field itu dikunci + diisi placeholder yang
    // jelas — bukan dibiarkan required-tapi-kosong atau isian bebas.
    onToggle: (checked, form, setForm) => {
      if (checked && !form.name) {
        setForm((prev) => ({ ...prev, name: UNIDENTIFIED_PLACEHOLDER_NAME }))
      } else if (!checked && form.name === UNIDENTIFIED_PLACEHOLDER_NAME) {
        setForm((prev) => ({ ...prev, name: '' }))
      }
    },
  },
  { key: 'is_active', label: humanizeField('is_active'), type: 'checkbox', section: 'Data Tambahan' },
]

const emptyForm = {
  name: '',
  nickname: '',
  title_prefix: '',
  title_suffix: '',
  birth_place: '',
  birth_date: '',
  gender_id: null,
  religion_id: null,
  address: '',
  rt: '',
  rw: '',
  postal_code: '',
  village_id: null,
  education_id: null,
  occupation_id: null,
  marital_status_id: null,
  blood_type_id: null,
  nationality_id: null,
  ethnicity_id: null,
  language_id: null,
  is_unidentified: false,
  is_active: true,
}

export function PatientListPage() {
  const resource = usePatientResource()
  const contactResource = usePatientContactResource()
  const familyResource = usePatientFamilyResource()

  return (
    <CrudDialogPage<Patient>
      title="Pasien"
      description="Data induk pasien terdaftar."
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => item.name ?? `Pasien #${item.id}`}
      resource={resource}
      renderExtra={(editing) =>
        editing ? (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Kontak &amp; Keluarga</h3>
            <InlineNestedList
              title="Kontak"
              parentIdField="patient_id"
              parentId={Number(editing.id)}
              fields={[
                {
                  key: 'contact_type',
                  label: 'Jenis',
                  type: 'select',
                  options: [
                    { value: 'mobile_phone', label: 'Telepon Seluler' },
                    { value: 'home_phone', label: 'Telepon Rumah' },
                    { value: 'email', label: 'Surel' },
                    { value: 'whatsapp', label: 'WhatsApp' },
                  ],
                },
                { key: 'contact_value', label: 'Nilai', type: 'text' },
              ]}
              itemLabel={(item) => `${item.contact_type ?? '—'}: ${item.contact_value ?? '—'}`}
              resource={contactResource}
            />
            <InlineNestedList
              title="Keluarga"
              parentIdField="patient_id"
              parentId={Number(editing.id)}
              fields={[
                { key: 'name', label: 'Nama', type: 'text' },
                { key: 'relationship', label: 'Hubungan', type: 'text' },
              ]}
              itemLabel={(item) => `${item.name ?? '—'} (${item.relationship ?? '—'})`}
              resource={familyResource}
            />
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">Simpan pasien dulu sebelum menambah kontak/keluarga.</p>
        )
      }
    />
  )
}
