import { generatedRoutes } from '@/routes/generated'
import { manualRoutes } from '@/routes/manual'

// DashboardCore punya path pendek /dashboard lewat manualRoutes; buang entri auto-generated
// /modul/dashboard-core supaya tidak ada dua link berbeda untuk modul yang sama di sidebar/routing.
const dedupedGeneratedRoutes = generatedRoutes.filter((r) => r.module !== 'DashboardCore')

export const appRoutes = [...dedupedGeneratedRoutes, ...manualRoutes]
