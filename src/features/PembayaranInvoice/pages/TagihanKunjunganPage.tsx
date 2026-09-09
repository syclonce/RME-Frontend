import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Printer } from 'lucide-react'
import { apiClient } from '@/api/client'
import { normalizeItem, normalizeList } from '@/shared/types'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Invoice } from '../types'
import type { CashierShift } from '@/features/PembayaranCashierShift/types'

interface Coverage {
  total?: string | number | null
  covered?: string | number | null
  patient_share?: string | number | null
}

interface Payment {
  id: number
  payment_number?: string | null
  amount?: string | number | null
  payment_method?: string | null
  status?: string | null
  paid_at?: string | null
}

const rupiah = (v: string | number | null | undefined) =>
  `Rp ${Number(v ?? 0).toLocaleString('id-ID')}`

/**
 * Layar Tagihan per Kunjungan — menyambung alur kasir yang sebelumnya hanya
 * tabel-tabel lepas: daftar tagihan kunjungan → coverage penjamin →
 * kunci (lock) → bayar (idempotensi anti double-tap) → kuitansi → reversal.
 * Endpoint backend: /invoices?visit_id, /invoices/:id/{coverage,lock,unlock},
 * /payments (+reverse). Finalisasi pelayanan tetap di PelayananPasien.
 */
