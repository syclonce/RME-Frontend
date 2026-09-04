import type { DashboardOccupancy } from '../types'

interface Props {
  occupancy: DashboardOccupancy
}

/**
 * Okupansi sebagai busur, bukan angka telanjang.
 *
 * Okupansi adalah satu-satunya angka di dashboard ini yang menuntut tindakan:
 * bila hampir penuh, pendaftaran rawat inap harus mulai ditahan. Karena itu ia
 * dibaca sebagai posisi terhadap batas, bukan sebagai bilangan yang harus
 * dibandingkan sendiri oleh pembaca.
 *
 * Ambang warna mengikuti kelaziman manajemen tempat tidur RS: di bawah 75%
 * longgar, 75-90% mulai ketat, di atas 90% praktis penuh — sisa bed pada
 * rentang itu biasanya sudah tak dapat dipakai bebas karena terikat gender,
 * kelas, dan isolasi.
 */
export function OccupancyGauge({ occupancy }: Props) {
  const rate = occupancy.occupancy_rate
  const tone =
    rate >= 90 ? 'text-destructive' : rate >= 75 ? 'text-amber-600 dark:text-amber-500' : 'text-primary'

  // Busur 240°, celah 120° tepat di bawah.
  //
  // Rotasi 150° bukan angka sembarang: SVG memulai stroke di arah jam 3 (0°)
  // dan bertambah searah jarum jam. Busur 240° yang dimulai di 150° berakhir
  // di 30°, sehingga celahnya membentang 30°→150° — terpusat di 90°, yaitu
  // tepat di bawah. Angka lain membuat celahnya miring.
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const arcFraction = 240 / 360
  const arcLength = circumference * arcFraction
  const clamped = Math.min(Math.max(rate, 0), 100)
  const filled = (arcLength * clamped) / 100

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0">
        <svg width="152" height="152" viewBox="0 0 152 152" className="rotate-[150deg]">
          <circle
            cx="76" cy="76" r={radius} fill="none" strokeWidth="12" strokeLinecap="round"
            className="stroke-muted"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          {clamped > 0 && (
            <circle
              cx="76" cy="76" r={radius} fill="none" strokeWidth="12" strokeLinecap="round"
              className={`${tone} transition-[stroke-dasharray] duration-700`}
              stroke="currentColor"
              strokeDasharray={`${filled} ${circumference}`}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-semibold tabular-nums ${tone}`}>{rate}</span>
          <span className="text-muted-foreground text-xs">persen terisi</span>
        </div>
      </div>

      <dl className="grid gap-2.5 text-sm">
        <BedRow label="Terisi" value={occupancy.occupied} className="bg-primary" />
        <BedRow label="Kosong" value={occupancy.available} className="bg-muted-foreground/30" />
        <BedRow label="Dipesan" value={occupancy.reserved} className="bg-amber-500" />
        <BedRow label="Perbaikan" value={occupancy.maintenance} className="bg-muted-foreground/60" />
      </dl>
    </div>
  )
}

function BedRow({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-2.5 shrink-0 rounded-full ${className}`} aria-hidden />
      <dt className="text-muted-foreground w-20">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  )
}
