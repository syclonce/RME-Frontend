/**
 * Ambang nilai tanda vital dewasa.
 *
 * Dipakai untuk MENANDAI, bukan memblokir: angka di luar rentang normal
 * seringkali justru pembacaan yang benar pada pasien yang memang sakit.
 * Yang salah adalah membiarkannya tampil sama seperti angka normal — perawat
 * membaca selusin baris sekaligus, dan suhu 41 °C tidak boleh terlihat sama
 * dengan 36,5 °C.
 *
 * Batas "tidak masuk akal" (nadi 9000) ditolak di backend sebagai validasi,
 * karena tanda vital adalah rekam medis append-only: salah ketik yang
 * tersimpan tidak dapat dihapus, hanya dibantah oleh pencatatan berikutnya.
 */
export type VitalSeverity = 'normal' | 'perhatian' | 'kritis'

interface Band {
  /** Di luar rentang ini: perhatian. */
  normal: [number, number]
  /** Di luar rentang ini: kritis. */
  safe: [number, number]
  unit: string
  label: string
}

export const VITAL_BANDS = {
  temperature: { normal: [36.0, 37.5], safe: [35.0, 39.0], unit: '°C', label: 'Suhu' },
  pulse: { normal: [60, 100], safe: [40, 130], unit: '×/mnt', label: 'Nadi' },
  respiratory_rate: { normal: [12, 20], safe: [8, 30], unit: '×/mnt', label: 'Napas' },
  systolic: { normal: [90, 140], safe: [80, 180], unit: 'mmHg', label: 'Sistolik' },
  diastolic: { normal: [60, 90], safe: [50, 110], unit: 'mmHg', label: 'Diastolik' },
  oxygen_saturation: { normal: [95, 100], safe: [90, 100], unit: '%', label: 'SpO₂' },
} satisfies Record<string, Band>

export type VitalField = keyof typeof VITAL_BANDS

export function severityOf(field: VitalField, value: number | null | undefined): VitalSeverity {
  if (value === null || value === undefined || Number.isNaN(value)) return 'normal'

  const band = VITAL_BANDS[field]
  if (value < band.safe[0] || value > band.safe[1]) return 'kritis'
  if (value < band.normal[0] || value > band.normal[1]) return 'perhatian'
  return 'normal'
}

/** Severitas tertinggi dari satu set pembacaan — dipakai menandai baris riwayat. */
export function worstSeverity(reading: Partial<Record<VitalField, number | null | undefined>>): VitalSeverity {
  let worst: VitalSeverity = 'normal'
  for (const field of Object.keys(VITAL_BANDS) as VitalField[]) {
    const severity = severityOf(field, reading[field])
    if (severity === 'kritis') return 'kritis'
    if (severity === 'perhatian') worst = 'perhatian'
  }
  return worst
}

/**
 * Skala nyeri memakai arah dan ambang sendiri (0-10, makin tinggi makin berat),
 * jadi tidak masuk VITAL_BANDS yang berbasis rentang normal dua sisi.
 */
export function painSeverity(value: number | null | undefined): VitalSeverity {
  if (value === null || value === undefined) return 'normal'
  if (value >= 7) return 'kritis'
  if (value >= 4) return 'perhatian'
  return 'normal'
}
