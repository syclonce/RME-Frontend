import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { notifyApiError } from '@/shared/lib/apiError'
import { useMedicalRecordEpisode } from '../api'
import type { EpisodeStatus } from '../types'

interface Props {
  visitId: number
}

const STATUS_LABEL: Record<EpisodeStatus, string> = {
  open: 'Terbuka',
  finalized: 'Final',
  amending: 'Perbaikan',
}

const STATUS_VARIANT: Record<EpisodeStatus, 'default' | 'secondary' | 'outline'> = {
  open: 'default',
  finalized: 'secondary',
  amending: 'outline',
}

/**
 * Status RME kunjungan, beserta aksi yang mengubahnya.
 *
 * Sebelum panel ini ada, gerbang RME sepenuhnya tak terlihat di layar: petugas
 * membuka modul klinis, mengisi form, lalu ditolak backend dengan "RME sudah
 * final" — tanpa pernah tahu RME-nya final, dan tanpa jalan memulai perbaikan.
 * Endpoint start/finalize/amend tidak dipanggil dari mana pun di frontend.
 */
export function MedicalRecordEpisodePanel({ visitId }: Props) {
  const { query, start, finalize, amend } = useMedicalRecordEpisode(visitId)
  const [amendOpen, setAmendOpen] = useState(false)
  const [reason, setReason] = useState('')

  const episode = query.data
  const busy = start.isPending || finalize.isPending || amend.isPending

  async function run(action: () => Promise<unknown>, success: string) {
    try {
      await action()
      toast.success(success)
    } catch (error) {
      // Gerbang menolak dengan 422 yang memuat SEMUA alasan sekaligus
      // ("catatan klinis ... diagnosis utama ... resep belum selesai").
      // notifyApiError meneruskannya apa adanya supaya petugas tidak
      // memperbaiki satu hal, mencoba lagi, lalu ditolak lagi.
      notifyApiError(error)
    }
  }

  if (query.isLoading) {
    return <Card><CardContent className="pt-6 text-sm text-muted-foreground">Memuat status rekam medis...</CardContent></Card>
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              Rekam Medis
              {episode
                ? <Badge variant={STATUS_VARIANT[episode.status]}>{STATUS_LABEL[episode.status]}</Badge>
                : <Badge variant="outline">Belum dibuka</Badge>}
              {episode && episode.version > 1 && (
                <span className="text-xs font-normal text-muted-foreground">versi {episode.version}</span>
              )}
            </CardTitle>
            <CardDescription>
              {episode === null && 'Buka rekam medis sebelum mengisi modul klinis kunjungan ini.'}
              {episode?.status === 'open' && 'Modul klinis dapat diisi. Finalkan bila pelayanan sudah selesai.'}
              {episode?.status === 'finalized' && 'Rekam medis terkunci. Mulai perbaikan untuk menambah koreksi.'}
              {episode?.status === 'amending' && 'Perbaikan sedang berjalan — modul klinis dapat diisi kembali.'}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {episode === null && (
            <Button disabled={busy} onClick={() => run(() => start.mutateAsync(), 'Rekam medis dibuka.')}>
              Buka Rekam Medis
            </Button>
          )}
          {(episode?.status === 'open' || episode?.status === 'amending') && (
            <Button disabled={busy} onClick={() => run(() => finalize.mutateAsync(), 'Rekam medis difinalkan.')}>
              Finalkan Rekam Medis
            </Button>
          )}
          {episode?.status === 'finalized' && (
            <Button variant="outline" disabled={busy} onClick={() => setAmendOpen(true)}>
              Mulai Perbaikan
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={amendOpen} onOpenChange={setAmendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mulai perbaikan rekam medis</DialogTitle>
            <DialogDescription>
              Alasan perbaikan tersimpan sebagai jejak audit dan menaikkan versi rekam medis.
              Ia tidak dapat diubah setelah tersimpan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="amend-reason">Alasan perbaikan</Label>
            <Textarea
              id="amend-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="mis. Diagnosis utama keliru, perlu dikoreksi."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAmendOpen(false)}>Batal</Button>
            <Button
              disabled={busy || reason.trim() === ''}
              onClick={async () => {
                await run(() => amend.mutateAsync(reason.trim()), 'Perbaikan rekam medis dimulai.')
                setAmendOpen(false)
                setReason('')
              }}
            >
              Mulai Perbaikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
