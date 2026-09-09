import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { RelationLabel } from '@/shared/components/RelationLabel'
import { notifyApiError } from '@/shared/lib/apiError'
import {
  useAcknowledgeCriticalLabValue, useCriticalLabWorklist, useNotifyCriticalLabValue,
} from '../api'
import type { CriticalLabValue } from '../types'

const TIME = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
})

/**
 * Daftar kerja nilai kritis laboratorium.
 *
 * Menggantikan tabel CRUD generik. Nilai kritis bukan data master: ia hasil
 * yang berarti pasien dapat memburuk dalam hitungan jam bila tidak ada yang
 * bertindak. Yang dibutuhkan layar ini bukan "kelola data", melainkan dua
 * pertanyaan — sudah disampaikan ke siapa, dan sudah diakui siapa.
 *
 * Backend menyediakan POST /{id}/notify dan /{id}/acknowledge, plus filter
 * ?unacknowledged=1 yang docblock-nya sendiri menyebut "seharusnya dipantau
 * terus supaya tidak ada nilai kritis hilang". Sebelum halaman ini, ketiganya
 * tidak dipanggil dari mana pun di frontend.
 */
export function CriticalLabValueListPage() {
  const [unacknowledgedOnly, setUnacknowledgedOnly] = useState(true)
  const worklist = useCriticalLabWorklist(unacknowledgedOnly)
  const notifyMutation = useNotifyCriticalLabValue()
  const acknowledgeMutation = useAcknowledgeCriticalLabValue()
  const [notifyTarget, setNotifyTarget] = useState<CriticalLabValue | null>(null)
  const [notifiedTo, setNotifiedTo] = useState('')

  const items = worklist.data ?? []
  const pendingNotify = items.filter((v) => !v.notified_at).length

  async function submitNotify() {
    if (notifyTarget === null || notifiedTo.trim() === '') return
    try {
      await notifyMutation.mutateAsync({ id: notifyTarget.id, notifiedTo: notifiedTo.trim() })
      toast.success('Penyampaian tercatat.')
      setNotifyTarget(null)
      setNotifiedTo('')
    } catch (error) {
      notifyApiError(error)
    }
  }

  async function acknowledge(value: CriticalLabValue) {
    try {
      await acknowledgeMutation.mutateAsync(value.id)
      toast.success('Nilai kritis diakui.')
    } catch (error) {
      notifyApiError(error)
    }
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <TriangleAlert className="text-destructive size-5" /> Nilai Kritis Laboratorium
          </h1>
          <p className="text-muted-foreground text-sm">
            Hasil yang harus disampaikan ke dokter dan diakui penerimaannya.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="unack"
            checked={unacknowledgedOnly}
            onCheckedChange={(checked) => setUnacknowledgedOnly(checked === true)}
          />
          <Label htmlFor="unack" className="text-sm font-normal">Hanya yang belum diakui</Label>
        </div>
      </div>

      {pendingNotify > 0 && (
        <Card className="border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6 text-sm">
            <p className="font-medium">
              {pendingNotify === 1
                ? 'Satu nilai kritis belum disampaikan ke siapa pun.'
                : `${pendingNotify} nilai kritis belum disampaikan ke siapa pun.`}
            </p>
            <p className="text-muted-foreground mt-0.5">
              Sampaikan lebih dulu sebelum dapat diakui — urutannya ditegakkan backend.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {unacknowledgedOnly ? 'Belum Diakui' : 'Semua Nilai Kritis'}
          </CardTitle>
          <CardDescription>Terbaru di atas. Daftar diperbarui otomatis tiap menit.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {worklist.isLoading && <Skeleton className="h-20 w-full" />}

          {!worklist.isLoading && items.length === 0 && (
            <p className="text-muted-foreground py-6 text-center text-sm">
              {unacknowledgedOnly
                ? 'Tidak ada nilai kritis yang menunggu. Semua sudah diakui.'
                : 'Belum ada nilai kritis tercatat.'}
            </p>
          )}

          {items.map((value) => (
            <div
              key={value.id}
              className={`rounded-md border p-3 ${
                !value.acknowledged ? 'border-destructive/40 bg-destructive/5' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">
                    {value.parameter_name ?? 'Parameter tidak tercatat'}
                    <span className="text-destructive ml-2 tabular-nums">{value.critical_value ?? '—'}</span>
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Order: <RelationLabel endpoint="/lab-orders" id={value.lab_order_id} />
                  </p>
                </div>
                {value.acknowledged
                  ? <Badge variant="secondary">Diakui</Badge>
                  : value.notified_at
                    ? <Badge variant="outline">Sudah disampaikan</Badge>
                    : <Badge variant="destructive">Belum disampaikan</Badge>}
              </div>

              {value.notified_at && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Disampaikan ke <span className="text-foreground">{value.notified_to ?? '—'}</span>
                  {' · '}{TIME.format(new Date(value.notified_at))}
                  {value.acknowledged_at && (
                    <> · diakui {TIME.format(new Date(value.acknowledged_at))}</>
                  )}
                </p>
              )}

              {!value.acknowledged && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={value.notified_at ? 'outline' : 'default'}
                    onClick={() => { setNotifyTarget(value); setNotifiedTo(value.notified_to ?? '') }}
                  >
                    {value.notified_at ? 'Perbarui penyampaian' : 'Catat penyampaian'}
                  </Button>
                  {/* Tombol akui hanya muncul setelah disampaikan — backend
                      menolak urutan terbalik, dan menampilkan tombol yang pasti
                      ditolak hanya membuat petugas menebak-nebak. */}
                  {value.notified_at && (
                    <Button
                      size="sm"
                      disabled={acknowledgeMutation.isPending}
                      onClick={() => acknowledge(value)}
                    >
                      Akui penerimaan
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={notifyTarget !== null} onOpenChange={(open) => !open && setNotifyTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Catat penyampaian nilai kritis</DialogTitle>
            <DialogDescription>
              Sistem tidak mengirim notifikasi apa pun. Ini catatan bahwa Anda sudah
              menyampaikannya — lewat telepon atau langsung — beserta kepada siapa.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="notified-to">Disampaikan kepada</Label>
            <Input
              id="notified-to"
              value={notifiedTo}
              onChange={(event) => setNotifiedTo(event.target.value)}
              placeholder="mis. dr. Sari (DPJP), via telepon"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifyTarget(null)}>Batal</Button>
            <Button disabled={notifiedTo.trim() === '' || notifyMutation.isPending} onClick={submitNotify}>
              Simpan Catatan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
