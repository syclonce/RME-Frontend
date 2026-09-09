import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { TabsProvider, useTabs } from '@/contexts/TabsContext'
import { AccountSettingsDialog } from '@/features/Auth/pages/AccountSettingsDialog'
import { TabContent } from '@/layouts/TabContent'
import { TabStrip } from '@/layouts/TabStrip'
import { appRoutes } from '@/routes/appRoutes'
import { domainIconOf } from '@/shared/domainIcons'
import { domainPrefixOf, humanizeDomain, humanizeModuleName, sidebarGroupOverrideForPath } from '@/shared/labels'

// Urutan grup domain yang wajib tampil paling atas di sidebar; sisanya
// (tidak terdaftar di sini) mengikuti urutan alfabetis seperti sebelumnya.
// 'PendaftaranKunjunganGrup' (wizard 1-halaman) sengaja ditaruh SEBELUM
// 'Pendaftaran' (grup besar 28+ modul CRUD terpisah) supaya jalur cepat
// petugas tidak tenggelam di antara modul-modul CRUD granular tersebut.
//
// Urutan grup mengikuti L1 katalog menu SIMGOS2 legacy
// (docs-sim/referensi-simpel/katalog-menu.csv) supaya petugas migrasi
// menemukan menu di tempat yang sama: 10 PENDAFTARAN → 11 LAYANAN →
// 12 PEMBAYARAN → 13 REKAM MEDIS → 30 BERKAS → 21 PENJUALAN → 23 INVENTORY →
// 25 INTEGRASI (Bpjs/SatuSehat/EKlaim/Sisrute/Sitb/RSOnline) → 15 DASHBOARD →
// 19 MASTER (General) + SDM. Grup di luar daftar alfabetis setelahnya.
const SIDEBAR_DOMAIN_PRIORITY = [
  'Pendaftaran',
  'PendaftaranKunjunganGrup',
  'DataPasien',
  'Pasien',
  'Layanan',
  'Pembayaran',
  'MedicalRecord',
  'BerkasKlaim',
  'Penjualan',
  'Inventory',
  'Bpjs',
  'SatuSehat',
  'EKlaim',
  'Sisrute',
  'Sitb',
  'RsOnline',
  'Kemkes',
  'Cetakan',
  'Dashboard',
  'General',
  'SDM',
]

// Fitur yang belum selesai ditempatkan setelah seluruh grup aktif lainnya.
const SIDEBAR_DOMAIN_LAST = new Set(['PatientPortalAccountPending'])

// Datamater harus selalu berupa grup yang bisa dibuka/tutup, termasuk ketika
// akun pengguna hanya memiliki akses ke satu modul General.
const ALWAYS_COLLAPSIBLE_DOMAINS = new Set(['General', 'SDM'])

const DATAMATER_CATEGORIES = [
  ['Pasien', /Patient|Birthplace|Gender|Religion|MaritalStatus|BloodType|Nationality|Ethnicity|Language|Occupation|Education|Family/],
  ['Kepegawaian', /Employee|Doctor|Nurse|Staff|MedicalPersonnel|Profession|Position|Absence|Employment|Payroll/],
  ['Ruangan & Rawat Inap', /Bed|Ward|Room|Accommodation|OperatingRoom|Inpatient/],
  ['Farmasi', /Medication|Pharmacy|Prescription|Formulary|Antibiotic|ActiveIngredient|Dosage|Mixture|Manufacturer|QuantityRestriction/],
  ['Laboratorium & Diagnosis', /Lab|Laboratory|Radiology|Pathology|Examination|Icd|Diagnosis|Anatomy/],
  ['Tarif & Pembayaran', /Tariff|Payment|Deposit|Discount|Bank|Invoice|SalesTax|Package/],
  ['Penjamin', /Guarantor|Insurance/],
  ['Kunjungan & Rujukan', /Visit|Referral|Reservation|Discharge|Admission|Flow/],
  ['Dokumen & Media', /Audio|Video|ScannedDocument|PrintType|ReportType|CardType|IdentityCard/],
  ['SITB', /Sitb|TbPatient/],
] as const

function datamaterCategoryOf(moduleName: string): string {
  return DATAMATER_CATEGORIES.find(([, pattern]) => pattern.test(moduleName))?.[0] ?? 'Referensi Umum'
}

