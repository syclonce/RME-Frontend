import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { apiClient } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/shared/components/DataTable'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { RecordFieldsForm, type CrudField } from '@/shared/components/RecordFieldsForm'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { normalizeList } from '@/shared/types'
import { humanizeField } from '@/shared/labels'
import { notifyApiError } from '@/shared/lib/apiError'
import { toast } from 'sonner'
import { PatientFormDialog } from '@/features/GeneralPatient/components/PatientFormDialog'
import { buildFields as buildPatientFields, emptyForm as emptyPatientForm } from '@/features/GeneralPatient/pages/ListPage'
import { usePatientResource } from '@/features/GeneralPatient/api'
import { useRegistrationResource } from '../api'
import type { Registration } from '../types'
import { useGuarantorResource } from '@/features/PendaftaranGuarantor/api'
import type { Guarantor } from '@/features/PendaftaranGuarantor/types'
import { useVisitResource } from '@/features/PendaftaranVisit/api'
import type { Visit } from '@/features/PendaftaranVisit/types'
import { usePatientGuardianResource } from '@/features/PendaftaranPatientGuardian/api'
import type { PatientGuardian } from '@/features/PendaftaranPatientGuardian/types'
import { usePatientEscortResource } from '@/features/PendaftaranPatientEscort/api'
import type { PatientEscort } from '@/features/PendaftaranPatientEscort/types'

/**
 * Fetch KHUSUS untuk field ward_id wizard ini (bukan lewat useOptions/
 * RelationSelect generik) — perlu seluruh object per ward (bukan cuma
 * id+label) supaya bisa baca `triggers_emergency` (turunan dari
 * ward_visit_types.triggers_emergency_flag) tanpa fetch terpisah. Sengaja
 * TIDAK mengubah useOptions/RelationSelect generik karena dipakai puluhan
 * field relasi lain — lihat docs-sim/histori/catatan/
 * 2026-09-02-ward-visit-type-otomatis-emergency.md.
 */
interface WardOption {
  id: number
  name: string
  triggers_emergency: boolean
}

interface BedOption {
  id: number
  bed_number: string
  room?: { room_number?: string | null } | null
}

type CareType = 'outpatient' | 'emergency' | 'inpatient'

const CARE_TYPE_OPTIONS: { value: CareType; label: string; description: string }[] = [
  { value: 'outpatient', label: 'Rawat Jalan', description: 'Pelayanan poli tanpa penggunaan tempat tidur.' },
  { value: 'emergency', label: 'IGD', description: 'Pelayanan gawat darurat; dokter dapat ditentukan setelah triase.' },
  { value: 'inpatient', label: 'Rawat Inap', description: 'Pelayanan bangsal dengan ruangan dan tempat tidur.' },
]

function useWardOptions() {
  return useQuery({
    queryKey: ['/wards', 'wizard-kunjungan-options'],
    queryFn: async () => {
      const res = await apiClient.get('/wards', { params: { per_page: 100 } })
      const { items } = normalizeList<Record<string, unknown>>(res.data)
      return items.map(
        (row) =>
          ({
            id: Number(row.id),
            name: String(row.name ?? `#${row.id}`),
            triggers_emergency: Boolean(row.triggers_emergency),
          }) satisfies WardOption,
      )
    },
  })
}

