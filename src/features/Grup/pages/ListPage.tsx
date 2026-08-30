// codegen:preserve — halaman referral terhubung ke event realtime grup.
import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/AuthContext'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import {
  useCreateGroupReferral,
  useGroupContext,
  useGroupPatient,
  useGroupPatients,
  useGroupReferrals,
  useGroupRealtimeEvents,
  useSyncGroupContext,
  useUpdateGroupReferralStatus,
} from '../api'
import type { CreateGroupReferralInput, GroupPatientSummary } from '../types'

function value(value: unknown): string {
  if (value === null || value === undefined || value === '') return '-'
  return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

export function GroupListPage() {
  const { hasPermission } = useAuth()
  const context = useGroupContext()
  const referrals = useGroupReferrals()
  const realtimeEvents = useGroupRealtimeEvents()
  const queryClient = useQueryClient()
  const sync = useSyncGroupContext()
  const createReferral = useCreateGroupReferral()
  const updateStatus = useUpdateGroupReferralStatus()
  const [query, setQuery] = useState('')
  const [branchId, setBranchId] = useState('all')
  const [selectedPatient, setSelectedPatient] = useState<GroupPatientSummary | null>(null)
  const patients = useGroupPatients({ q: query, branch_id: branchId === 'all' ? undefined : branchId })
  const patient = useGroupPatient(selectedPatient?.branch_id ?? (branchId === 'all' ? undefined : branchId), selectedPatient?.id)
  const [form, setForm] = useState<CreateGroupReferralInput>({ destination_branch_id: '', patient_id: null, reason: '' })

  const latestEventId = realtimeEvents.data?.[0]?.event_id
  useEffect(() => {
    if (!latestEventId) return
    void queryClient.invalidateQueries({ queryKey: ['grup', 'referrals'] })
    void queryClient.invalidateQueries({ queryKey: ['grup', 'context'] })
  }, [latestEventId, queryClient])

  const siblings = useMemo(() => context.data?.branches.filter((item) => !item.is_local && item.status === 'active') ?? [], [context.data])
  const canSync = hasPermission('grup.group-context.sync')
  const canCreateReferral = hasPermission('grup.group-referral.store')
  const canUpdateReferral = hasPermission('grup.group-referral.update')

  if (context.isLoading) return <p className="text-muted-foreground p-6 text-sm">Memuat konteks grup...</p>
  if (!context.data) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader><CardTitle>Grup belum tersinkron</CardTitle><CardDescription>Keanggotaan hanya dapat diterbitkan oleh License Hub.</CardDescription></CardHeader>
          {canSync && <CardContent><Button onClick={() => sync.mutate()} disabled={sync.isPending}>Sinkronkan dari hub</Button></CardContent>}
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Grup {context.data.legal_name}</h1>
          <p className="text-muted-foreground text-sm">{context.data.legal_identifier ?? 'Identitas badan hukum belum tersedia'} · {context.data.branches.length} cabang</p>
        </div>
        {canSync && <Button variant="outline" onClick={() => sync.mutate()} disabled={sync.isPending}>Sinkronkan membership</Button>}
      </div>

      <Card>
        <CardHeader><CardTitle>Cabang</CardTitle><CardDescription>Daftar authoritative dari lisensi hub; tidak dapat diedit di instance ini.</CardDescription></CardHeader>
        <CardContent>
          <Table><TableHeader><TableRow><TableHead>Kode</TableHead><TableHead>Nama</TableHead><TableHead>Status</TableHead><TableHead>Terakhir online</TableHead></TableRow></TableHeader>
            <TableBody>{context.data.branches.map((item) => <TableRow key={item.id}><TableCell>{item.code}</TableCell><TableCell>{item.name} {item.is_local && <Badge variant="secondary">Cabang ini</Badge>}</TableCell><TableCell><Badge variant={item.status === 'active' ? 'default' : 'destructive'}>{item.status}</Badge></TableCell><TableCell>{item.last_seen_at ? new Date(item.last_seen_at).toLocaleString('id-ID') : '-'}</TableCell></TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Cari pasien cabang</CardTitle><CardDescription>Minimal tiga karakter. Data klinis baru diambil melalui relay hub ketika hasil dipilih.</CardDescription></CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-[16rem_1fr]">
            <Select value={branchId} onValueChange={(next) => { setBranchId(next); setSelectedPatient(null) }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Semua cabang lain</SelectItem>{siblings.map((item) => <SelectItem key={item.id} value={item.id}>{item.code} — {item.name}</SelectItem>)}</SelectContent></Select>
            <Input placeholder="Nama atau nomor rekam medis" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          {patients.isError && <p className="text-destructive text-sm">Pencarian gagal. Pastikan hub dan cabang tujuan online.</p>}
          {patients.data && <Table><TableHeader><TableRow><TableHead>No. RM</TableHead><TableHead>Nama</TableHead><TableHead>Tanggal lahir</TableHead><TableHead /></TableRow></TableHeader><TableBody>{patients.data.items.map((item) => <TableRow key={`${item.branch_id}-${item.id}`}><TableCell>{item.medical_record_number}</TableCell><TableCell>{item.name}</TableCell><TableCell>{item.birth_date ?? '-'}</TableCell><TableCell><Button size="sm" variant="outline" onClick={() => setSelectedPatient(item)}>Lihat klinis</Button></TableCell></TableRow>)}</TableBody></Table>}
          {patient.data && <div className="rounded-md border p-4"><h3 className="font-medium">Snapshot klinis — {patient.data.name}</h3><div className="mt-3 grid gap-3 md:grid-cols-2">{Object.entries(patient.data.clinical ?? {}).map(([section, rows]) => <div key={section}><p className="text-sm font-medium">{section.replaceAll('_', ' ')}</p><div className="text-muted-foreground max-h-44 overflow-auto text-xs">{rows.length === 0 ? '-' : rows.map((row, index) => <pre className="mt-1 whitespace-pre-wrap" key={index}>{value(row)}</pre>)}</div></div>)}</div></div>}
        </CardContent>
      </Card>

      {canCreateReferral && <Card><CardHeader><CardTitle>Buat rujukan antar cabang</CardTitle></CardHeader><CardContent><form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); createReferral.mutate(form, { onSuccess: () => setForm({ destination_branch_id: '', patient_id: null, reason: '' }) }) }}>
        <div className="grid gap-1.5"><Label>Cabang tujuan</Label><Select value={form.destination_branch_id} onValueChange={(destination_branch_id) => setForm({ ...form, destination_branch_id })}><SelectTrigger><SelectValue placeholder="Pilih cabang" /></SelectTrigger><SelectContent>{siblings.map((item) => <SelectItem key={item.id} value={item.id}>{item.code} — {item.name}</SelectItem>)}</SelectContent></Select></div>
        <div className="grid gap-1.5"><Label>Pasien lokal</Label><AsyncCombobox endpoint="/patients" value={form.patient_id} onChange={(patient_id) => setForm({ ...form, patient_id })} /></div>
        <div className="grid gap-1.5 md:col-span-2"><Label>Alasan rujukan</Label><Textarea required minLength={5} maxLength={5000} value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} /></div>
        <div className="grid gap-1.5 md:col-span-2"><Label>Ringkasan klinis</Label><Textarea maxLength={20000} value={form.clinical_summary ?? ''} onChange={(event) => setForm({ ...form, clinical_summary: event.target.value })} /></div>
        {createReferral.isError && <p className="text-destructive text-sm md:col-span-2">Rujukan gagal dikirim.</p>}<Button className="md:col-span-2" disabled={!form.destination_branch_id || !form.patient_id || form.reason.length < 5 || createReferral.isPending}>Kirim rujukan</Button>
      </form></CardContent></Card>}

      <Card><CardHeader><CardTitle>Rujukan realtime</CardTitle><CardDescription>Diperbarui otomatis; payload klinis tetap diambil melalui REST hub.</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Waktu</TableHead><TableHead>Pasien</TableHead><TableHead>Asal → Tujuan</TableHead><TableHead>Status</TableHead><TableHead>Aksi</TableHead></TableRow></TableHeader><TableBody>{referrals.data?.items.map((item) => <TableRow key={item.hub_referral_id}><TableCell>{new Date(item.referred_at).toLocaleString('id-ID')}</TableCell><TableCell>{item.patient_snapshot?.name ?? '-'}</TableCell><TableCell>{item.source_branch?.code ?? '-'} → {item.destination_branch?.code ?? '-'}</TableCell><TableCell><Badge variant="secondary">{item.status}</Badge></TableCell><TableCell>{canUpdateReferral && item.status === 'requested' && <div className="flex gap-2"><Button size="sm" onClick={() => updateStatus.mutate({ id: item.hub_referral_id, status: 'accepted' })}>Terima</Button><Button size="sm" variant="outline" onClick={() => updateStatus.mutate({ id: item.hub_referral_id, status: 'rejected' })}>Tolak</Button></div>}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
      <Card>
        <CardHeader><CardTitle>Status Event Grup</CardTitle><CardDescription>Event Reverb diproses backend dan dipantau UI setiap 5 detik sebagai fallback koneksi.</CardDescription></CardHeader>
        <CardContent className="space-y-2">
          {realtimeEvents.isError ? <p className="text-destructive text-sm">Gagal membaca status event.</p> :
            realtimeEvents.data?.slice(0, 5).map((event) => <div key={event.event_id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-2 text-sm"><span>{event.event_type}</span><span className="text-muted-foreground">{new Date(event.received_at).toLocaleString('id-ID')}</span><Badge variant={event.processed_at ? 'default' : 'secondary'}>{event.processed_at ? 'Diproses' : 'Menunggu'}</Badge></div>)}
          {!realtimeEvents.isLoading && realtimeEvents.data?.length === 0 && <p className="text-muted-foreground text-sm">Belum ada event diterima.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