const DATAMATER_TERMS: Record<string, string> = {
  Absence: 'Absensi', Accident: 'Kecelakaan', Accommodation: 'Akomodasi', Active: 'Aktif',
  Administration: 'Administrasi', Admission: 'Masuk Rawat', Age: 'Usia', Ambulance: 'Ambulans',
  Anatomy: 'Anatomi', Anesthesia: 'Anestesi', Antibiotic: 'Antibiotik', Audio: 'Audio',
  Bank: 'Bank', Bacteria: 'Bakteri', Bed: 'Tempat Tidur', Birthplace: 'Tempat Lahir',
  Blood: 'Darah', Bridge: 'Jembatan', Calculation: 'Perhitungan', Cancellation: 'Pembatalan',
  Card: 'Kartu', Class: 'Kelas', Code: 'Kode', Condition: 'Kondisi', Consultation: 'Konsultasi',
  Contact: 'Kontak', Country: 'Negara', Deposit: 'Deposit', Diagnosis: 'Diagnosis',
  Discharge: 'Pulang', Discount: 'Diskon', Doctor: 'Dokter', Dosage: 'Dosis', Duration: 'Durasi',
  Education: 'Pendidikan', Employee: 'Pegawai', Employment: 'Kepegawaian', Ethnicity: 'Suku',
  Examination: 'Pemeriksaan', Facility: 'Fasilitas', Family: 'Keluarga', Fleet: 'Armada',
  Flow: 'Alur', Formulary: 'Formularium', Gender: 'Jenis Kelamin', Goods: 'Barang',
  Group: 'Kelompok', Guarantor: 'Penjamin', Health: 'Kesehatan', Healthcare: 'Pelayanan Kesehatan',
  Identity: 'Identitas', Ingredient: 'Bahan', Inpatient: 'Rawat Inap', Institution: 'Institusi',
  Insurance: 'Asuransi', Invoice: 'Tagihan', Item: 'Komponen', Lab: 'Laboratorium',
  Laboratory: 'Laboratorium', Language: 'Bahasa', Maintenance: 'Pemeliharaan', Manufacturer: 'Produsen',
  Mapping: 'Pemetaan', Margin: 'Margin', Marital: 'Perkawinan', Medical: 'Medis',
  Medication: 'Obat', Mixture: 'Racikan', Month: 'Bulan', Morphology: 'Morfologi',
  Name: 'Nama', Nationality: 'Kewarganegaraan', Nurse: 'Perawat', Occupation: 'Pekerjaan',
  Operating: 'Operasi', Operation: 'Operasi', Other: 'Lainnya', Ownership: 'Kepemilikan',
  Oxygen: 'Oksigen', Package: 'Paket', Packaging: 'Kemasan', Pain: 'Nyeri', Patient: 'Pasien',
  Pathology: 'Patologi', Payment: 'Pembayaran', Payroll: 'Penggajian', Personnel: 'Tenaga',
  Pharmacy: 'Farmasi', Physician: 'Dokter', Planning: 'Perencanaan', Position: 'Jabatan',
  Print: 'Cetak', Procedure: 'Prosedur', Profession: 'Profesi', Provider: 'Penyedia',
  Quantity: 'Jumlah', Quarter: 'Triwulan', Radiology: 'Radiologi', Reference: 'Referensi',
  Referral: 'Rujukan', Region: 'Wilayah', Relationship: 'Hubungan', Report: 'Laporan',
  Reservation: 'Reservasi', Restriction: 'Pembatasan', Return: 'Retur', Room: 'Ruangan',
  Rule: 'Aturan', Sales: 'Penjualan', Scale: 'Skala', Scanned: 'Pindai', Service: 'Layanan',
  Staff: 'Petugas', Status: 'Status', Tax: 'Pajak', Tariff: 'Tarif', Template: 'Templat',
  Title: 'Jabatan', Topography: 'Topografi', Transaction: 'Transaksi', Treatment: 'Perawatan',
  Type: 'Jenis', Unit: 'Unit', Usage: 'Penggunaan', Video: 'Video', Visit: 'Kunjungan',
  Ward: 'Bangsal', Yes: 'Ya', No: 'Tidak', Option: 'Pilihan', Assignment: 'Penempatan',
  Distribution: 'Distribusi', Instruction: 'Petunjuk', Frequency: 'Frekuensi', Origin: 'Asal',
  Category: 'Kategori', Period: 'Periode', Member: 'Anggota', Pickup: 'Penjemputan',
  Access: 'Akses', Account: 'Rekening', Activity: 'Aktivitas', Addition: 'Tambahan',
  Art: 'ART', Attachment: 'Lampiran', By: 'Berdasarkan', Chest: 'Dada', Child: 'Anak',
  Classification: 'Klasifikasi', Ct: 'CT', Culture: 'Kultur', Deduction: 'Potongan',
  Department: 'Departemen', Depot: 'Depo', Dm: 'DM', Document: 'Dokumen', Done: 'Dilakukan',
  Drug: 'Obat', End: 'Akhir', Guideline: 'Panduan', History: 'Riwayat', Hiv: 'HIV',
  Icd: 'ICD', Kap: 'KAP', Kip: 'KIP', Lock: 'Kunci', Method: 'Metode',
  Microscopy: 'Mikroskopis', Month2: 'Bulan 2', Month3: 'Bulan 3', Month5: 'Bulan 5',
  Not: 'Tidak', O: 'O', Oat: 'OAT', Onset: 'Awal', Outcome: 'Hasil', Parameter: 'Parameter',
  Participant: 'Peserta', Photo: 'Foto', Ppk: 'PPK', Pre: 'Pra', Prescription: 'Resep',
  Reason: 'Alasan', Receipt: 'Penerimaan', Referrer: 'Perujuk', Religion: 'Agama',
  Result: 'Hasil', Ro: 'RO', Route: 'Jalur', Score0: 'Skor 0', Score5: 'Skor 5',
  Score6: 'Skor 6', Sitb: 'SITB', Snomed: 'SNOMED', Source: 'Sumber',
  Subspecialty: 'Subspesialis', Tb: 'TB', Tb03: 'TB 03', Tcm: 'TCM', Test: 'Tes',
  Therapy: 'Terapi', Thorax: 'Toraks', To13: 'sampai 13', Transfer: 'Pemindahan',
  User: 'Pengguna', Value: 'Nilai', Xray: 'Rontgen',
}

