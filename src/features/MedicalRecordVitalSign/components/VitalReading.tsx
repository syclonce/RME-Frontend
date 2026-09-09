import { severityOf, VITAL_BANDS, type VitalField, type VitalSeverity } from '../vitalRanges'

const TONE: Record<VitalSeverity, string> = {
  normal: 'text-foreground',
  perhatian: 'text-amber-600 dark:text-amber-500',
  kritis: 'text-destructive',
}

interface Props {
  field: VitalField
  value: number | null | undefined
}

/**
 * Satu pembacaan tanda vital dengan penandanya.
 *
 * Angka di luar rentang normal diberi warna DAN keterangan teks. Warna saja
 * tidak cukup: sekitar satu dari dua belas laki-laki mengalami buta warna
 * merah-hijau, dan tanda vital dibaca justru saat tergesa.
 */
export function VitalReading({ field, value }: Props) {
  const band = VITAL_BANDS[field]
  const severity = severityOf(field, value)
  const hasValue = value !== null && value !== undefined

  return (
    <div>
      <p className="text-muted-foreground text-xs">{band.label}</p>
      <p className={`font-semibold tabular-nums ${hasValue ? TONE[severity] : 'text-muted-foreground'}`}>
        {hasValue ? value : '—'}
        {hasValue && <span className="ml-0.5 text-xs font-normal">{band.unit}</span>}
      </p>
      {hasValue && severity !== 'normal' && (
        <p className={`text-xs ${TONE[severity]}`}>
          {severity === 'kritis' ? 'kritis' : 'di luar normal'}
        </p>
      )}
    </div>
  )
}

/**
 * Tekanan darah dibaca sebagai satu angka ("120/80"), bukan dua kolom
 * terpisah. Memisahkannya di tabel memaksa pembaca menyatukannya kembali
 * di kepala setiap kali.
 */
export function BloodPressureReading({
  systolic, diastolic,
}: { systolic: number | null | undefined; diastolic: number | null | undefined }) {
  const severity: VitalSeverity =
    severityOf('systolic', systolic) === 'kritis' || severityOf('diastolic', diastolic) === 'kritis'
      ? 'kritis'
      : severityOf('systolic', systolic) === 'perhatian' || severityOf('diastolic', diastolic) === 'perhatian'
        ? 'perhatian'
        : 'normal'

  const hasValue = systolic !== null && systolic !== undefined && diastolic !== null && diastolic !== undefined

  return (
    <div>
      <p className="text-muted-foreground text-xs">Tekanan Darah</p>
      <p className={`font-semibold tabular-nums ${hasValue ? TONE[severity] : 'text-muted-foreground'}`}>
        {hasValue ? `${systolic}/${diastolic}` : '—'}
        {hasValue && <span className="ml-0.5 text-xs font-normal">mmHg</span>}
      </p>
      {hasValue && severity !== 'normal' && (
        <p className={`text-xs ${TONE[severity]}`}>
          {severity === 'kritis' ? 'kritis' : 'di luar normal'}
        </p>
      )}
    </div>
  )
}
