import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { usePatientContactResource } from '@/features/GeneralPatientContact/api'
import { usePatientFamilyResource } from '@/features/GeneralPatientFamily/api'
import { usePatientIdentityCardResource } from '@/features/GeneralPatientIdentityCard/api'
import { PatientPhotoPanel } from '@/features/GeneralPatientPhoto/components/PatientPhotoPanel'
import { AgeDisplay } from '../components/AgeDisplay'
import { PatientFormDialog } from '../components/PatientFormDialog'
import { PatientIdentityCardListEditor, type PatientIdentityCardRow } from '../components/PatientIdentityCardListEditor'
import { PrintPatientCardButton } from '../components/PrintPatientCardButton'
import type { CrudField } from '@/shared/components/RecordFieldsForm'
import { DataTable } from '@/shared/components/DataTable'
import { InlineNestedList } from '@/shared/components/InlineNestedList'
import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { humanizeField } from '@/shared/labels'
import { notifyApiError } from '@/shared/lib/apiError'
import { toast } from 'sonner'
import { usePatientDuplicateSearch, usePatientResource } from '../api'
import type { Patient } from '../types'

/**
 * Alur 1001 step 1 (docs-sim/ALUR-OPERASIONAL-SIMGOS.md): tampilkan kandidat
 * pasien yang sudah terdaftar begitu petugas mengisi NIK atau nama+tanggal
 * lahir, sebelum data baru disimpan. Ini peringatan, bukan hard block — NIK
 * tidak diverifikasi ke Disdukcapil (aplikasi ini tidak terhubung ke sana),
 * jadi keputusan "ini pasien lama atau baru" tetap di tangan petugas.
 */
