import { AdmissionTrendChart } from '@/features/DashboardCore/components/AdmissionTrendChart'
import { OccupancyGauge } from '@/features/DashboardCore/components/OccupancyGauge'
import { lazy, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { DashboardCore } from '@/features/DashboardCore/types'
import { BloodPressureReading, VitalReading } from '@/features/MedicalRecordVitalSign/components/VitalReading'

// Lazy: import statis dari halaman dev menarik ListPage ke bundel utama dan
// membatalkan pemecahan kodenya (rolldown: INEFFECTIVE_DYNAMIC_IMPORT).
// Halaman pratinjau tidak boleh membebani bundel yang dimuat petugas.
const DashboardView = lazy(() =>
  import('@/features/DashboardCore/pages/ListPage').then((m) => ({ default: m.DashboardView })),
)

/**
 * Pratinjau komponen dashboard — HANYA di dev (`import.meta.env.DEV`).
 *
 * Ada karena tampilan tidak dapat diperiksa lewat typecheck: sebuah gauge yang
 * salah sudut atau grafik yang batangnya terpotong tetap lolos `tsc`. Halaman
 * ini merender komponennya pada beberapa keadaan sekaligus — termasuk yang
 * jarang muncul di data nyata (0%, 100%, rumah sakit tanpa bed) tapi justru
 * paling mungkin tampil rusak.
 *
 * Datanya tetap, tidak menyentuh API dan tidak memerlukan sesi.
 */
export function DashboardPreviewPage() {
  const states = [
    { label: 'Longgar — 45%', o: { total_beds: 40, occupied: 18, reserved: 3, available: 19, maintenance: 2, occupancy_rate: 45 } },
    { label: 'Ketat — 82%', o: { total_beds: 40, occupied: 33, reserved: 4, available: 3, maintenance: 1, occupancy_rate: 82 } },
    { label: 'Kritis — 97,5%', o: { total_beds: 40, occupied: 39, reserved: 1, available: 0, maintenance: 0, occupancy_rate: 97.5 } },
    { label: 'Kosong — 0%', o: { total_beds: 12, occupied: 0, reserved: 0, available: 12, maintenance: 0, occupancy_rate: 0 } },
  ]

  const trends = [
    {
      label: 'Beban naik',
      data: [
        { date: '2026-08-29', admissions: 3, discharges: 1 },
        { date: '2026-08-30', admissions: 5, discharges: 3 },
        { date: '2026-08-31', admissions: 4, discharges: 3 },
        { date: '2026-09-01', admissions: 8, discharges: 3 },
        { date: '2026-09-02', admissions: 6, discharges: 3 },
        { date: '2026-09-03', admissions: 9, discharges: 3 },
        { date: '2026-09-04', admissions: 5, discharges: 3 },
      ],
    },
    {
      label: 'Semua nol (instalasi baru)',
      data: ['2026-08-29', '2026-08-30', '2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04']
        .map((date) => ({ date, admissions: 0, discharges: 0 })),
    },
    {
      label: 'Satu lonjakan ekstrem',
      data: [
        { date: '2026-08-29', admissions: 2, discharges: 1 },
        { date: '2026-08-30', admissions: 1, discharges: 2 },
        { date: '2026-08-31', admissions: 3, discharges: 1 },
        { date: '2026-09-01', admissions: 47, discharges: 2 },
        { date: '2026-09-02', admissions: 2, discharges: 9 },
        { date: '2026-09-03', admissions: 1, discharges: 12 },
        { date: '2026-09-04', admissions: 2, discharges: 6 },
      ],
    },
  ]

  // Cuplikan nyata dari GET /api/v1/dashboard/core pada database dev.
  const live: DashboardCore = {
    "date": "2026-09-04",
    "occupancy": {
      "total_beds": 11,
      "occupied": 8,
      "reserved": 1,
      "available": 2,
      "maintenance": 1,
      "occupancy_rate": 72.7
    },
    "inpatients_active": 22,
    "admissions_today": 5,
    "discharges_today": 3,
    "invoices_today": {
      "count": 14,
      "total_amount": 27450000
    },
    "payments_today": {
      "count": 11,
      "total_amount": 19300000
    },
    "prescriptions_today": {
      "created": 23,
      "dispensed": 17
    },
    "trend": [
      {
        "date": "2026-08-29",
        "admissions": 3,
        "discharges": 0
      },
      {
        "date": "2026-08-30",
        "admissions": 5,
        "discharges": 3
      },
      {
        "date": "2026-08-31",
        "admissions": 4,
        "discharges": 3
      },
      {
        "date": "2026-09-01",
        "admissions": 8,
        "discharges": 3
      },
      {
        "date": "2026-09-02",
        "admissions": 6,
        "discharges": 3
      },
      {
        "date": "2026-09-03",
        "admissions": 9,
        "discharges": 3
      },
      {
        "date": "2026-09-04",
        "admissions": 5,
        "discharges": 3
      }
    ]
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-muted/40 border-b px-6 py-4">
        <p className="text-muted-foreground text-sm">Pratinjau komponen (dev)</p>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <section>
        <p className="text-muted-foreground px-6 text-xs font-medium tracking-wide uppercase">
          Halaman utuh — data nyata dari server dev
        </p>
        <Suspense fallback={<p className="text-muted-foreground p-6 text-sm">Memuat...</p>}>
          <DashboardView data={live} isLoading={false} onRefresh={() => {}} />
        </Suspense>
      </section>

      <div className="flex flex-col gap-6 p-6">

      <div className="grid gap-4 lg:grid-cols-2">
        {states.map((state) => (
          <Card key={state.label}>
            <CardHeader>
              <CardTitle className="text-base">{state.label}</CardTitle>
              <CardDescription>
                {state.o.occupied} dari {state.o.total_beds} tempat tidur siap-pakai sedang terisi.
              </CardDescription>
            </CardHeader>
            <CardContent><OccupancyGauge occupancy={state.o} /></CardContent>
          </Card>
        ))}
      </div>

      {trends.map((trend) => (
        <Card key={trend.label}>
          <CardHeader>
            <CardTitle className="text-base">Tren — {trend.label}</CardTitle>
          </CardHeader>
          <CardContent><AdmissionTrendChart trend={trend.data} /></CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tanda vital — tiga tingkat severitas</CardTitle>
          <CardDescription>Normal, di luar normal, dan kritis pada baris yang sama.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[
            { l: 'Normal', s: 120, d: 80, p: 78, t: 36.6, r: 16, o: 98 },
            { l: 'Di luar normal', s: 148, d: 94, p: 108, t: 37.9, r: 22, o: 94 },
            { l: 'Kritis', s: 82, d: 48, p: 136, t: 39.8, r: 34, o: 86 },
          ].map((x) => (
            <div key={x.l} className={`rounded-md border p-3 ${x.l === 'Kritis' ? 'border-destructive/40 bg-destructive/5' : ''}`}>
              <p className="mb-2.5 text-sm font-medium">{x.l}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <BloodPressureReading systolic={x.s} diastolic={x.d} />
                <VitalReading field="pulse" value={x.p} />
                <VitalReading field="temperature" value={x.t} />
                <VitalReading field="respiratory_rate" value={x.r} />
                <VitalReading field="oxygen_saturation" value={x.o} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
