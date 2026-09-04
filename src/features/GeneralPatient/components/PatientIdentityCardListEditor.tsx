import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'
import { RelationSelect } from '@/shared/components/RelationSelect'

export interface PatientIdentityCardRow {
  /** Hadir hanya untuk baris yang sudah tersimpan di server (mode Ubah) — dipakai handleSubmit untuk membedakan create vs update. */
  id?: number | string
  identity_card_type_id: number | null
  identity_number: string
  is_same_as_current_address: boolean
  address: string | null
  rt: string | null
  rw: string | null
  postal_code: string | null
  village_id: number | null
}

export const emptyIdentityCardRow: PatientIdentityCardRow = {
  identity_card_type_id: null,
  identity_number: '',
  is_same_as_current_address: true,
  address: null,
  rt: null,
  rw: null,
  postal_code: null,
  village_id: null,
}

/**
 * Editor list kartu identitas pasien (multi-baris) untuk step "Kartu
 * Identitas" pada wizard Tambah/Ubah Pasien. RecordFieldsForm generik TIDAK
 * dipakai di sini — didesain untuk field flat satu objek, bukan array of
 * objects, jadi markup baris dibuat manual, tapi mengikuti gaya visual yang
 * sama (Label + Input/Select/Checkbox) supaya konsisten dengan
 * RecordFieldsForm/InlineNestedList.
 *
 * State array-nya murni lokal (dikelola parent lewat `value`/`onChange`) -
 * BUKAN langsung create ke API per baris seperti InlineNestedList, karena
 * saat mode Tambah pasien belum punya id. handleSubmit di ListPage yang
 * bertanggung jawab POST/PUT tiap baris setelah pasien tersimpan.
 */
export function PatientIdentityCardListEditor({
  value,
  onChange,
}: {
  value: PatientIdentityCardRow[]
  onChange: (rows: PatientIdentityCardRow[]) => void
}) {
  function updateRow(index: number, patch: Partial<PatientIdentityCardRow>) {
    onChange(value.map((row, i) => (i === index ? { ...row, ...patch } : row)))
  }

  function removeRow(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function addRow() {
    onChange([...value, { ...emptyIdentityCardRow }])
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length === 0 ? (
        <p className="text-muted-foreground text-xs">Belum ada kartu identitas ditambahkan.</p>
      ) : (
        value.map((row, index) => (
          <div key={index} className="flex flex-col gap-3 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-medium">
                Kartu Identitas #{index + 1}
                {row.id !== undefined ? ' (tersimpan)' : ''}
              </span>
              <button type="button" className="text-destructive text-xs hover:underline" onClick={() => removeRow(index)}>
                Hapus
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Jenis Kartu</Label>
                <RelationSelect
                  endpoint="/identity-card-types"
                  value={row.identity_card_type_id}
                  onChange={(v) => updateRow(index, { identity_card_type_id: v })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Nomor Kartu</Label>
                <Input
                  value={row.identity_number}
                  onChange={(e) => updateRow(index, { identity_number: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2 sm:col-span-2">
                <Checkbox
                  id={`identity-card-same-address-${index}`}
                  checked={row.is_same_as_current_address}
                  onCheckedChange={(v) => updateRow(index, { is_same_as_current_address: Boolean(v) })}
                />
                <Label htmlFor={`identity-card-same-address-${index}`}>Sama Dengan Alamat Sekarang</Label>
              </div>

              {!row.is_same_as_current_address && (
                <>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label>Alamat Sesuai Kartu</Label>
                    <Input
                      value={row.address ?? ''}
                      onChange={(e) => updateRow(index, { address: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>RT (Sesuai Kartu)</Label>
                    <Input value={row.rt ?? ''} onChange={(e) => updateRow(index, { rt: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>RW (Sesuai Kartu)</Label>
                    <Input value={row.rw ?? ''} onChange={(e) => updateRow(index, { rw: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Kode Pos (Sesuai Kartu)</Label>
                    <Input
                      value={row.postal_code ?? ''}
                      onChange={(e) => updateRow(index, { postal_code: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label>Desa/Kelurahan (Sesuai Kartu)</Label>
                    <RegionVillagePicker
                      value={row.village_id}
                      onChange={(v) => updateRow(index, { village_id: v })}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addRow}
        className="border-input hover:bg-accent w-fit rounded-md border border-dashed px-3 py-1.5 text-xs font-medium"
      >
        + Tambah Kartu Identitas
      </button>
    </div>
  )
}