function DuplicateWarning({ form, editingId }: { form: Record<string, unknown>; editingId: number | string | undefined }) {
  const nik = typeof form.nik === 'string' ? form.nik : ''
  const name = typeof form.name === 'string' ? form.name : ''
  const birthDate = typeof form.birth_date === 'string' ? form.birth_date : ''
  const enabled = nik.length === 16 || name.trim().length >= 3

  const { data: candidates } = usePatientDuplicateSearch({ nik, name, birth_date: birthDate }, enabled)
  const matches = (candidates ?? []).filter((p) => p.id !== editingId)

  if (!enabled || matches.length === 0) return null

  return (
    <div className="border-warning/40 bg-warning/10 flex flex-col gap-2 rounded-md border p-3">
      <p className="text-sm font-medium">Kemungkinan pasien ini sudah pernah terdaftar:</p>
      <ul className="flex flex-col gap-1">
        {matches.map((p) => (
          <li key={p.id} className="text-muted-foreground text-xs">
            <span className="font-mono">{p.medical_record_number ?? '—'}</span> — {p.name}
            {p.birth_date ? ` (${new Date(p.birth_date).toLocaleDateString('id-ID')})` : ''}
            {p.nik ? ` — NIK ${p.nik}` : ''}
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground text-xs">Periksa daftar di atas sebelum melanjutkan membuat data baru.</p>
    </div>
  )
}

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
    header: humanizeField('nik'),
    accessorKey: 'nik',
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.nik ?? '—'}</span>,
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

const SATUSEHAT_STATUS_LABEL: Record<string, { label: string; className: string }> = {
  not_submitted: { label: 'Belum Disinkronkan', className: 'bg-muted text-muted-foreground border-border' },
  pending: { label: 'Menunggu', className: 'bg-warning/10 text-warning border-warning/30' },
  sent: { label: 'Terkirim', className: 'bg-primary/10 text-primary border-primary/20' },
  failed: { label: 'Gagal', className: 'bg-destructive/10 text-destructive border-destructive/20' },
}

/**
 * Badge read-only untuk status_sync SATUSEHAT — field ini murni derived dari
 * outbox satu_sehat_staging_submissions (lihat PatientResource backend),
 * tidak pernah dikirim balik ke server (bukan bagian payload update), jadi
 * cukup dibaca langsung dari `form` tanpa onChange.
 */
function SatuSehatStatusBadge({ status, satusehatId }: { status: unknown; satusehatId: unknown }) {
  const key = typeof status === 'string' && status in SATUSEHAT_STATUS_LABEL ? status : 'not_submitted'
  const meta = SATUSEHAT_STATUS_LABEL[key]
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={meta.className}>
        {meta.label}
      </Badge>
      {key === 'sent' && satusehatId ? <span className="text-muted-foreground text-xs font-mono">{String(satusehatId)}</span> : null}
    </div>
  )
}

// medical_record_number dikosongkan = backend auto-generate (lihat
// StorePatientRequest: nullable + Patient::generateMedicalRecordNumber()).
//
// Field ini tetap disediakan di mode Tambah — TIDAK wajib — khusus untuk pasien
// migrasi yang sudah memegang NRM dari sistem lama. SIMpel legacy menyebutnya
// "Norm Manual". Tanpa kotak ini, NRM lama pasien tidak bisa dipertahankan dan
// riwayat rekam medisnya terputus saat migrasi.
//
// Di mode Ubah field ini disembunyikan: mengganti NRM pasien yang sudah berjalan
// memutus rujukan dari kunjungan/tagihan/berkas klaim yang sudah mengacu ke sana.
//
// Fungsi (bukan const array statis) supaya field status SATUSEHAT bisa
// disembunyikan TOTAL di mode Tambah — CrudField tidak punya mekanisme
// "hide entirely" (cuma disabledWhen yang tetap merender inputnya, disabled),
// dan field ini murni read-only hasil GET show, tidak relevan sama sekali
// sebelum pasien tersimpan (belum ada apa-apa untuk disinkronkan).
export function buildFields(isEditing: boolean): CrudField[] {
  const identitasFields: CrudField[] = [
    // Hanya di mode Tambah — lihat catatan di atas soal alasan menyembunyikannya
    // saat Ubah.
    ...(isEditing
      ? []
      : [
          {
            key: 'medical_record_number',
            label: 'No. Rekam Medis (Manual)',
            placeholder: 'Kosongkan untuk dibuatkan otomatis',
            section: 'Identitas',
          } satisfies CrudField,
        ]),
    {
      key: 'nik',
      label: humanizeField('nik'),
      section: 'Identitas',
      disabledWhen: (form) => Boolean(form.is_unidentified),
    },
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
    // Tanggal lahir wajib: menjadi dasar perhitungan umur (dosis pediatri) dan
    // pembeda utama saat nama pasien sama. SIMpel legacy juga menetapkannya
    // NOT NULL; sebelumnya di sini masih opsional.
    {
      key: 'birth_date',
      label: humanizeField('birth_date'),
      type: 'date',
      required: true,
      section: 'Identitas',
      disabledWhen: (form) => Boolean(form.is_unidentified),
    },
    // Umur: turunan read-only dari birth_date, tidak ikut dikirim ke server.
    // Mengikuti SIMpel legacy yang menampilkan Thn/Bln/hr di sebelah tanggal
    // lahir untuk verifikasi cepat identitas dan pengecekan dosis pediatri.
    {
      key: '__age_display',
      label: 'Umur',
      type: 'custom',
      section: 'Identitas',
      render: (_value, _onChange, form) => <AgeDisplay birthDate={form.birth_date} />,
    },
    { key: 'gender_id', label: humanizeField('gender_id'), type: 'relation', relationEndpoint: '/genders', section: 'Identitas' },
    { key: 'religion_id', label: humanizeField('religion_id'), type: 'relation', relationEndpoint: '/religions', section: 'Identitas' },
  ]

  const alamatFields: CrudField[] = [
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
  ]

  const kartuIdentitasFields: CrudField[] = [
    {
      key: 'identity_cards',
      label: 'Kartu Identitas',
      type: 'custom',
      section: 'Kartu Identitas',
      render: (value, onChange) => (
        <PatientIdentityCardListEditor
          value={(value as PatientIdentityCardRow[]) ?? []}
          onChange={(rows) => onChange(rows)}
        />
      ),
    },
    // No. BPJS: field dedicated terpisah dari list kartu identitas generik di
    // atas (identity_card_types data master) — bukan duplikat, BPJS akan
    // butuh metadata tambahan nanti (eligibilitas/kelas rawat) yang beda
    // struktur. Diisi manual petugas, opsional.
    { key: 'no_bpjs', label: 'No. BPJS', section: 'Kartu Identitas' },
    // Status SATUSEHAT: read-only, hasil derive backend dari outbox
    // satu_sehat_staging_submissions — TIDAK pernah dikirim balik ke server
    // (key `satusehat_sync_status` dipakai murni sebagai "slot" nilai; badge
    // butuh juga `satusehat_id` yang tidak lewat lewat parameter render biasa,
    // jadi diselipkan sebagai objek gabungan lewat prefill — lihat handling
    // khusus di PatientListPage.extraPrefill). Disembunyikan total di mode
    // Tambah (lihat komentar di buildFields) karena CrudField tidak punya
    // mekanisme hide-entirely, dan field ini tidak relevan sebelum pasien
    // tersimpan.
    ...(isEditing
      ? ([
          {
            key: 'satusehat_status_display',
            label: 'Status SATUSEHAT',
            type: 'custom',
            section: 'Kartu Identitas',
            render: (value) => {
              const v = (value as { status?: unknown; satusehat_id?: unknown }) ?? {}
              return <SatuSehatStatusBadge status={v.status} satusehatId={v.satusehat_id} />
            },
          },
        ] as CrudField[])
      : []),
  ]

  const dataTambahanFields: CrudField[] = [
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
    key: 'patient_status_id',
    label: humanizeField('patient_status_id'),
    type: 'relation',
    relationEndpoint: '/patient-statuses',
    section: 'Data Tambahan',
  },
  {
    key: 'patient_type_id',
    label: humanizeField('patient_type_id'),
    type: 'relation',
    relationEndpoint: '/patient-types',
    section: 'Data Tambahan',
  },
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

  return [...identitasFields, ...alamatFields, ...kartuIdentitasFields, ...dataTambahanFields]
}

export const emptyForm = {
  nik: '',
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
  identity_cards: [] as PatientIdentityCardRow[],
  no_bpjs: '',
  education_id: null,
  occupation_id: null,
  marital_status_id: null,
  blood_type_id: null,
  nationality_id: null,
  ethnicity_id: null,
  language_id: null,
  is_unidentified: false,
  patient_status_id: null,
  patient_type_id: null,
  is_active: true,
}

/** Windowed page list for <Pagination> — same helper duplicated in CrudDialogPage/CrudListPage/WorkflowListPage. */
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

export function PatientListPage() {
  const resource = usePatientResource()
  const contactResource = usePatientContactResource()
  const familyResource = usePatientFamilyResource()
  const identityCardResource = usePatientIdentityCardResource()

  const [page, setPage] = useState(1)
  const { data, isLoading } = resource.useList({ page })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Patient | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null)

  // Field status SATUSEHAT read-only cuma relevan mode Ubah (lihat buildFields).
  const fields = buildFields(Boolean(editing))

  // Prefill step "Kartu Identitas" saat mode Ubah: kartu identitas pasien
  // disimpan di resource terpisah (/patientidentitycards), bukan field
  // langsung di object Patient, jadi tidak ke-cover oleh prefill dasar
  // PatientFormDialog (yang cuma menyalin editing[f.key]) — di-fetch di sini
  // lalu didorong ke form lewat prop `extraPrefill`. Baris existing ditandai
  // `id` supaya handleSubmit tahu ini UPDATE, bukan CREATE baru, kalau
  // pengguna mengubah isinya.
  // useList tidak punya opsi `enabled` — kirim patient_id yang mustahil cocok
  // (-1) saat dialog tertutup/mode Tambah supaya tidak menembak endpoint
  // tanpa filter (yang akan mengambil SEMUA kartu identitas semua pasien).
  const { data: existingIdentityCards } = identityCardResource.useList({
    patient_id: dialogOpen && editing ? editing.id : -1,
  })
  const identityCardsPrefill: PatientIdentityCardRow[] | undefined =
    dialogOpen && editing && existingIdentityCards
      ? existingIdentityCards.items.map((card) => ({
          id: card.id,
          identity_card_type_id: card.identity_card_type_id,
          identity_number: card.identity_number ?? '',
          is_same_as_current_address: card.is_same_as_current_address ?? true,
          address: card.address ?? null,
          rt: card.rt ?? null,
          rw: card.rw ?? null,
          postal_code: card.postal_code ?? null,
          village_id: card.village_id ?? null,
        }))
      : undefined

  // Status SATUSEHAT (satusehat_sync_status/satusehat_id) sengaja HANYA
  // diekspos backend di endpoint show (bukan index/list, biar listing tetap
  // ringan — lihat PatientResource::withSatuSehatStatus), jadi row.original
  // dari tabel (hasil index) belum membawanya. Di-fetch ulang lewat useDetail
  // saat dialog Ubah dibuka, sama pola dengan existingIdentityCards di atas.
  const { data: patientDetail } = resource.useDetail(dialogOpen && editing ? editing.id : undefined)
  const satuSehatPrefill =
    dialogOpen && editing && patientDetail
      ? { satusehat_status_display: { status: patientDetail.satusehat_sync_status, satusehat_id: patientDetail.satusehat_id } }
      : undefined

  const submitting = resource.create.isPending || resource.update.isPending

  async function handleSubmit(form: Record<string, unknown>) {
    // Step "Kartu Identitas" menumpang di form pasien (key `identity_cards`,
    // array of rows) karena baris baru butuh patient_id yang belum ada saat
    // mode Tambah — dipisah di sini sebelum dikirim ke endpoint /patients,
    // lalu tiap baris disubmit satu-satu (loop `for...of` + await, bukan
    // parallel, supaya error salah satu baris jelas kebaca) ke
    // /patientidentitycards setelahnya.
    // `__age_display` adalah widget turunan (umur dihitung dari birth_date) yang
    // tidak punya kolom di server — dibuang bersama identity_cards sebelum kirim.
    const { identity_cards: identityCardsRaw, __age_display: _age, ...patientForm } = form
    const identityCards = (identityCardsRaw as PatientIdentityCardRow[] | undefined) ?? []

    let patientId: number | string | undefined = editing?.id

    // Galat dari server (mis. 422 "name wajib diisi") sebelumnya hilang tanpa
    // jejak: dialog diam, tidak ada toast, petugas tidak tahu kenapa gagal.
    // Sekarang setiap kegagalan dimunculkan lewat notifyApiError dan dialog
    // dibiarkan terbuka supaya isian yang sudah diketik tidak hilang.
    try {
      if (editing) {
        await resource.update.mutateAsync({ id: editing.id, payload: patientForm })
      } else {
        const created = await resource.create.mutateAsync(patientForm)
        patientId = created.id
      }
    } catch (error) {
      notifyApiError(error)
      return
    }

    if (patientId !== undefined) {
      for (const row of identityCards) {
        if (!row.identity_card_type_id && !row.identity_number) continue

        const sameAsCurrent = row.is_same_as_current_address !== false
        const payload = {
          patient_id: patientId,
          identity_card_type_id: row.identity_card_type_id,
          identity_number: row.identity_number,
          is_same_as_current_address: sameAsCurrent,
          address: sameAsCurrent ? (patientForm.address as string | null) : row.address,
          rt: sameAsCurrent ? (patientForm.rt as string | null) : row.rt,
          rw: sameAsCurrent ? (patientForm.rw as string | null) : row.rw,
          postal_code: sameAsCurrent ? (patientForm.postal_code as string | null) : row.postal_code,
          village_id: sameAsCurrent ? (patientForm.village_id as number | null) : row.village_id,
        }

        try {
          if (row.id !== undefined) {
            await identityCardResource.update.mutateAsync({ id: Number(row.id), payload })
          } else {
            await identityCardResource.create.mutateAsync(payload)
          }
        } catch (error) {
          // Pasien sudah tersimpan pada titik ini; kegagalan satu baris kartu
          // identitas tidak boleh membatalkan seluruh alur. Beri tahu petugas
          // baris mana yang gagal, lalu hentikan sisa loop agar galat berikutnya
          // tidak menumpuk jadi banyak toast sekaligus.
          notifyApiError(error)
          toast.warning('Pasien tersimpan, tetapi kartu identitas gagal disimpan.', {
            description: 'Buka "Ubah" pada pasien tersebut untuk melengkapi kartu identitas.',
          })
          setDialogOpen(false)
          return
        }
      }
    }

    toast.success(editing ? 'Perubahan pasien tersimpan.' : 'Pasien baru tersimpan.')
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    resource.remove.mutate(deleteTarget.id)
    setDeleteTarget(null)
  }

  const actionColumn: ColumnDef<Patient, unknown> = {
    header: 'Aksi',
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-primary text-sm hover:underline"
          onClick={() => {
            setEditing(row.original)
            setDialogOpen(true)
          }}
        >
          Ubah
        </button>
        <button
          type="button"
          className="text-destructive text-sm hover:underline"
          onClick={() => setDeleteTarget(row.original)}
        >
          Hapus
        </button>
      </div>
    ),
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Pasien</h1>
          <p className="text-muted-foreground text-sm">Data induk pasien terdaftar.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          Tambah Pasien
        </Button>
      </div>

      <DataTable columns={[...columns, actionColumn]} data={data?.items ?? []} loading={isLoading} />

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

      <PatientFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        fields={fields}
        emptyForm={emptyForm}
        onSubmit={handleSubmit}
        submitting={submitting}
        title="Pasien"
        description="Data induk pasien terdaftar."
        extraPrefill={
          identityCardsPrefill || satuSehatPrefill
            ? { ...(identityCardsPrefill ? { identity_cards: identityCardsPrefill } : {}), ...(satuSehatPrefill ?? {}) }
            : undefined
        }
        renderExtra={(editingPatient, form) =>
          editingPatient ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Kontak &amp; Keluarga</h3>
                <PrintPatientCardButton patientId={Number(editingPatient.id)} />
              </div>
              <InlineNestedList
                title="Kontak"
                parentIdField="patient_id"
                parentId={Number(editingPatient.id)}
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
                parentId={Number(editingPatient.id)}
                fields={[
                  { key: 'name', label: 'Nama', type: 'text' },
                  { key: 'relationship', label: 'Hubungan', type: 'text' },
                ]}
                itemLabel={(item) => `${item.name ?? '—'} (${item.relationship ?? '—'})`}
                resource={familyResource}
              />
              <PatientPhotoPanel patientId={Number(editingPatient.id)} />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <DuplicateWarning form={form} editingId={undefined} />
              <p className="text-muted-foreground text-xs">Simpan pasien dulu sebelum menambah kontak/keluarga/foto.</p>
            </div>
          )
        }
      />

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? `"${deleteTarget.name ?? `Pasien #${deleteTarget.id}`}" akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.` : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
