/* oxlint-disable react/only-export-components -- route-level lazy component is intentional */
import { lazy } from 'react'
import type { ReactElement } from 'react'

const DashboardCoreListPage = lazy(() => import('@/features/DashboardCore/pages/ListPage').then((m) => ({ default: m.DashboardCoreListPage })))

const GroupListPage = lazy(() => import('@/features/Grup/pages/ListPage').then((module) => ({ default: module.GroupListPage })))

// Authorization — second page (Permission CRUD)
const PermissionListPage = lazy(() => import('@/features/Authorization/pages/PermissionListPage').then((m) => ({ default: m.PermissionListPage })))

// LayananLabAnalyzerOrder — second page (Order list with workflow actions)
const LabAnalyzerOrderListPage = lazy(() => import('@/features/LayananLabAnalyzerOrder/pages/LabAnalyzerOrderListPage').then((m) => ({ default: m.LabAnalyzerOrderListPage })))

// GeneralFacilityMaintenance — second page (Work Order list with assign/complete actions)
const MaintenanceWorkOrderListPage = lazy(() => import('@/features/GeneralFacilityMaintenance/pages/MaintenanceWorkOrderListPage').then((m) => ({ default: m.MaintenanceWorkOrderListPage })))

// LayananImagingOrder — second page (Imaging Study CRUD)
const ImagingStudyListPage = lazy(() => import('@/features/LayananImagingOrder/pages/ImagingStudyListPage').then((m) => ({ default: m.ImagingStudyListPage })))
const AmbulanceTripListPage = lazy(() => import('@/features/GeneralAmbulanceFleet/pages/AmbulanceTripListPage').then((m) => ({ default: m.AmbulanceTripListPage })))
const CrossmatchTestListPage = lazy(() => import('@/features/InventoryBloodBag/pages/CrossmatchTestListPage').then((m) => ({ default: m.CrossmatchTestListPage })))
const SterilizedItemListPage = lazy(() => import('@/features/InventorySterilizationCycle/pages/SterilizedItemListPage').then((m) => ({ default: m.SterilizedItemListPage })))
const InfectionCaseListPage = lazy(() => import('@/features/AuditInfectionSurveillance/pages/InfectionCaseListPage').then((m) => ({ default: m.InfectionCaseListPage })))
const QualityIndicatorRecordListPage = lazy(() => import('@/features/AuditQualityIndicator/pages/QualityIndicatorRecordListPage').then((m) => ({ default: m.QualityIndicatorRecordListPage })))
const PatientSurveyListPage = lazy(() => import('@/features/LayananPatientComplaint/pages/PatientSurveyListPage').then((m) => ({ default: m.PatientSurveyListPage })))
const LinenCycleListPage = lazy(() => import('@/features/InventoryLinenTracking/pages/LinenCycleListPage').then((m) => ({ default: m.LinenCycleListPage })))

// PendaftaranKunjungan: wizard 1 halaman yang menggabungkan create Registration+Guarantor+Visit
// dalam satu alur (lihat docs-sim/histori/catatan/2026-09-02-wizard-pendaftaran-kunjungan.md).
// module DISENGAJA 'PendaftaranRegistration' (bukan string baru) — hasModule() mengecek
// keanggotaan PERSIS di GET /me/modules; modul backend baru tidak akan pernah otomatis
// muncul di sana untuk siapapun sampai di-assign manual di RBAC, sedangkan wizard ini
// hanya jalur cepat ke create-access modul Registration/Guarantor/Visit yang SUDAH ADA —
// siapa pun yang sudah boleh membuat Registration kemungkinan besar juga boleh Guarantor+Visit.
const PendaftaranKunjunganPage = lazy(() =>
  import('@/features/PendaftaranRegistration/pages/PendaftaranKunjunganPage').then((m) => ({ default: m.PendaftaranKunjunganPage })),
)
const PelayananPasienPage = lazy(() =>
  import('@/features/PendaftaranVisit/pages/PelayananPasienPage').then((m) => ({ default: m.PelayananPasienPage })),
)
const AntreanPoliPage = lazy(() =>
  import('@/features/PendaftaranVisitDestination/pages/AntreanPoliPage').then((m) => ({ default: m.AntreanPoliPage })),
)
const PenyerahanObatPage = lazy(() =>
  import('@/features/LayananPrescription/pages/PenyerahanObatPage').then((m) => ({ default: m.PenyerahanObatPage })),
)
const TriaseIgdPage = lazy(() =>
  import('@/features/MedicalRecordTriage/pages/TriaseIgdPage').then((m) => ({ default: m.TriaseIgdPage })),
)

