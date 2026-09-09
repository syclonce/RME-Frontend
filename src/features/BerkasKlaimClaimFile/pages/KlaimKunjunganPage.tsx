import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { apiClient } from '@/api/client'
import { normalizeItem, normalizeList } from '@/shared/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { BerkasKlaimClaimFile } from '../types'
import type { Invoice } from '@/features/PembayaranInvoice/types'

/** Cermin ALLOWED_TRANSITIONS backend (ClaimFile): maju saja. */
const NEXT_STATUS: Record<string, { value: string; label: string }[]> = {
  draft: [{ value: 'submitted', label: 'Ajukan (Submitted)' }],
  submitted: [
    { value: 'processed', label: 'Diproses' },
    { value: 'rejected', label: 'Ditolak' },
  ],
  processed: [{ value: 'paid', label: 'Dibayar' }],
  rejected: [],
  paid: [],
}

/**
 * Layar Klaim per Kunjungan — menyambung rantai tagihan → klaim: daftar berkas
 * klaim kunjungan, buat draf dari tagihan terkunci, majukan status sesuai
 * transisi backend. Coding diagnosis dan grouping INA-CBG tetap di modul
 * coder; halaman ini mengikatnya ke kunjungan yang sama.
 */
export function KlaimKunjunganPage() {
  const { visitId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const numericVisitId = Number(visitId)
  const [invoiceId, setInvoiceId] = useState('')
  const [error, setError] = useState<string | null>(null)

  const claimsQuery = useQuery({
    queryKey: ['klaim-kunjungan', numericVisitId],
    enabled: Number.isFinite(numericVisitId) && numericVisitId > 0,
    queryFn: async () => {
      const res = await apiClient.get('/claim-files', { params: { per_page: 100 } })
      return normalizeList<BerkasKlaimClaimFile>(res.data).items.filter(
        (c) => c.visit_id === numericVisitId,
      )
    },
  })

  const invoicesQuery = useQuery({
    queryKey: ['klaim-invoices', numericVisitId],
    enabled: Number.isFinite(numericVisitId) && numericVisitId > 0,
    queryFn: async () => {
      const res = await apiClient.get('/invoices', { params: { visit_id: numericVisitId, per_page: 20 } })
      return normalizeList<Invoice>(res.data).items
    },
  })

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['klaim-kunjungan', numericVisitId] })
  }

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post('/claim-files', {
        visit_id: numericVisitId,
        invoice_id: invoiceId ? Number(invoiceId) : undefined,
      })
      return normalizeItem<BerkasKlaimClaimFile>(res.data)
    },
    onSuccess: () => {
      setInvoiceId('')
      setError(null)
      refresh()
    },
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  const advanceMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiClient.put(`/claim-files/${id}`, { status })
      return normalizeItem<BerkasKlaimClaimFile>(res.data)
    },
    onSuccess: () => {
      setError(null)
      refresh()
    },
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  if (!Number.isFinite(numericVisitId) || numericVisitId <= 0) {
    return <div className="p-6 text-sm text-destructive">Nomor kunjungan tidak valid.</div>
  }

  const lockedInvoices = (invoicesQuery.data ?? []).filter((i) => i.is_locked)

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Berkas Klaim Kunjungan #{numericVisitId}</p>
          <h1 className="text-2xl font-semibold tracking-tight">Klaim & Berkas</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/tagihan-kunjungan/${numericVisitId}`)}>
            <ArrowLeft className="size-4" /> Tagihan
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Buat Berkas Klaim</CardTitle>
          <CardDescription>
            Hanya dari tagihan yang sudah dikunci kasir. {lockedInvoices.length === 0 && 'Belum ada tagihan terkunci — kunci dulu di layar Tagihan.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-3">
          <div className="grid min-w-52 gap-2">
            <Select value={invoiceId} onValueChange={setInvoiceId}>
              <SelectTrigger><SelectValue placeholder="Pilih tagihan terkunci" /></SelectTrigger>
              <SelectContent>
                {lockedInvoices.map((i) => (
                  <SelectItem key={i.id} value={String(i.id)}>
                    #{i.invoice_number ?? i.id} — Rp {Number(i.total_amount ?? 0).toLocaleString('id-ID')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
            Buat Draf
          </Button>
        </CardContent>
      </Card>

      {claimsQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat berkas...</p>}
      {(claimsQuery.data ?? []).map((claim) => (
        <Card key={claim.id}>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>#{claim.claim_number ?? claim.id}</CardTitle>
                <CardDescription>Status: {claim.status ?? '—'}</CardDescription>
              </div>
              <div className="flex gap-2">
                {(NEXT_STATUS[claim.status ?? ''] ?? []).map((next) => (
                  <Button
                    key={next.value}
                    size="sm"
                    variant="outline"
                    disabled={advanceMutation.isPending}
                    onClick={() => advanceMutation.mutate({ id: claim.id, status: next.value })}
                  >
                    {next.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
      {claimsQuery.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Belum ada berkas klaim untuk kunjungan ini.</p>
      )}
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
