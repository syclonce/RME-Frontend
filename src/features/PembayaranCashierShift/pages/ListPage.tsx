import { useState } from 'react'
import { Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { AsyncCombobox } from '@/shared/components/AsyncCombobox'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { notifyApiError } from '@/shared/lib/apiError'
import { useCashierShifts, useCloseCashierShift, useOpenCashierShift } from '../api'
import type { CashierShift } from '../types'

const RUPIAH = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
})
const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/**
 * Buka dan tutup shift kasir.
 *
 * Modul ini sebelumnya TIDAK PUNYA HALAMAN SAMA SEKALI — kasir tidak dapat
 * membuka shiftnya, dan tanpa shift terbuka pembayaran tidak dapat diposting
 * maupun dibatalkan (POST /payments/{id}/reverse menuntut cashier_shift_id).
 *
 * Selisih kas ditampilkan paling menonjol: itulah angka yang diperiksa saat
 * serah terima uang, dan satu-satunya alasan tutup shift dicatat sama sekali.
 */
export function CashierShiftListPage() {
  const shiftsQuery = useCashierShifts()
  const openMutation = useOpenCashierShift()
  const closeMutation = useCloseCashierShift()

  const [openDialog, setOpenDialog] = useState(false)
  const [cashierId, setCashierId] = useState<number | null>(null)
  const [initialCash, setInitialCash] = useState('')

  const [closeTarget, setCloseTarget] = useState<CashierShift | null>(null)
  const [actualCash, setActualCash] = useState('')
  const [notes, setNotes] = useState('')

  const shifts = shiftsQuery.data ?? []
  const openShifts = shifts.filter((s) => s.status === 'open')

  async function submitOpen() {
    if (cashierId === null || initialCash.trim() === '') return
    try {
      await openMutation.mutateAsync({ cashierId, initialCash: Number(initialCash) })
      toast.success('Shift dibuka.')
      setOpenDialog(false)
      setCashierId(null)
      setInitialCash('')
    } catch (error) {
      notifyApiError(error)
    }
  }

  async function submitClose() {
    if (closeTarget === null || actualCash.trim() === '') return
    try {
      const closed = await closeMutation.mutateAsync({
        shiftId: closeTarget.id,
        actualCash: Number(actualCash),
        notes: notes.trim() || undefined,
      })
      const variance = closed.cash_variance ?? 0
      toast.success(
        variance === 0
          ? 'Shift ditutup, kas sesuai.'
          : `Shift ditutup dengan selisih ${RUPIAH.format(variance)}.`,
      )
      setCloseTarget(null)
      setActualCash('')
      setNotes('')
    } catch (error) {
      notifyApiError(error)
    }
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <Wallet className="text-muted-foreground size-5" /> Shift Kasir
          </h1>
          <p className="text-muted-foreground text-sm">
            Pembayaran hanya dapat diposting selama shift terbuka.
          </p>
        </div>
        <Button onClick={() => setOpenDialog(true)}>Buka Shift</Button>
      </div>

      {openShifts.length === 0 && !shiftsQuery.isLoading && (
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardContent className="pt-6 text-sm">
            <p className="font-medium">Tidak ada shift yang sedang terbuka.</p>
            <p className="text-muted-foreground mt-0.5">
              Buka shift lebih dulu sebelum menerima pembayaran.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Shift</CardTitle>
          <CardDescription>Terbaru di atas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {shiftsQuery.isLoading && <Skeleton className="h-20 w-full" />}

          {!shiftsQuery.isLoading && shifts.length === 0 && (
            <p className="text-muted-foreground py-6 text-center text-sm">Belum ada shift tercatat.</p>
          )}

          {shifts.map((shift) => (
            <ShiftRow key={shift.id} shift={shift} onClose={() => { setCloseTarget(shift); setActualCash(''); setNotes('') }} />
          ))}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buka shift kasir</DialogTitle>
            <DialogDescription>
              Kas awal adalah uang tunai yang benar-benar ada di laci saat shift dimulai —
              ia jadi dasar hitungan selisih saat tutup nanti.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Kasir</Label>
              <AsyncCombobox endpoint="/cashiers" value={cashierId} onChange={setCashierId} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="initial-cash">Kas Awal (Rp)</Label>
              <Input
                id="initial-cash"
                type="number"
                inputMode="numeric"
                value={initialCash}
                onChange={(e) => setInitialCash(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Batal</Button>
            <Button
              disabled={cashierId === null || initialCash.trim() === '' || openMutation.isPending}
              onClick={submitOpen}
            >
              Buka Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={closeTarget !== null} onOpenChange={(open) => !open && setCloseTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tutup shift kasir</DialogTitle>
            <DialogDescription>
              Hitung uang tunai di laci dan masukkan jumlah sebenarnya. Sistem membandingkannya
              dengan kas awal ditambah seluruh pembayaran tunai — selisihnya dicatat apa adanya,
              tidak menghalangi penutupan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="actual-cash">Kas Fisik (Rp)</Label>
              <Input
                id="actual-cash"
                type="number"
                inputMode="numeric"
                value={actualCash}
                onChange={(e) => setActualCash(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="close-notes">Catatan</Label>
              <Textarea id="close-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCloseTarget(null)}>Batal</Button>
            <Button disabled={actualCash.trim() === '' || closeMutation.isPending} onClick={submitClose}>
              Tutup Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ShiftRow({ shift, onClose }: { shift: CashierShift; onClose: () => void }) {
  const isOpen = shift.status === 'open'
  const variance = shift.cash_variance ?? 0

  return (
    <div className={`rounded-md border p-3 ${isOpen ? 'border-primary/40 bg-primary/5' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium">
            <RelationLabel endpoint="/cashiers" id={shift.cashier_id} />
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Dibuka {shift.opened_at ? TIME.format(new Date(shift.opened_at)) : '—'}
            {shift.closed_at && ` · ditutup ${TIME.format(new Date(shift.closed_at))}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isOpen ? 'default' : 'secondary'}>{isOpen ? 'Terbuka' : 'Ditutup'}</Badge>
          {isOpen && <Button size="sm" variant="outline" onClick={onClose}>Tutup Shift</Button>}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Figure label="Kas Awal" value={shift.initial_cash} />
        {!isOpen && (
          <>
            <Figure label="Seharusnya" value={shift.expected_cash} />
            <Figure label="Kas Fisik" value={shift.actual_cash} />
            <div>
              <p className="text-muted-foreground text-xs">Selisih</p>
              {/* Selisih nol bukan sekadar "0": ia jawaban yang dicari saat
                  serah terima uang, jadi dinyatakan sebagai kalimat. */}
              <p
                className={`font-semibold tabular-nums ${
                  variance === 0 ? 'text-foreground' : 'text-destructive'
                }`}
              >
                {variance === 0 ? 'Sesuai' : RUPIAH.format(variance)}
              </p>
              {variance !== 0 && (
                <p className="text-destructive text-xs">{variance > 0 ? 'kas lebih' : 'kas kurang'}</p>
              )}
            </div>
          </>
        )}
      </div>

      {shift.payment_totals && Object.keys(shift.payment_totals).length > 0 && (
        <div className="mt-3 border-t pt-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Rekap per Metode
          </p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {Object.entries(shift.payment_totals).map(([method, total]) => (
              <span key={method}>
                <span className="text-muted-foreground">{method}</span>{' '}
                <span className="font-medium tabular-nums">{RUPIAH.format(total)}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {shift.closing_notes && (
        <p className="text-muted-foreground mt-2 text-sm whitespace-pre-line">{shift.closing_notes}</p>
      )}
    </div>
  )
}

function Figure({ label, value }: { label: string; value: number | null | undefined }) {
  return (
    <div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-medium tabular-nums">
        {value === null || value === undefined ? '—' : RUPIAH.format(value)}
      </p>
    </div>
  )
}
