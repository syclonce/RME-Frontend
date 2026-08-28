import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchCities, fetchDistricts, fetchProvinces, fetchVillages } from '@/features/GeneralRegion/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface RegionVillagePickerProps {
  value: number | null
  onChange: (villageId: number | null) => void
}

/**
 * Dropdown berjenjang Provinsi->Kota->Kecamatan->Desa (bentuk #10 bespoke,
 * lihat memori rme-frontend-codegen-llm - GeneralRegion bukan modul CRUD
 * biasa, cuma 4 endpoint referensi berjenjang identifier by `code`).
 *
 * KETERBATASAN: kalau `value` sudah terisi (mode edit), picker TIDAK bisa
 * mundur otomatis menampilkan rantai provinsi/kota/kecamatan aslinya -
 * backend tidak punya endpoint "desa -> induknya apa". Menampilkan ID desa
 * saat ini sebagai info, pengguna pilih ulang dari awal kalau mau ganti.
 */
export function RegionVillagePicker({ value, onChange }: RegionVillagePickerProps) {
  const [provinceCode, setProvinceCode] = useState<string | null>(null)
  const [cityCode, setCityCode] = useState<string | null>(null)
  const [districtCode, setDistrictCode] = useState<string | null>(null)

  const provinces = useQuery({ queryKey: ['regions', 'provinces'], queryFn: fetchProvinces })
  const cities = useQuery({
    queryKey: ['regions', 'cities', provinceCode],
    queryFn: () => fetchCities(provinceCode as string),
    enabled: provinceCode !== null,
  })
  const districts = useQuery({
    queryKey: ['regions', 'districts', cityCode],
    queryFn: () => fetchDistricts(cityCode as string),
    enabled: cityCode !== null,
  })
  const villages = useQuery({
    queryKey: ['regions', 'villages', districtCode],
    queryFn: () => fetchVillages(districtCode as string),
    enabled: districtCode !== null,
  })

  return (
    <div className="grid gap-2">
      {value !== null && <p className="text-muted-foreground text-xs">Desa terpilih saat ini (ID: {value})</p>}
      <Select
        value={provinceCode ?? ''}
        onValueChange={(v) => {
          setProvinceCode(v)
          setCityCode(null)
          setDistrictCode(null)
          onChange(null)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Provinsi" />
        </SelectTrigger>
        <SelectContent>
          {provinces.data?.map((p) => (
            <SelectItem key={p.code} value={p.code}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={cityCode ?? ''}
        onValueChange={(v) => {
          setCityCode(v)
          setDistrictCode(null)
          onChange(null)
        }}
        disabled={provinceCode === null}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Kota/Kabupaten" />
        </SelectTrigger>
        <SelectContent>
          {cities.data?.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={districtCode ?? ''}
        onValueChange={(v) => {
          setDistrictCode(v)
          onChange(null)
        }}
        disabled={cityCode === null}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Kecamatan" />
        </SelectTrigger>
        <SelectContent>
          {districts.data?.map((d) => (
            <SelectItem key={d.code} value={d.code}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={value !== null ? String(value) : ''}
        onValueChange={(v) => onChange(Number(v))}
        disabled={districtCode === null}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Desa/Kelurahan" />
        </SelectTrigger>
        <SelectContent>
          {villages.data?.map((v) => (
            <SelectItem key={v.id} value={String(v.id)}>
              {v.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