export interface AppRoute {
  path: string
  module: string
  element: ReactElement
  label?: string
}

export const manualRoutes: AppRoute[] = [
  // DashboardCore: path pendek dipakai di sidebar sebagai pengganti /modul/dashboard-core (lihat filter di App.tsx)
  { path: '/dashboard', module: 'DashboardCore', label: 'Dashboard', element: <DashboardCoreListPage /> },

  { path: '/modul/grup', module: 'Grup', element: <GroupListPage /> },

  // Authorization: Permission management
  { path: '/modul/authorization/permission', module: 'Authorization', label: 'Daftar Permission', element: <PermissionListPage /> },

  // LayananLabAnalyzerOrder: Order workflow (send-to-analyzer → result → verify)
  { path: '/modul/layanan-lab-analyzer-order/order', module: 'LayananLabAnalyzerOrder', label: 'Order Lab Analyzer', element: <LabAnalyzerOrderListPage /> },

  // GeneralFacilityMaintenance: Work Order management (assign/complete)
  { path: '/modul/general-facility-maintenance/work-order', module: 'GeneralFacilityMaintenance', label: 'Work Order Pemeliharaan', element: <MaintenanceWorkOrderListPage /> },

  // LayananImagingOrder: Imaging Study CRUD
  { path: '/modul/layanan-imaging-order/study', module: 'LayananImagingOrder', label: 'Studi Imaging', element: <ImagingStudyListPage /> },
  { path: '/modul/general-ambulance-fleet/trip', module: 'GeneralAmbulanceFleet', label: 'Perjalanan Ambulans', element: <AmbulanceTripListPage /> },
  { path: '/modul/inventory-blood-bag/crossmatch', module: 'InventoryBloodBag', label: 'Hasil Crossmatch Darah', element: <CrossmatchTestListPage /> },
  { path: '/modul/inventory-sterilization-cycle/item', module: 'InventorySterilizationCycle', label: 'Item Hasil Sterilisasi', element: <SterilizedItemListPage /> },
  { path: '/modul/audit-infection-surveillance/case', module: 'AuditInfectionSurveillance', label: 'Kasus Infeksi', element: <InfectionCaseListPage /> },
  { path: '/modul/audit-quality-indicator/record', module: 'AuditQualityIndicator', label: 'Capaian Indikator Mutu', element: <QualityIndicatorRecordListPage /> },
  { path: '/modul/layanan-patient-complaint/survey', module: 'LayananPatientComplaint', label: 'Survei Kepuasan Pasien', element: <PatientSurveyListPage /> },
  { path: '/modul/inventory-linen-tracking/cycle', module: 'InventoryLinenTracking', label: 'Siklus Pencucian Linen', element: <LinenCycleListPage /> },

  // PendaftaranKunjungan: wizard gabungan (lihat komentar lazy import di atas).
  { path: '/pendaftaran-kunjungan', module: 'PendaftaranRegistration', label: 'Pendaftaran Kunjungan', element: <PendaftaranKunjunganPage /> },
  { path: '/pelayanan-pasien/:visitId', module: 'PendaftaranVisit', label: 'Pelayanan Pasien', element: <PelayananPasienPage /> },

  // AntreanPoli: daftar tujuan pasien yang belum diterima ruangan (VisitDestination
  // pending), dengan aksi terima → POST /visits. Dipetakan ke module 'PendaftaranVisitDestination'
  // supaya visibilitas sidebar mengikuti RBAC modul backend yang sama.
  { path: '/antrean-poli', module: 'PendaftaranVisitDestination', label: 'Antrean Poli', element: <AntreanPoliPage /> },

  // PenyerahanObat: halaman farmasi untuk petugas apotek — daftar resep
  // status 'active' + aksi serahkan (POST /prescriptions/{id}/dispense).
  // Dipetakan ke module 'LayananPrescription' supaya visibilitas sidebar
  // mengikuti RBAC modul backend yang sama (bukan modul baru).
  { path: '/farmasi-penyerahan', module: 'LayananPrescription', label: 'Penyerahan Obat', element: <PenyerahanObatPage /> },

  // TriaseIgd: daftar tunggu pasien IGD (join visits+registrations di
  // frontend, backend belum punya filter is_emergency/status di /visits —
  // lihat komentar di TriaseIgdPage.tsx) + form triase level 1-5 →
  // POST /triages lalu redirect ke pelayanan pasien.
  { path: '/triase-igd', module: 'MedicalRecordTriage', label: 'Triase IGD', element: <TriaseIgdPage /> },
]
