/**
 * Tampilan umur (tahun/bulan/hari) yang dihitung dari tanggal lahir.
 *
 * Read-only dan sengaja tidak disimpan ke basis data: umur adalah turunan dari
 * `birth_date`, jadi menyimpannya akan basi seiring waktu. Kotak ini ada di
 * SIMpel legacy dan dipakai petugas untuk verifikasi cepat identitas pasien
 * serta pengecekan dosis pediatri, sehingga perlu hadir juga di sini.
 */
export function AgeDisplay({ birthDate }: { birthDate: unknown }) {
  const age = calculateAge(birthDate)

  return (
    <div className="grid grid-cols-3 gap-2">
      <AgeBox label="Thn" value={age?.years} />
      <AgeBox label="Bln" value={age?.months} />
      <AgeBox label="Hari" value={age?.days} />
    </div>
  )
}

function AgeBox({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="bg-muted/40 text-muted-foreground flex items-baseline justify-center gap-1 rounded-md border px-3 py-2 text-sm">
      <span className="text-foreground font-medium tabular-nums">{value ?? '—'}</span>
      <span className="text-xs">{label}</span>
    </div>
  )
}

interface Age {
  years: number
  months: number
  days: number
}

/**
 * Hitung selisih kalender antara tanggal lahir dan hari ini.
 *
 * Memakai pinjam-meminjam per komponen (hari dari bulan sebelumnya, bulan dari
 * tahun) alih-alih pembagian milidetik, supaya hasilnya sesuai cara orang
 * membaca umur — "1 tahun 0 bulan 0 hari" tepat pada hari ulang tahun.
 */
export function calculateAge(birthDate: unknown, today: Date = new Date()): Age | null {
  if (typeof birthDate !== 'string' || birthDate === '') return null

  const birth = new Date(birthDate)
  if (Number.isNaN(birth.getTime())) return null
  if (birth > today) return null

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    // Pinjam jumlah hari dari bulan penuh sebelum bulan berjalan.
    const daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    days += daysInPreviousMonth
    months -= 1
  }

  if (months < 0) {
    months += 12
    years -= 1
  }

  return { years, months, days }
}
