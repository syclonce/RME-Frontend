import { generatedRoutes } from '@/routes/generated'
import { manualRoutes } from '@/routes/manual'

// DashboardCore punya path pendek /dashboard lewat manualRoutes; buang entri auto-generated
// /modul/dashboard-core supaya tidak ada dua link berbeda untuk modul yang sama di sidebar/routing.
const dedupedGeneratedRoutes = generatedRoutes
  .filter((r) => r.module !== 'DashboardCore')
  // GeneralPatient: override label sidebar/tab jadi "Data Pasien" supaya modul data
  // pasien utama tidak terbaca sebagai "Umum Patient" di dalam grup besar "Umum".
  // module tetap 'GeneralPatient' (RBAC hasModule() mengecek nama ini persis).
  .map((r) => {
    if (r.module === 'GeneralPatient') return { ...r, label: 'Data Pasien' }
    if (r.module === 'PasienPatientPortalAccount') return { ...r, label: 'Akun Portal Pasien' }
    return r
  })

export const appRoutes = [...dedupedGeneratedRoutes, ...manualRoutes]