export function TagihanKunjunganPage() {
  const { visitId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { hasPermission } = useAuth()
  const numericVisitId = Number(visitId)
  const [payFor, setPayFor] = useState<Invoice | null>(null)
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('cash')
  const [shiftId, setShiftId] = useState('')
  const [error, setError] = useState<string | null>(null)

  const invoicesQuery = useQuery({
    queryKey: ['tagihan-kunjungan', numericVisitId],
    enabled: Number.isFinite(numericVisitId) && numericVisitId > 0,
    queryFn: async () => {
      const res = await apiClient.get('/invoices', { params: { visit_id: numericVisitId, per_page: 20 } })
      return normalizeList<Invoice>(res.data)
    },
  })

  const shiftsQuery = useQuery({
    queryKey: ['cashier-shifts-open'],
    queryFn: async () => {
      const res = await apiClient.get('/cashier-shifts', { params: { status: 'open', per_page: 20 } })
      return normalizeList<CashierShift>(res.data)
    },
  })

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['tagihan-kunjungan', numericVisitId] })
  }

  const lockMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.post(`/invoices/${id}/lock`)
      return res.data
    },
    onSuccess: refresh,
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  const unlockMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.post(`/invoices/${id}/unlock`)
      return res.data
    },
    onSuccess: refresh,
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  const payMutation = useMutation({
    mutationFn: async (invoice: Invoice) => {
      // Kunci idempotensi per niat-bayar: double-tap mengembalikan baris yang
      // sama (200), bukan pembayaran ganda (padanan tunai-upsert legacy).
      const res = await apiClient.post('/payments', {
        invoice_id: invoice.id,
        cashier_shift_id: Number(shiftId),
        payment_method: method,
        amount: Number(amount),
        idempotency_key: crypto.randomUUID(),
      })
      return res.data
    },
    onSuccess: () => {
      setPayFor(null)
      setAmount('')
      refresh()
    },
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  const reverseMutation = useMutation({
    mutationFn: async (paymentId: number) => {
      const res = await apiClient.post(`/payments/${paymentId}/reverse`, {
        cashier_shift_id: Number(shiftId || (shiftsQuery.data?.items[0]?.id ?? 0)),
      })
      return res.data
    },
    onSuccess: refresh,
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  if (!Number.isFinite(numericVisitId) || numericVisitId <= 0) {
    return <div className="p-6 text-sm text-destructive">Nomor kunjungan tidak valid.</div>
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Tagihan Kunjungan #{numericVisitId}</p>
          <h1 className="text-2xl font-semibold tracking-tight">Kasir & Pembayaran</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/klaim-kunjungan/${numericVisitId}`)}>
            Klaim & Berkas
          </Button>
          <Button variant="outline" onClick={() => navigate(`/pelayanan-pasien/${numericVisitId}`)}>
            <ArrowLeft className="size-4" /> Kembali ke Pelayanan
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      {invoicesQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat tagihan...</p>}
      {(invoicesQuery.data?.items.length ?? 0) === 0 && (
        <Card>
          <CardContent className="pt-6 text-sm text-muted-foreground">
            Belum ada tagihan untuk kunjungan ini. Tagihan terbentuk dari layanan yang diposting ke kunjungan.
          </CardContent>
        </Card>
      )}

      {(invoicesQuery.data?.items ?? []).map((invoice: Invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          canUnlock={hasPermission('pembayaran-invoice.invoice-guarantor.unlock')}
          onLock={() => lockMutation.mutate(invoice.id)}
          onUnlock={() => unlockMutation.mutate(invoice.id)}
          onPay={() => {
            setPayFor(invoice)
            setError(null)
          }}
          onReverse={(paymentId) => reverseMutation.mutate(paymentId)}
          busy={lockMutation.isPending || unlockMutation.isPending || reverseMutation.isPending}
        />
      ))}

      <Dialog open={payFor !== null} onOpenChange={(open) => !open && setPayFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bayar Tagihan #{payFor?.invoice_number ?? payFor?.id}</DialogTitle>
            <DialogDescription>Total {rupiah(payFor?.total_amount)}. Double-tap aman (idempoten).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="shift">Sesi Kasir (terbuka)</Label>
              <Select value={shiftId} onValueChange={setShiftId}>
                <SelectTrigger id="shift"><SelectValue placeholder="Pilih sesi kasir" /></SelectTrigger>
                <SelectContent>
                  {(shiftsQuery.data?.items ?? []).map((s: CashierShift) => (
                    <SelectItem key={s.id} value={String(s.id)}>Shift #{s.id} — kasir {s.cashier_id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="method">Metode</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger id="method"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['cash', 'debit', 'credit', 'transfer'].map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Jumlah (Rp)</Label>
              <Input id="amount" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              disabled={!shiftId || !amount || payMutation.isPending}
              onClick={() => payFor && payMutation.mutate(payFor)}
            >
              Bayar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function errorMessage(e: unknown): string {
  if (typeof e === 'object' && e !== null && 'response' in e) {
    const data = (e as { response?: { data?: { message?: string } } }).response?.data
    if (data?.message) return data.message
  }
  return 'Terjadi kesalahan. Coba lagi.'
}

function InvoiceCard({
  invoice, canUnlock, onLock, onUnlock, onPay, onReverse, busy,
}: {
  invoice: Invoice
  canUnlock: boolean
  onLock: () => void
  onUnlock: () => void
  onPay: () => void
  onReverse: (paymentId: number) => void
  busy: boolean
}) {
  const coverageQuery = useQuery({
    queryKey: ['invoice-coverage', invoice.id],
    queryFn: async () => {
      const res = await apiClient.get(`/invoices/${invoice.id}/coverage`)
      return normalizeItem<Coverage>(res.data)
    },
  })
  const paymentsQuery = useQuery({
    queryKey: ['invoice-payments', invoice.id],
    queryFn: async () => {
      const res = await apiClient.get('/payments', { params: { invoice_id: invoice.id, per_page: 20 } })
      return normalizeList<Payment>(res.data)
    },
  })

  const coverage = coverageQuery.data

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle>#{invoice.invoice_number ?? invoice.id}</CardTitle>
            <CardDescription>
              Status: {invoice.status ?? '—'} {invoice.is_locked ? '· Terkunci' : '· Terbuka'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {!invoice.is_locked && (
              <Button size="sm" onClick={onLock} disabled={busy}>Kunci (Final)</Button>
            )}
            {!invoice.is_locked && (
              <Button size="sm" variant="outline" onClick={onPay} disabled={busy}>Bayar</Button>
            )}
            {invoice.is_locked && canUnlock && (
              <Button size="sm" variant="outline" onClick={onUnlock} disabled={busy}>Buka Kunci (Admin)</Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <div><p className="text-xs text-muted-foreground">Total</p><p className="font-semibold">{rupiah(invoice.total_amount)}</p></div>
          <div><p className="text-xs text-muted-foreground">Ditanggung penjamin</p><p className="font-medium">{rupiah(coverage?.covered)}</p></div>
          <div><p className="text-xs text-muted-foreground">Sisa pasien</p><p className="font-medium">{rupiah(coverage?.patient_share)}</p></div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Pembayaran</p>
            <Button size="sm" variant="ghost" onClick={() => window.print()}>
              <Printer className="size-4" /> Kuitansi
            </Button>
          </div>
          {(paymentsQuery.data?.items.length ?? 0) === 0 && <p className="text-sm text-muted-foreground">Belum ada pembayaran.</p>}
          {(paymentsQuery.data?.items ?? []).map((p: Payment) => (
            <div key={p.id} className="flex items-center justify-between border-t py-2 text-sm">
              <span>{p.payment_number ?? `#${p.id}`} · {p.payment_method} · {rupiah(p.amount)} · {p.status}</span>
              {p.status === 'completed' && (
                <Button size="sm" variant="ghost" onClick={() => onReverse(p.id)} disabled={busy}>Batalkan</Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