function datamaterMenuLabel(moduleName: string): string {
  const words = moduleName
    .replace(/^General/, '')
    .match(/[A-Z][a-z0-9]*/g) ?? [moduleName]
  return words.map((word) => DATAMATER_TERMS[word] ?? word.toUpperCase()).join(' ')
}

function groupDatamaterRoutes<T extends { module: string }>(routes: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>()
  routes.forEach((route) => {
    const category = datamaterCategoryOf(route.module)
    groups.set(category, [...(groups.get(category) ?? []), route])
  })
  const categoryOrder = DATAMATER_CATEGORIES.map(([name]) => name)
  return [...groups].sort(([a], [b]) => {
    const ia = categoryOrder.indexOf(a as (typeof categoryOrder)[number])
    const ib = categoryOrder.indexOf(b as (typeof categoryOrder)[number])
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function routeDisplayName(route: { module: string; label?: string }): string {
  return route.label ?? humanizeModuleName(route.module)
}

function AppSidebarUser() {
  const { user, logout } = useAuth()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {initials(user?.name ?? user?.username ?? '?')}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate text-left text-sm font-medium">
                {user?.name ?? user?.username}
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {initials(user?.name ?? user?.username ?? '?')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name ?? user?.username}</span>
                  {user?.email && <span className="truncate text-xs">{user.email}</span>}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setSettingsOpen(true)}>
              <Settings />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => void logout().then(() => navigate('/login'))}>
              <LogOut />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AccountSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppLayout() {
  return (
    <TabsProvider>
      <AppLayoutContent />
    </TabsProvider>
  )
}

function AppLayoutContent() {
  const [filter, setFilter] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const { hasModule } = useAuth()
  const { openTab } = useTabs()

  const grouped = useMemo(() => {
    const listRoutes = appRoutes.filter(
      (r) => !r.path.includes('/tambah') && !r.path.includes('/:') && hasModule(r.module),
    )
    const byDomain = new Map<string, typeof listRoutes>()
    for (const r of listRoutes) {
      const domain = sidebarGroupOverrideForPath(r.path) ?? domainPrefixOf(r.module)
      if (!byDomain.has(domain)) byDomain.set(domain, [])
      byDomain.get(domain)!.push(r)
    }
    return [...byDomain.entries()].sort((a, b) => {
      const aIsLast = SIDEBAR_DOMAIN_LAST.has(a[0])
      const bIsLast = SIDEBAR_DOMAIN_LAST.has(b[0])
      if (aIsLast !== bIsLast) return aIsLast ? 1 : -1

      const ia = SIDEBAR_DOMAIN_PRIORITY.indexOf(a[0])
      const ib = SIDEBAR_DOMAIN_PRIORITY.indexOf(b[0])
      if (ia !== -1 || ib !== -1) {
        if (ia === -1) return 1
        if (ib === -1) return -1
        return ia - ib
      }
      return a[0].localeCompare(b[0])
    })
  }, [hasModule])

  const q = filter.trim().toLowerCase()

  function toggleGroup(domain: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(domain)) next.delete(domain)
      else next.add(domain)
      return next
    })
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    R
                  </div>
                  <span className="truncate text-sm font-semibold">RME-Frontend</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Input
            placeholder="Cari modul..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="group-data-[collapsible=icon]:hidden"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Modul</SidebarGroupLabel>
            <SidebarMenu>
              {grouped.map(([domain, routes]) => {
                const visible = q
                  ? routes.filter(
                      (r) =>
                        r.module.toLowerCase().includes(q) ||
                        routeDisplayName(r).toLowerCase().includes(q),
                    )
                  : routes
                if (visible.length === 0) return null

                const Icon = domainIconOf(domain)

                // Grup dengan satu modul saja tidak perlu dibungkus collapsible —
                // langsung tampil sebagai satu menu item icon + label yang bisa diklik.
                if (visible.length === 1 && !ALWAYS_COLLAPSIBLE_DOMAINS.has(domain)) {
                  const route = visible[0]
                  return (
                    <SidebarMenuItem key={domain}>
                      <SidebarMenuButton
                        tooltip={{ children: routeDisplayName(route), hidden: false }}
                        onClick={() => openTab(route)}
                      >
                        <Icon />
                        <span className="truncate">{routeDisplayName(route)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                // Saat ada filter pencarian, paksa semua grup terbuka
                const isOpen = q ? true : !collapsedGroups.has(domain)
                const label = `${humanizeDomain(domain)} (${visible.length})`

                return (
                  <Collapsible
                    key={domain}
                    asChild
                    open={isOpen}
                    onOpenChange={() => {
                      if (!q) toggleGroup(domain)
                    }}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={{ children: label, hidden: false }}>
                          <Icon />
                          <span className="truncate">{label}</span>
                          <ChevronRight className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {domain === 'General'
                            ? groupDatamaterRoutes(visible).map(([category, categoryRoutes]) => {
                                  const categoryKey = `${domain}:${category}`
                                  const isCategoryOpen = q ? true : !collapsedGroups.has(categoryKey)
                                  return (
                                    <Collapsible
                                      key={category}
                                      asChild
                                      open={isCategoryOpen}
                                      onOpenChange={() => {
                                        if (!q) toggleGroup(categoryKey)
                                      }}
                                      className="group/datamater-category"
                                    >
                                      <SidebarMenuSubItem>
                                        <CollapsibleTrigger asChild>
                                          <SidebarMenuSubButton className="font-medium">
                                            <span className="truncate">{category} ({categoryRoutes.length})</span>
                                            <ChevronRight className="ml-auto size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/datamater-category:rotate-90" />
                                          </SidebarMenuSubButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                          <SidebarMenuSub className="mx-2.5 translate-x-0 px-2.5">
                                            {categoryRoutes.map((r) => (
                                              <SidebarMenuSubItem key={r.path}>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <SidebarMenuSubButton onClick={() => openTab(r)}>
                                                      <span>{datamaterMenuLabel(r.module)}</span>
                                                    </SidebarMenuSubButton>
                                                  </TooltipTrigger>
                                                  <TooltipContent side="right">{datamaterMenuLabel(r.module)}</TooltipContent>
                                                </Tooltip>
                                              </SidebarMenuSubItem>
                                            ))}
                                          </SidebarMenuSub>
                                        </CollapsibleContent>
                                      </SidebarMenuSubItem>
                                    </Collapsible>
                                  )
                                })
                            : visible.map((r) => (
                                <SidebarMenuSubItem key={r.path}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <SidebarMenuSubButton onClick={() => openTab(r)}>
                                        <span>{domain === 'SDM' ? datamaterMenuLabel(r.module) : routeDisplayName(r)}</span>
                                      </SidebarMenuSubButton>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                      {domain === 'SDM' ? datamaterMenuLabel(r.module) : routeDisplayName(r)}
                                    </TooltipContent>
                                  </Tooltip>
                                </SidebarMenuSubItem>
                              ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AppSidebarUser />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-w-0">
        <header className="flex h-[50px] min-w-0 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <TabStrip />
        </header>
        <div className="flex-1 overflow-y-auto">
          <TabContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