function WardSelectField({
  value,
  onChange,
  careType,
  disabled,
}: {
  value: number | null
  onChange: (wardId: number | null, triggersEmergency: boolean) => void
  careType: CareType
  disabled?: boolean
}) {
  const { data: options, isLoading } = useWardOptions()
  const selected = options?.find((o) => o.id === value)
  const visibleOptions = options?.filter((option) =>
    careType === 'emergency' ? option.triggers_emergency : !option.triggers_emergency,
  )

  return (
    <div className="flex flex-col gap-1">
      <Select
        value={value !== null ? String(value) : ''}
        onValueChange={(v) => {
          const id = v ? Number(v) : null
          const opt = options?.find((o) => o.id === id)
          onChange(id, opt?.triggers_emergency ?? false)
        }}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isLoading ? 'Memuat...' : 'Pilih...'} />
        </SelectTrigger>
        <SelectContent>
          {visibleOptions?.map((opt) => (
            <SelectItem key={opt.id} value={String(opt.id)}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected?.triggers_emergency && (
        <p className="text-muted-foreground text-xs">
          Ruangan ini adalah ruang gawat darurat — status "Kegawatdaruratan" otomatis tercentang di langkah "Pilih Pasien".
        </p>
      )}
    </div>
  )
}

function BedSelectField({ value, wardId, onChange }: { value: number | null; wardId: number | null; onChange: (bedId: number | null) => void }) {
  const bedsQuery = useQuery({
    queryKey: ['/beds', 'available', wardId],
    enabled: wardId !== null,
    queryFn: async () => {
      const response = await apiClient.get('/beds', { params: { ward_id: wardId, available_only: true, per_page: 100 } })
      return normalizeList<BedOption>(response.data).items
    },
  })

  return (
    <Select value={value !== null ? String(value) : ''} onValueChange={(next) => onChange(next ? Number(next) : null)} disabled={wardId === null}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={wardId === null ? 'Pilih ruangan terlebih dahulu' : bedsQuery.isLoading ? 'Memuat...' : 'Pilih tempat tidur'} />
      </SelectTrigger>
      <SelectContent>
        {bedsQuery.data?.map((bed) => (
          <SelectItem key={bed.id} value={String(bed.id)}>
            {bed.room?.room_number ? `Kamar ${bed.room.room_number} · ` : ''}Bed {bed.bed_number}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/**
 * Wizard "Pendaftaran Kunjungan" — titik masuk cepat yang menyatukan create
 * di 3 modul CRUD terpisah yang SUDAH ADA (Registration, Guarantor, Visit)
 * jadi satu alur 4 langkah, supaya petugas pendaftaran tidak perlu membuka
 * 2-3 menu berbeda untuk satu kunjungan pasien. Modul CRUD lama SENGAJA
 * tidak dihapus/diubah — tetap ada untuk akses langsung/audit/koreksi (lihat
 * docs-sim/histori/catatan/2026-09-02-wizard-pendaftaran-kunjungan.md).
 *
 * Dirender di dalam modal Dialog (bukan halaman penuh) supaya konsisten
 * dengan pola CrudDialogPage/PatientFormDialog: menu ini adalah halaman
 * list/tabel Kunjungan (lihat `PendaftaranKunjunganPage` di bawah), tombol
 * "Tambah Kunjungan" membuka wizard ini di dalam modal — sama seperti setiap
 * modul CRUD lain di aplikasi.
 */

const PAYER_TYPE_OPTIONS = [
  { value: 'self_pay', label: 'Umum (Bayar Sendiri)', description: 'Pasien membayar sendiri, tanpa penjamin.' },
  { value: 'bpjs', label: 'BPJS', description: 'Dijamin BPJS Kesehatan — isi nomor kartu & no. rujukan.' },
  { value: 'insurance', label: 'Asuransi / Perusahaan', description: 'Dijamin asuransi swasta atau perusahaan (korporat).' },
] as const

type PayerType = (typeof PAYER_TYPE_OPTIONS)[number]['value']

const STEP_LABELS = ['Pilih Pasien', 'Jenis Penjamin', 'Penjamin', 'Kunjungan', 'Penanggung Jawab & Pengantar']

const registrationFields: CrudField[] = [
  { key: 'registered_at', label: humanizeField('registered_at'), type: 'date' },
  { key: 'is_emergency', label: humanizeField('is_emergency'), type: 'checkbox' },
  { key: 'has_fall_risk', label: humanizeField('has_fall_risk'), type: 'checkbox' },
]

/**
 * Toggle manual (bukan derive dari data pasien) — beda dari found_location/
 * found_at di bawah yang otomatis muncul berdasarkan status pasien
 * is_unidentified. Ikut-ibu/bayi baru lahir butuh keputusan petugas per
 * kunjungan, tidak bisa disimpulkan dari record pasien manapun.
 */
const newbornFields: CrudField[] = [
  { key: 'newborn_weight_grams', label: 'Berat Lahir (gram)', type: 'number' },
  { key: 'newborn_length_cm', label: 'Panjang Lahir (cm)', type: 'number' },
  {
    key: 'birth_time',
    label: 'Jam Lahir',
    type: 'custom',
    render: (value, onChange) => (
      <input
        type="time"
        className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  },
]

const registrationDetailFields: CrudField[] = [
  { key: 'admission_diagnosis_id', label: humanizeField('admission_diagnosis_id'), type: 'relation', relationEndpoint: '/diagnosis-codes' },
  { key: 'referral_id', label: humanizeField('referral_id'), type: 'relation', relationEndpoint: '/referrals' },
  { key: 'package_id', label: humanizeField('package_id'), type: 'relation', relationEndpoint: '/packages' },
]

const guardianFields: CrudField[] = [
  { key: 'guardian_full_name', label: 'Nama Lengkap' },
  {
    key: 'guardian_relationship_to_patient',
    label: 'Hubungan dengan Pasien',
    type: 'select',
    options: [
      { value: 'parent', label: 'Orang Tua' },
      { value: 'spouse', label: 'Pasangan' },
      { value: 'child', label: 'Anak' },
      { value: 'sibling', label: 'Saudara Kandung' },
      { value: 'legal_guardian', label: 'Wali Sah' },
      { value: 'other', label: 'Lainnya' },
    ],
  },
  { key: 'guardian_identity_number', label: 'No. Identitas (KTP/NIK)' },
  { key: 'guardian_phone_number', label: 'No. Telepon' },
  { key: 'guardian_address', label: 'Alamat' },
  { key: 'guardian_occupation', label: 'Pekerjaan' },
]

const escortFields: CrudField[] = [
  { key: 'escort_full_name', label: 'Nama Lengkap' },
  {
    key: 'escort_relationship_to_patient',
    label: 'Hubungan dengan Pasien',
    type: 'select',
    options: [
      { value: 'parent', label: 'Orang Tua' },
      { value: 'spouse', label: 'Pasangan' },
      { value: 'child', label: 'Anak' },
      { value: 'sibling', label: 'Saudara Kandung' },
      { value: 'friend', label: 'Teman' },
      { value: 'institution', label: 'Institusi' },
      { value: 'other', label: 'Lainnya' },
    ],
  },
  { key: 'escort_phone_number', label: 'No. Telepon' },
  { key: 'escort_address', label: 'Alamat' },
  {
    key: 'escort_arrival_mode',
    label: 'Moda Kedatangan',
    type: 'select',
    options: [
      { value: 'ambulance', label: 'Ambulans' },
      { value: 'private_vehicle', label: 'Kendaraan Pribadi' },
      { value: 'public_transport', label: 'Transportasi Umum' },
      { value: 'walk_in', label: 'Jalan Kaki' },
      { value: 'other', label: 'Lainnya' },
    ],
  },
  { key: 'escort_notes', label: humanizeField('notes'), type: 'textarea' },
]

const guarantorFields: CrudField[] = [
  { key: 'member_number', label: 'No. Kartu/Anggota' },
  { key: 'room_class_id', label: humanizeField('room_class_id'), type: 'relation', relationEndpoint: '/room-classes' },
  { key: 'reference_letter_number', label: 'No. Rujukan' },
  { key: 'notes', label: humanizeField('notes'), type: 'textarea' },
]

/**
 * Fungsi (bukan const array) karena field ward_id butuh akses `setForm` PENUH
 * (bukan cuma setter nilai field ini sendiri yang disediakan CrudField.render)
 * supaya bisa sekalian menyalakan is_emergency di step lain saat ward gawat
 * darurat dipilih — lihat WardSelectField di atas dan handler onChange di
 * bawah untuk aturan "hanya nyalakan otomatis, tidak pernah matikan otomatis".
 */
function buildVisitFields(
  setForm: (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => void,
  careType: CareType,
): CrudField[] {
  const fields: CrudField[] = [
    { key: 'admitted_at', label: humanizeField('admitted_at'), type: 'date', required: true },
    { key: 'attending_physician_id', label: 'Dokter DPJP', type: 'relation', relationEndpoint: '/employees' },
    {
      key: 'ward_id',
      label: humanizeField('ward_id'),
      required: careType !== 'outpatient',
      // TIDAK wajib: ward_id kosong = kunjungan rawat jalan (tidak menempati
      // bed) — lihat komentar di StoreVisitRequest.
      type: 'custom',
      render: (value, onChangeValue) => (
        <WardSelectField
          value={(value as number) ?? null}
          careType={careType}
          onChange={(wardId, triggersEmergency) => {
            onChangeValue(wardId)
            // Hanya NYALAKAN otomatis, tidak pernah MEMATIKAN — petugas yang
            // sudah manual mencentang is_emergency untuk alasan lain (mis.
            // pasien gawat darurat kebetulan ditempatkan di ruangan biasa
            // karena IGD penuh) tidak boleh ketimpa jadi false lagi hanya
            // karena ward yang dipilih bukan ward emergency.
            if (triggersEmergency) {
              setForm((prev) => ({ ...prev, is_emergency: true }))
            }
          }}
        />
      ),
    },
    {
      key: 'bed_id',
      label: humanizeField('bed_id'),
      type: 'custom',
      required: careType === 'inpatient',
      render: (value, onChange, form) => (
        <BedSelectField value={(value as number) ?? null} wardId={(form.ward_id as number) ?? null} onChange={onChange} />
      ),
    },
    { key: 'is_new_visit', label: humanizeField('is_new_visit'), type: 'checkbox' },
    { key: 'is_deposit', label: humanizeField('is_deposit'), type: 'checkbox' },
    {
      key: 'deposit_class_id',
      label: humanizeField('deposit_class_id'),
      type: 'relation',
      relationEndpoint: '/room-classes',
      disabledWhen: (form) => !form.is_deposit,
    },
  ]

  return careType === 'outpatient' ? fields.filter((field) => !['ward_id', 'bed_id', 'deposit_class_id'].includes(field.key)) : fields
}

const today = () => new Date().toISOString().slice(0, 10)

const emptyForm = {
  patient_id: null as number | null,
  care_type: 'outpatient' as CareType,
  registered_at: today(),
  is_emergency: false,
  has_fall_risk: false,
  admission_diagnosis_id: null,
  referral_id: null,
  package_id: null,
  payer_type: 'self_pay' as PayerType,
  member_number: '',
  room_class_id: null,
  reference_letter_number: '',
  notes: '',
  admitted_at: today(),
  attending_physician_id: null,
  ward_id: null,
  bed_id: null,
  is_new_visit: true,
  is_deposit: false,
  deposit_class_id: null,
  // Gap 1 — Bayi Baru Lahir (toggle manual) & Kecelakaan/Tidak Dikenal
  // (derive dari patient.is_unidentified, lihat step 0).
  is_newborn_visit: false,
  newborn_weight_grams: null as number | null,
  newborn_length_cm: null as number | null,
  birth_time: '',
  found_location: '',
  found_at: '',
  // Gap 2 — Penanggung Jawab & Pengantar (step 5, opsional).
  guardian_full_name: '',
  guardian_relationship_to_patient: 'other',
  guardian_identity_number: '',
  guardian_phone_number: '',
  guardian_address: '',
  guardian_occupation: '',
  escort_full_name: '',
  escort_relationship_to_patient: 'other',
  escort_phone_number: '',
  escort_address: '',
  escort_arrival_mode: 'private_vehicle',
  escort_notes: '',
}

function PatientSummaryCard({ patientId }: { patientId: number | null }) {
  const { useDetail } = usePatientResource()
  const { data: patient, isLoading } = useDetail(patientId ?? undefined)

  if (!patientId) return null
  if (isLoading) return <p className="text-muted-foreground text-xs">Memuat data pasien...</p>
  if (!patient) return null

  return (
    <Card className="flex-row flex-wrap gap-x-6 gap-y-1 px-4 text-sm">
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">Nama</span>
        <span className="font-medium">{patient.name ?? '—'}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">No. Rekam Medis</span>
        <span className="font-medium">{patient.medical_record_number ?? '—'}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">NIK</span>
        <span className="font-medium">{patient.nik ?? '—'}</span>
      </div>
    </Card>
  )
}

function PendaftaranKunjunganWizard({ onDone }: { onDone: () => void }) {
  const navigate = useNavigate()
  const registrationResource = useRegistrationResource()
  const guarantorResource = useGuarantorResource()
  const visitResource = useVisitResource()
  const patientGuardianResource = usePatientGuardianResource()
  const patientEscortResource = usePatientEscortResource()

  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successInfo, setSuccessInfo] = useState<{
    registrationId: number
    guarantorId?: number
    visitId: number
    guardianId?: number
    escortId?: number
  } | null>(null)

  // Dialog "Pasien Baru" dibuka DI DALAM wizard (sebelumnya link target="_blank"
  // yang melempar petugas keluar aplikasi, lalu harus kembali dan mencari pasien
  // itu manual). Setelah tersimpan, pasien baru langsung dipilih di combobox.
  const [patientDialogOpen, setPatientDialogOpen] = useState(false)
  const [patientSubmitting, setPatientSubmitting] = useState(false)
  // AsyncCombobox meng-cache hasil pencariannya; remount lewat key memaksa
  // daftar dimuat ulang agar pasien yang baru dibuat ikut muncul.
  const [patientComboboxKey, setPatientComboboxKey] = useState(0)
  // Nama pasien yang baru dibuat — dipakai sebagai label awal combobox karena
  // pasien itu belum ada di hasil pencarian yang sedang di-cache.
  const [newPatientLabel, setNewPatientLabel] = useState<string | null>(null)

  const payerType = (form.payer_type as PayerType) ?? 'self_pay'
  const careType = (form.care_type as CareType) ?? 'outpatient'
  const skipGuarantorStep = payerType === 'self_pay'

  const patientResource = usePatientResource()
  const { useDetail: usePatientDetail } = patientResource
  const { data: selectedPatient } = usePatientDetail((form.patient_id as number | null) ?? undefined)
  const isUnidentifiedPatient = Boolean((selectedPatient as { is_unidentified?: boolean } | undefined)?.is_unidentified)

  // Step "Penjamin" dilewati (bukan dihilangkan dari indikator) saat Umum —
  // mekanisme serupa PatientFormDialog yang menyembunyikan step "Kontak &
  // Keluarga" secara kondisional; di sini step tetap tampil di indikator
  // dengan tanda "(dilewati)" supaya urutan step tidak membingungkan saat
  // petugas berpindah maju/mundur, tapi otomatis dilompati saat navigasi.
  const lastStep = STEP_LABELS.length - 1

  /**
   * Field wajib pada step yang sedang aktif dan masih kosong.
   *
   * Hanya step "Kunjungan" (index 3) yang punya field bertanda `required` —
   * step lain divalidasi lewat mekanisme sendiri (mis. `patient_id` menonaktifkan
   * tombol Selanjutnya) atau memang seluruhnya opsional.
   */
  function missingRequiredOnCurrentStep(): CrudField[] {
    if (stepIndex !== 3) return []

    return buildVisitFields(setForm, careType).filter((field) => {
      if (!field.required) return false
      const value = form[field.key]
      return value === undefined || value === null || value === ''
    })
  }

  /**
   * Simpan pasien baru dari dalam wizard, lalu langsung pilih hasilnya.
   *
   * Kartu identitas (key `identity_cards`) tidak ikut diproses di sini — alur
   * cepat ini hanya membuat data induk pasien supaya pendaftaran bisa lanjut;
   * kartu identitas dilengkapi belakangan lewat menu Data Pasien.
   */
  async function handleCreatePatient(patientForm: Record<string, unknown>) {
    const { identity_cards: _cards, __age_display: _age, ...payload } = patientForm

    setPatientSubmitting(true)
    try {
      const created = await patientResource.create.mutateAsync(payload)
      setForm((prev) => ({ ...prev, patient_id: Number(created.id) }))
      setNewPatientLabel(created.name ?? null)
      setPatientComboboxKey((k) => k + 1)
      setPatientDialogOpen(false)
      toast.success(`Pasien "${created.name}" tersimpan dan langsung dipilih.`)
    } catch (error) {
      notifyApiError(error)
    } finally {
      setPatientSubmitting(false)
    }
  }

  function goNext() {
    const missing = missingRequiredOnCurrentStep()
    if (missing.length > 0) {
      toast.error('Lengkapi isian wajib terlebih dahulu.', {
        description: missing.map((f) => f.label).join(', '),
      })
      return
    }

    let next = stepIndex + 1
    if (next === 2 && skipGuarantorStep) next += 1
    setStepIndex(Math.min(next, lastStep))
  }

  function goPrev() {
    let prev = stepIndex - 1
    if (prev === 2 && skipGuarantorStep) prev -= 1
    setStepIndex(Math.max(prev, 0))
  }

  function resetWizard() {
    setForm(emptyForm)
    setStepIndex(0)
    setSubmitError(null)
    setSuccessInfo(null)
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(null)

    let registrationId: number | undefined
    let guarantorId: number | undefined
    let visitId: number | undefined
    let guardianId: number | undefined
    let escortId: number | undefined

    try {
      const isNewborn = Boolean(form.is_newborn_visit)
      const registrationPayload: Partial<Registration> = {
        patient_id: form.patient_id as number | null,
        registered_at: (form.registered_at as string) || null,
        admission_diagnosis_id: (form.admission_diagnosis_id as number | null) || null,
        referral_id: (form.referral_id as number | null) || null,
        package_id: (form.package_id as number | null) || null,
        is_emergency: Boolean(form.is_emergency),
        has_fall_risk: Boolean(form.has_fall_risk),
        newborn_weight_grams: isNewborn ? (form.newborn_weight_grams as number | null) || null : null,
        newborn_length_cm: isNewborn ? (form.newborn_length_cm as number | null) || null : null,
        birth_time: isNewborn ? (form.birth_time as string) || null : null,
        found_location: isUnidentifiedPatient ? (form.found_location as string) || null : null,
        found_at: isUnidentifiedPatient ? (form.found_at as string) || null : null,
      }
      const registration = await registrationResource.create.mutateAsync(registrationPayload)
      registrationId = Number(registration.id)

      if (!skipGuarantorStep) {
        try {
          const guarantorPayload: Partial<Guarantor> = {
            registration_id: registrationId,
            payer_type: payerType,
            member_number: (form.member_number as string) || null,
            room_class_id: (form.room_class_id as number | null) || null,
            reference_letter_number: (form.reference_letter_number as string) || null,
            notes: (form.notes as string) || null,
          }
          const guarantor = await guarantorResource.create.mutateAsync(guarantorPayload)
          guarantorId = Number(guarantor.id)
        } catch (guarantorErr) {
          throw new Error(
            `Registrasi berhasil dibuat (ID #${registrationId}) tetapi data Penjamin GAGAL disimpan: ${describeError(guarantorErr)}. ` +
              `Buka menu Pendaftaran > Penjamin untuk melengkapi data Penjamin untuk registrasi #${registrationId} secara manual.`,
          )
        }
      }

      // Tujuan pasien dicatat SEBELUM kunjungan, mengikuti urutan legacy
      // (PendaftaranService::simpan -> simpanTujuan -> baru kunjungan).
      // Tujuan = rencana ruangan, kunjungan = realisasi pelayanan; pemisahan ini
      // yang memungkinkan pasien masuk antrean poli sebelum diterima petugas.
      //
      // Hanya untuk kunjungan yang punya ruangan tujuan. Rawat jalan tanpa poli
      // terpilih tidak membentuk tujuan — konsisten dengan `ward_id` nullable.
      if (form.ward_id) {
        try {
          await apiClient.post('/pendaftaranvisitdestinations', {
            registration_id: registrationId,
            ward_id: form.ward_id as number,
            doctor_id: (form.attending_physician_id as number | null) || null,
          })
        } catch (destinationErr) {
          // Tidak membatalkan alur: registrasi sudah tersimpan, dan kunjungan
          // masih bisa dibuat. Yang hilang hanya jejak antrean poli.
          setSubmitError(
            (prev) =>
              `${prev ? prev + ' ' : ''}Tujuan pasien GAGAL disimpan untuk registrasi #${registrationId}: ${describeError(destinationErr)}. Pasien tetap terdaftar, tetapi tidak masuk antrean poli.`,
          )
        }
      }

      try {
        const visitPayload: Partial<Visit> = {
          registration_id: registrationId,
          admitted_at: (form.admitted_at as string) || null,
          attending_physician_id: (form.attending_physician_id as number | null) || null,
          ward_id: (form.ward_id as number | null) || null,
          bed_id: (form.bed_id as number | null) || null,
          is_new_visit: Boolean(form.is_new_visit),
          is_deposit: Boolean(form.is_deposit),
          deposit_class_id: form.is_deposit ? (form.deposit_class_id as number | null) || null : null,
        }
        const visit = await visitResource.create.mutateAsync(visitPayload)
        visitId = Number(visit.id)
      } catch (visitErr) {
        throw new Error(
          `Registrasi (ID #${registrationId})${guarantorId ? ` dan Penjamin (ID #${guarantorId})` : ''} berhasil dibuat, tetapi Kunjungan GAGAL disimpan: ${describeError(visitErr)}. ` +
            `Buka menu Pendaftaran > Kunjungan untuk melengkapi data Kunjungan untuk registrasi #${registrationId} secara manual.`,
        )
      }

      // Gap 2 — Penanggung Jawab & Pengantar: keduanya OPSIONAL beneran, skip
      // POST kalau full_name kosong (bukan validasi keras, cukup "jangan
      // kirim data kosong"). Kegagalan di sini TIDAK membatalkan alur —
      // Registrasi/Penjamin/Kunjungan sudah tersimpan, cukup beri tahu
      // petugas untuk melengkapi manual, sama pola dengan guarantor/visit.
      const guardianName = (form.guardian_full_name as string)?.trim()
      if (guardianName) {
        try {
          const guardianPayload: Partial<PatientGuardian> = {
            registration_id: registrationId,
            full_name: guardianName,
            relationship_to_patient: (form.guardian_relationship_to_patient as string) || 'other',
            identity_number: (form.guardian_identity_number as string) || null,
            phone_number: (form.guardian_phone_number as string) || null,
            address: (form.guardian_address as string) || null,
            occupation: (form.guardian_occupation as string) || null,
          }
          const guardian = await patientGuardianResource.create.mutateAsync(guardianPayload)
          guardianId = Number(guardian.id)
        } catch (guardianErr) {
          setSubmitError(
            (prev) =>
              `${prev ? prev + ' ' : ''}Penanggung Jawab GAGAL disimpan untuk registrasi #${registrationId}: ${describeError(guardianErr)}. Lengkapi manual lewat menu Pendaftaran > Penanggung Jawab.`,
          )
        }
      }

      const escortName = (form.escort_full_name as string)?.trim()
      if (escortName) {
        try {
          const escortPayload: Partial<PatientEscort> = {
            registration_id: registrationId,
            full_name: escortName,
            relationship_to_patient: (form.escort_relationship_to_patient as string) || 'other',
            phone_number: (form.escort_phone_number as string) || null,
            address: (form.escort_address as string) || null,
            arrival_mode: (form.escort_arrival_mode as string) || 'private_vehicle',
            notes: (form.escort_notes as string) || null,
          }
          const escort = await patientEscortResource.create.mutateAsync(escortPayload)
          escortId = Number(escort.id)
        } catch (escortErr) {
          setSubmitError(
            (prev) =>
              `${prev ? prev + ' ' : ''}Pengantar GAGAL disimpan untuk registrasi #${registrationId}: ${describeError(escortErr)}. Lengkapi manual lewat menu Pendaftaran > Pengantar.`,
          )
        }
      }

      setSuccessInfo({ registrationId, guarantorId, visitId: visitId!, guardianId, escortId })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : describeError(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (successInfo) {
    return (
      <Card className="gap-3 p-6">
        <div className="flex items-center gap-2 text-emerald-600">
          <Check className="size-5" />
          <h2 className="text-lg font-semibold">Kunjungan berhasil didaftarkan</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Registrasi #{successInfo.registrationId}
          {successInfo.guarantorId ? `, Penjamin #${successInfo.guarantorId}` : ''}, dan Kunjungan #{successInfo.visitId} berhasil
          disimpan.
          {successInfo.guardianId ? ` Penanggung Jawab #${successInfo.guardianId} tersimpan.` : ''}
          {successInfo.escortId ? ` Pengantar #${successInfo.escortId} tersimpan.` : ''}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button onClick={() => navigate(`/pelayanan-pasien/${successInfo.visitId}`)}>
            Buka Pelayanan Pasien
          </Button>
          <Button variant="outline" onClick={resetWizard}>Daftarkan Pasien Lain</Button>
          <Button variant="outline" onClick={onDone}>
            Selesai
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <ol className="flex flex-wrap items-center gap-2 border-b pb-3">
        {STEP_LABELS.map((label, i) => {
          const skipped = i === 2 && skipGuarantorStep
          const state = i === stepIndex ? 'current' : i < stepIndex ? 'done' : 'upcoming'
          return (
            <Fragment key={label}>
              {i > 0 && <span className="text-muted-foreground text-xs">—</span>}
              <li>
                <button
                  type="button"
                  disabled={skipped}
                  onClick={() => setStepIndex(i)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    skipped
                      ? 'border-border text-muted-foreground/50 line-through'
                      : state === 'current'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : state === 'done'
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground'
                  }`}
                >
                  {state === 'done' && !skipped ? <Check className="size-3" /> : <span>{i + 1}.</span>}
                  {label}
                  {skipped ? ' (dilewati)' : ''}
                </button>
              </li>
            </Fragment>
          )
        })}
      </ol>

      <div className="flex flex-col gap-5">
        {stepIndex === 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label className="text-sm font-medium">
                  Pasien <span className="text-destructive">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setPatientDialogOpen(true)}
                  className="text-primary text-xs font-medium hover:underline"
                >
                  + Pasien Baru
                </button>
              </div>
              <AsyncCombobox
                key={patientComboboxKey}
                endpoint="/patients"
                value={form.patient_id as number | null}
                initialLabel={newPatientLabel}
                onChange={(v) => setForm((prev) => ({ ...prev, patient_id: v }))}
              />
              <p className="text-muted-foreground text-xs">
                Belum terdaftar? Klik "+ Pasien Baru" — pasien yang baru dibuat langsung terpilih di sini.
              </p>
            </div>
            <PatientSummaryCard patientId={form.patient_id as number | null} />
            <RecordFieldsForm fields={registrationFields} form={form} setForm={setForm} />

            {/* Gap 1 — Kecelakaan/Tidak Dikenal: OTOMATIS muncul (bukan checkbox
                terpisah) berdasarkan status pasien is_unidentified, karena
                statusnya sudah tercatat di data pasien itu sendiri. */}
            {isUnidentifiedPatient && (
              <div className="flex flex-col gap-3 rounded-lg border p-4">
                <p className="text-muted-foreground text-xs">
                  Pasien tercatat sebagai "Tidak Dikenal" — isi lokasi &amp; waktu ditemukan jika diketahui.
                </p>
                <RecordFieldsForm
                  fields={[
                    { key: 'found_location', label: 'Lokasi Ditemukan' },
                    { key: 'found_at', label: 'Waktu Ditemukan', type: 'date' },
                  ]}
                  form={form}
                  setForm={setForm}
                />
              </div>
            )}

            {/* Gap 1 — Bayi Baru Lahir: toggle manual (butuh keputusan
                petugas per kunjungan, tidak bisa di-derive dari data pasien). */}
            <div className="flex flex-col gap-3 rounded-lg border p-4">
              <RecordFieldsForm
                fields={[{ key: 'is_newborn_visit', label: 'Ini kunjungan untuk bayi baru lahir?', type: 'checkbox' }]}
                form={form}
                setForm={setForm}
              />
              {Boolean(form.is_newborn_visit) && <RecordFieldsForm fields={newbornFields} form={form} setForm={setForm} />}
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PAYER_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, payer_type: opt.value }))}
                  className={`flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors ${
                    payerType === opt.value ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium">
                    {payerType === opt.value && <Check className="size-4 text-primary" />}
                    {opt.label}
                  </span>
                  <span className="text-muted-foreground text-xs">{opt.description}</span>
                </button>
              ))}
            </div>
            <h3 className="text-sm font-semibold">Detail Registrasi Tambahan</h3>
            <RecordFieldsForm fields={registrationDetailFields} form={form} setForm={setForm} />
            {/* Gap 4 — Rujukan BPJS: SEKADAR DISCLAIMER, verifikasi real-time
                ke server BPJS di luar scope (butuh kredensial/sertifikat
                faskes resmi, tidak bisa diuji tanpa akses BPJS asli). */}
            {payerType === 'bpjs' && (
              <p className="text-muted-foreground text-xs">
                Verifikasi rujukan BPJS real-time belum tersedia di versi ini — pastikan nomor rujukan sudah diverifikasi manual
                melalui aplikasi BPJS resmi sebelum melanjutkan.
              </p>
            )}
          </div>
        )}

        {stepIndex === 2 && !skipGuarantorStep && <RecordFieldsForm fields={guarantorFields} form={form} setForm={setForm} />}

        {stepIndex === 3 && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Tujuan Pelayanan</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {CARE_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((previous) => ({
                        ...previous,
                        care_type: option.value,
                        is_emergency: option.value === 'emergency',
                        ward_id: null,
                        bed_id: null,
                        deposit_class_id: option.value === 'outpatient' ? null : previous.deposit_class_id,
                      }))
                    }
                    className={`flex flex-col gap-1 rounded-lg border p-4 text-left transition-colors ${
                      careType === option.value
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {careType === option.value && <Check className="size-4 text-primary" />}
                      {option.label}
                    </span>
                    <span className="text-muted-foreground text-xs">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
            <RecordFieldsForm fields={buildVisitFields(setForm, careType)} form={form} setForm={setForm} />
          </div>
        )}

        {stepIndex === 4 && (
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground text-xs">
              Kedua form di bawah OPSIONAL — kosongkan semua jika pasien datang sendiri tanpa penanggung jawab/pengantar formal.
              Data hanya disimpan jika kolom "Nama Lengkap" diisi.
            </p>
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">Penanggung Jawab</h3>
              <RecordFieldsForm fields={guardianFields} form={form} setForm={setForm} />
            </div>
            <div className="flex flex-col gap-3 border-t pt-4">
              <h3 className="text-sm font-semibold">Pengantar Pasien</h3>
              <RecordFieldsForm fields={escortFields} form={form} setForm={setForm} />
            </div>
          </div>
        )}
      </div>

      {submitError && (
        <div className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border p-3 text-sm">{submitError}</div>
      )}

      <div className="flex items-center justify-between gap-2 border-t pt-4">
        <Button variant="outline" onClick={goPrev} disabled={stepIndex === 0}>
          Sebelumnya
        </Button>
        {stepIndex < lastStep ? (
          <Button onClick={goNext} disabled={stepIndex === 0 && !form.patient_id}>
            Selanjutnya
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting || !form.patient_id}>
            {submitting ? 'Mendaftarkan...' : 'Daftarkan Kunjungan'}
          </Button>
        )}
      </div>

      <PatientFormDialog
        open={patientDialogOpen}
        onOpenChange={setPatientDialogOpen}
        editing={null}
        fields={buildPatientFields(false)}
        emptyForm={emptyPatientForm}
        onSubmit={handleCreatePatient}
        submitting={patientSubmitting}
        title="Pasien"
        description="Pasien baru akan langsung dipilih untuk pendaftaran ini."
      />
    </div>
  )
}


function describeError(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }).response
    const message = response?.data?.message
    const errors = response?.data?.errors
    if (errors) {
      const detail = Object.values(errors).flat().join('; ')
      return message ? `${message}: ${detail}` : detail
    }
    if (message) return message
  }
  return err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui.'
}

/** Windowed page list for <Pagination> — same helper duplicated across list pages in this codebase. */
function pageWindow(current: number, last: number): (number | 'ellipsis')[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1)

  const pages = new Set<number>([1, last, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b)

  const result: (number | 'ellipsis')[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('ellipsis')
    result.push(sorted[i])
  }
  return result
}

function buildVisitColumns(onOpenService: (visitId: number) => void): ColumnDef<Visit, unknown>[] {
  return [
  {
    header: humanizeField('visit_number'),
    accessorKey: 'visit_number',
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.visit_number ?? '—'}</span>,
  },
  {
    header: humanizeField('registration_id'),
    accessorKey: 'registration_id',
    cell: ({ row }) => String(row.original.registration_id ?? '—'),
  },
  {
    header: 'Dokter DPJP',
    cell: ({ row }) => <RelationLabel endpoint="/employees" id={row.original.attending_physician_id ?? null} />,
  },
  {
    header: humanizeField('ward_id'),
    cell: ({ row }) => <RelationLabel endpoint="/wards" id={row.original.ward_id ?? null} />,
  },
  {
    header: humanizeField('admitted_at'),
    accessorKey: 'admitted_at',
    cell: ({ row }) => String(row.original.admitted_at ?? '—'),
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => (
      <Button size="sm" variant="outline" onClick={() => onOpenService(row.original.id)}>
        Buka Pelayanan
      </Button>
    ),
  },
  ]
}

/**
 * Halaman utama menu "Pendaftaran Kunjungan" — tabel daftar Kunjungan (hasil
 * akhir dari wizard, entitas paling representatif dibanding Registrasi/
 * Penjamin) + tombol "Tambah Kunjungan" yang membuka wizard 4-langkah di
 * dalam modal, konsisten dengan pola CrudDialogPage/PatientFormDialog yang
 * dipakai modul lain (buka menu → tabel dulu, bukan langsung form).
 */
export function PendaftaranKunjunganPage() {
  const navigate = useNavigate()
  const visitResource = useVisitResource()
  const [page, setPage] = useState(1)
  const { data, isLoading } = visitResource.useList({ page })

  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardKey, setWizardKey] = useState(0)

  function openWizard() {
    setWizardKey((k) => k + 1)
    setWizardOpen(true)
  }

  function closeAndRefresh() {
    setWizardOpen(false)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Pendaftaran Kunjungan</h1>
          <p className="text-muted-foreground text-sm">
            Daftar kunjungan pasien. Gunakan "Tambah Kunjungan" untuk mendaftarkan pasien dalam satu alur — menggabungkan
            Registrasi, Penjamin, dan Kunjungan.
          </p>
        </div>
        <Button onClick={openWizard}>Tambah Kunjungan</Button>
      </div>

      <DataTable
        columns={buildVisitColumns((visitId) => navigate(`/pelayanan-pasien/${visitId}`))}
        data={data?.items ?? []}
        loading={isLoading}
      />

      {data && data.lastPage > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                onClick={() => page > 1 && setPage(page - 1)}
              />
            </PaginationItem>
            {pageWindow(page, data.lastPage).map((p, i) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink isActive={p === page} onClick={() => setPage(p)} className="cursor-pointer">
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                className={page >= data.lastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                onClick={() => page < data.lastPage && setPage(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
        <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Tambah Kunjungan</DialogTitle>
            <DialogDescription>
              Daftarkan kunjungan pasien dalam satu alur — menggabungkan Registrasi, Penjamin, dan Kunjungan.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
            {/* key berubah tiap kali dibuka supaya state wizard reset bersih, tanpa harus expose reset imperative dari dalam */}
            <PendaftaranKunjunganWizard key={wizardKey} onDone={closeAndRefresh} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
