import { useId, useState } from 'react'
import type { DashboardTrendDay } from '../types'

interface Props {
  trend: DashboardTrendDay[]
}

const DAY_LABEL = new Intl.DateTimeFormat('id-ID', { weekday: 'short' })
const FULL_DATE = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long' })

/**
 * Tren masuk/pulang tujuh hari sebagai grafik batang berpasangan.
 *
 * Sebelumnya ini tabel tiga kolom. Angkanya benar, tapi pertanyaan yang
 * sebenarnya dibawa petugas ke layar ini — "apakah beban naik?" dan "apakah
 * yang masuk lebih banyak dari yang pulang?" — menuntut pembacanya
 * membandingkan 14 bilangan sendiri. Bentuk batang menjawab keduanya sekaligus:
 * selisih tinggi ADALAH pertumbuhan hunian hari itu.
 *
 * Digambar dengan SVG, bukan pustaka grafik: tujuh pasang batang tidak sepadan
 * dengan menambah dependensi ke bundel yang dimuat setiap petugas tiap pagi.
 */
export function AdmissionTrendChart({ trend }: Props) {
  const headingId = useId()
  const [active, setActive] = useState<number | null>(null)

  const peak = Math.max(1, ...trend.flatMap((d) => [d.admissions, d.discharges]))
  const totalIn = trend.reduce((sum, d) => sum + d.admissions, 0)
  const totalOut = trend.reduce((sum, d) => sum + d.discharges, 0)
  const net = totalIn - totalOut
  const isEmpty = totalIn === 0 && totalOut === 0

  return (
    <div>
      {isEmpty ? (
        // Kanvas setinggi 44 yang kosong melompong membuat instalasi baru
        // mengira grafiknya gagal dimuat. Lebih jujur menyatakan tidak ada
        // datanya daripada menggambar tujuh garis rata.
        <div className="text-muted-foreground flex h-32 flex-col items-center justify-center gap-1 text-sm">
          <p>Belum ada pasien rawat inap masuk atau pulang sepekan ini.</p>
          <p className="text-xs">Grafik akan terisi setelah ada admisi pertama.</p>
        </div>
      ) : (
      <>
      <div className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
        <Legend className="bg-primary" label="Masuk" value={totalIn} />
        <Legend className="bg-muted-foreground/40" label="Pulang" value={totalOut} />
        <span className="text-muted-foreground text-xs">
          {net === 0
            ? 'Hunian seimbang selama sepekan.'
            : net > 0
              ? `Hunian bertambah ${net} pasien selama sepekan.`
              : `Hunian berkurang ${Math.abs(net)} pasien selama sepekan.`}
        </span>
      </div>

      <div className="flex items-end gap-3" role="img" aria-labelledby={headingId}>
        <span id={headingId} className="sr-only">
          Tren pasien masuk dan pulang tujuh hari terakhir.
        </span>
        {trend.map((day, index) => {
          const date = new Date(day.date)
          // Hari terakhir = hari ini. Ditandai dengan penebalan + titik, bukan
          // kata "Hari ini": label yang lebih panjang dari yang lain membungkus
          // di layar sempit dan mendorong batangnya naik dari garis dasar.
          const isToday = index === trend.length - 1
          return (
            <div
              key={day.date}
              className="flex flex-1 flex-col gap-1.5"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className="relative flex items-end justify-center gap-px"
                style={{ height: `${TRACK_PX}px` }}
              >
                {/* Tooltip DI DALAM area grafik, bukan di atasnya: <Card>
                    memasang overflow-hidden, sehingga apa pun yang melewati
                    batas kartu terpotong tanpa jejak. */}
                {active === index && (
                  <div
                    className="bg-popover text-popover-foreground pointer-events-none absolute top-0 left-1/2 z-10 w-max max-w-[9rem] -translate-x-1/2 rounded-md border px-2.5 py-1.5 text-xs shadow-md"
                    style={{ left: index === 0 ? 0 : index === trend.length - 1 ? undefined : '50%',
                             right: index === trend.length - 1 ? 0 : undefined,
                             transform: index === 0 || index === trend.length - 1 ? 'none' : 'translateX(-50%)' }}
                  >
                    <p className="font-medium">{FULL_DATE.format(date)}</p>
                    <p className="text-muted-foreground">
                      {day.admissions} masuk · {day.discharges} pulang
                    </p>
                  </div>
                )}
                <Bar value={day.admissions} peak={peak} className="bg-primary" />
                <Bar value={day.discharges} peak={peak} className="bg-muted-foreground/40" />
              </div>
              <span
                className={`overflow-hidden text-center text-xs text-ellipsis whitespace-nowrap ${
                  isToday ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}
              >
                <span className="sm:hidden">{DAY_LABEL.format(date).slice(0, 1)}</span>
                <span className="hidden sm:inline">{DAY_LABEL.format(date)}</span>
                {isToday && <span className="bg-primary ml-1 inline-block size-1 rounded-full align-middle" />}
              </span>
            </div>
          )
        })}
      </div>
      </>
      )}
    </div>
  )
}

const TRACK_PX = 160
const MIN_VISIBLE_PX = 10

function Bar({ value, peak, className }: { value: number; peak: number; className: string }) {
  // Batang bernilai 0 tetap disisakan 2px: baris yang benar-benar hilang
  // membuat hari itu tampak tidak terdata, padahal nolnya memang nol.
  //
  // Nilai bukan-nol dijamin setinggi MIN_VISIBLE_PX. Tanpa lantai ini, satu
  // hari luar biasa (mis. 47 admisi saat KLB) menekan enam hari lainnya jadi
  // garis rata setinggi 2-3px — dan justru hari-hari biasa itu yang dipakai
  // menilai apakah lonjakannya sudah reda.
  // Nilai nol digambar sebagai garis dasar tipis, BUKAN batang 2px: batang
  // pendek terbaca sebagai "sedikit", padahal artinya "tidak ada".
  if (value === 0) {
    return <div className="border-muted-foreground/25 w-full max-w-7 border-t-2" />
  }

  const height = Math.max(MIN_VISIBLE_PX, (value / peak) * TRACK_PX)
  return (
    <div
      className={`w-full max-w-7 rounded-t-sm transition-[height] duration-500 ${className}`}
      style={{ height: `${height}px` }}
    />
  )
}

function Legend({ className, label, value }: { className: string; label: string; value: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`size-2.5 rounded-full ${className}`} aria-hidden />
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </span>
  )
}
