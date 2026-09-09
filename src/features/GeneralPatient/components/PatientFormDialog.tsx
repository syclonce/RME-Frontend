import { Fragment, useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RecordFieldsForm, groupFieldsBySection, type CrudField } from '@/shared/components/RecordFieldsForm'
import type { Patient } from '../types'

/**
 * Cari field bertanda `required` pada satu step yang nilainya masih kosong.
 * Field yang sedang di-`disabledWhen` (mis. seluruh identitas saat pasien
 * ditandai "Tidak Dikenal") dilewati — kalau tidak, petugas akan terjebak di
 * step yang isiannya memang sengaja dimatikan.
 */
function findMissingRequired(stepFields: CrudField[], form: Record<string, unknown>): CrudField[] {
  return stepFields.filter((field) => {
    if (!field.required) return false
    if (field.disabledWhen?.(form)) return false
    const value = form[field.key]
    return value === undefined || value === null || value === ''
  })
}

/**
 * Wizard khusus dialog Tambah/Ubah Data Pasien — modal generik CrudDialogPage
 * sengaja TIDAK disentuh karena dipakai puluhan modul lain. Tiap section yang
 * sudah ada di `fields` (Identitas/Alamat/Data Tambahan) jadi satu step; step
 * terakhir menampilkan renderExtra (Kontak/Keluarga/Foto) untuk mode ubah.
 */
export function PatientFormDialog({
  open,
  onOpenChange,
  editing,
  fields,
  emptyForm,
  onSubmit,
  submitting,
  title,
  description,
  renderExtra,
  extraPrefill,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing: Patient | null
  fields: CrudField[]
  emptyForm: Record<string, unknown>
  onSubmit: (form: Record<string, unknown>) => Promise<void>
  submitting: boolean
  title: string
  description: string
  renderExtra?: (editing: Patient | null, form: Record<string, unknown>) => React.ReactNode
  /**
   * Nilai tambahan untuk field yang TIDAK ada langsung di object `editing`
   * (mis. `identity_cards` — hasil GET terpisah dari resource lain), di-merge
   * ke `form` setelah prefill dasar dari `editing` selesai. Dihitung ulang
   * tiap kali berubah (mis. saat fetch-nya selesai) lewat dependency array
   * terpisah dari efek prefill utama supaya tidak menimpa balik input yang
   * sudah diketik pengguna di field lain.
   */
  extraPrefill?: Record<string, unknown>
}) {
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm)
  const [stepIndex, setStepIndex] = useState(0)

  const sectionGroups = groupFieldsBySection(fields)
  // Step "Kontak & Keluarga" hanya relevan setelah pasien tersimpan (butuh
  // patient_id) — mode Tambah tidak menampilkannya sebagai step terpisah,
  // renderExtra untuk mode itu (peringatan duplikat) muncul di step Identitas.
  const stepLabels = editing ? [...sectionGroups.map(([section]) => section ?? 'Data'), 'Kontak & Keluarga'] : sectionGroups.map(([section]) => section ?? 'Data')
  const lastStep = stepLabels.length - 1

  useEffect(() => {
    if (!open) return
    setStepIndex(0)
    if (editing) {
      const next: Record<string, unknown> = { ...emptyForm }
      for (const f of fields) next[f.key] = (editing as unknown as Record<string, unknown>)[f.key] ?? next[f.key]
      setForm(next)
    } else {
      setForm(emptyForm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editing])

  useEffect(() => {
    if (!open || !editing || !extraPrefill) return
    setForm((prev) => ({ ...prev, ...extraPrefill }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editing, extraPrefill])

  /**
   * Kumpulkan field wajib yang masih kosong di SELURUH step, bukan hanya step
   * aktif — tombol Simpan hanya muncul di step terakhir, sedangkan field wajib
   * (Nama, Tanggal Lahir) berada di step pertama.
   */
  function collectAllMissing(): { field: CrudField; stepIndex: number }[] {
    return sectionGroups.flatMap(([, stepFields], i) =>
      findMissingRequired(stepFields, form).map((field) => ({ field, stepIndex: i })),
    )
  }

  function handleNext() {
    const missing = findMissingRequired(sectionGroups[stepIndex]?.[1] ?? [], form)
    if (missing.length > 0) {
      toast.error('Lengkapi isian wajib terlebih dahulu.', {
        description: missing.map((f) => f.label).join(', '),
      })
      return
    }
    setStepIndex((s) => s + 1)
  }

  async function handleSubmit() {
    const missing = collectAllMissing()
    if (missing.length > 0) {
      toast.error('Lengkapi isian wajib terlebih dahulu.', {
        description: missing.map((m) => m.field.label).join(', '),
      })
      // Lempar petugas kembali ke step pertama yang bermasalah supaya tidak
      // perlu menebak isian mana yang kurang.
      setStepIndex(missing[0].stepIndex)
      return
    }

    await onSubmit(form)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{editing ? `Ubah ${title}` : `Tambah ${title}`}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ol className="flex flex-wrap items-center gap-2 border-b pb-3">
          {stepLabels.map((label, i) => {
            const state = i === stepIndex ? 'current' : i < stepIndex ? 'done' : 'upcoming'
            return (
              <Fragment key={label}>
                {i > 0 && <span className="text-muted-foreground text-xs">—</span>}
                <li>
                  <button
                    type="button"
                    onClick={() => setStepIndex(i)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      state === 'current'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : state === 'done'
                          ? 'border-primary/40 bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground'
                    }`}
                  >
                    {state === 'done' ? <Check className="size-3" /> : <span>{i + 1}.</span>}
                    {label}
                  </button>
                </li>
              </Fragment>
            )
          })}
        </ol>

        <div className="flex flex-col gap-5 overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
          {stepIndex < sectionGroups.length ? (
            <>
              <RecordFieldsForm fields={sectionGroups[stepIndex][1]} form={form} setForm={setForm} />
              {!editing && stepIndex === 0 && renderExtra?.(editing, form)}
            </>
          ) : (
            renderExtra?.(editing, form)
          )}
        </div>

        <DialogFooter className="bg-transparent pt-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          {stepIndex > 0 && (
            <Button variant="outline" onClick={() => setStepIndex((s) => s - 1)}>
              Sebelumnya
            </Button>
          )}
          {stepIndex < lastStep ? (
            <Button onClick={handleNext}>Selanjutnya</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
