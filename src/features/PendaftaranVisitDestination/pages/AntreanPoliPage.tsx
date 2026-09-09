import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { normalizeItem, normalizeList } from '@/shared/types'
import { notifyApiError } from '@/shared/lib/apiError'
import type { Ward } from '@/features/GeneralWard/types'
import type { Visit } from '@/features/PendaftaranVisit/types'
import { useVisitDestinationQueue } from '../api'

/**
 * Halaman "Antrean Poli" untuk petugas ruangan: pilih ward, lihat siapa yang
 * masih menunggu diterima (VisitDestination berstatus pending), lalu terima
 * satu per satu lewat POST /visits. Penerimaan otomatis menutup antrean dan
 * menandai tujuan jadi 'accepted' di backend — halaman ini hanya perlu
 * invalidate query setelah sukses supaya baris yang diterima hilang dari daftar.
 */
export function AntreanPoliPage() {
  const [wardId, setWardId] = useState<number | undefined>(undefined)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const wardsQuery = useQuery({
    queryKey: ['/wards', 'list-for-antrean'],
    queryFn: async () => {
      const res = await apiClient.get('/wards', { params: { per_page: 100 } })
      return normalizeList<Ward>(res.data).items
    },
  })

  const queueQuery = useVisitDestinationQueue(wardId)

  // Urutkan paling lama menunggu di atas (created_at terkecil dulu) — backend
  // tidak menjamin urutan tertentu untuk endpoint pending_only.
  const sortedQueue = [...(queueQuery.data ?? [])].sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
    return aTime - bTime
  })

  const acceptMutation = useMutation({
    mutationFn: async (registrationId: number) => {
      const res = await apiClient.post('/visits', {
        registration_id: registrationId,
        // Ruangan WAJIB ikut dikirim. Backend memperlakukan ward_id kosong
        // sebagai penanda rawat jalan tanpa ruangan (StoreVisitRequest b.23),
        // jadi menerima pasien dari antrean Poli A tanpa mengirimnya
        // menghasilkan kunjungan yang tidak mencatat ruangan mana pun --
        // padahal ruangannya justru sudah dipilih petugas untuk melihat
        // antrean ini.
        ward_id: wardId,
        admitted_at: new Date().toISOString(),
      })
      return normalizeItem<Visit>(res.data)
    },
    onSuccess: (visit) => {
      queryClient.invalidateQueries({ queryKey: ['/pendaftaranvisitdestinations', 'queue', wardId] })
      navigate(`/pelayanan-pasien/${visit.id}`)
    },
    onError: (error) => notifyApiError(error),
  })

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <p className="text-sm text-muted-foreground">Pendaftaran</p>
        <h1 className="text-2xl font-semibold tracking-tight">Antrean Poli</h1>
        <p className="text-sm text-muted-foreground">Pasien yang sudah didaftarkan dan menunggu diterima di ruangan.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pilih Ruangan</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={wardId !== undefined ? String(wardId) : ''}
            onValueChange={(next) => setWardId(next ? Number(next) : undefined)}
            disabled={wardsQuery.isLoading}
          >
            <SelectTrigger className="w-full sm:w-80">
              <SelectValue placeholder={wardsQuery.isLoading ? 'Memuat ruangan...' : 'Pilih ruangan'} />
            </SelectTrigger>
            <SelectContent>
              {wardsQuery.data?.map((ward) => (
                <SelectItem key={ward.id} value={String(ward.id)}>
                  {ward.name ?? `Ward #${ward.id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {wardId !== undefined && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Daftar Tunggu</CardTitle>
            <Badge variant="outline">{sortedQueue.length} pasien menunggu</Badge>
          </CardHeader>
          <CardContent>
            {queueQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat antrean...</p>}

            {queueQuery.isError && <p className="text-sm text-destructive">Antrean tidak dapat dimuat.</p>}

            {!queueQuery.isLoading && !queueQuery.isError && sortedQueue.length === 0 && (
              <p className="text-sm text-muted-foreground">Tidak ada pasien menunggu.</p>
            )}

            {sortedQueue.length > 0 && (
              <div className="flex flex-col divide-y">
                {sortedQueue.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-medium">Registrasi #{item.registration_id}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.doctor_name ?? 'Dokter belum ditentukan'}
                        {item.created_at ? ` · Menunggu sejak ${new Date(item.created_at).toLocaleString('id-ID')}` : ''}
                      </p>
                    </div>
                    <Button
                      onClick={() => acceptMutation.mutate(item.registration_id)}
                      disabled={acceptMutation.isPending}
                    >
                      Terima Pasien
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
