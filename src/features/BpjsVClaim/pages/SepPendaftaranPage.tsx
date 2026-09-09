import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { apiClient } from '@/api/client'
import { normalizeItem, normalizeList } from '@/shared/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Sep } from '../types'

/**
 * Layar SEP per Pendaftaran — menyambung alur BPJS yang sebelumnya stub:
 * draf dari pendaftaran → cek peserta (kelas hak) → terbitkan ke VClaim.
 * Backend: POST seps/from-registration, POST seps/:id/verify-peserta,
 * POST seps/:id/publish. Tanpa cek peserta, terbit ditolak 422.
 */
export function SepPendaftaranPage() {
  const { registrationId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const numericRegistrationId = Number(registrationId)
  const [error, setError] = useState<string | null>(null)

  const sepsQuery = useQuery({
    queryKey: ['sep-pendaftaran', numericRegistrationId],
    enabled: Number.isFinite(numericRegistrationId) && numericRegistrationId > 0,
    queryFn: async () => {
      const res = await apiClient.get('/seps', { params: { per_page: 100 } })
      return normalizeList<Sep>(res.data).items.filter(
        (s) => s.registration_id === numericRegistrationId,
      )
    },
  })

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['sep-pendaftaran', numericRegistrationId] })
  }

  const draftMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post('/seps/from-registration', {
        registration_id: numericRegistrationId,
      })
      return normalizeItem<Sep>(res.data)
    },
    onSuccess: () => {
      setError(null)
      refresh()
    },
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  const verifyMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.post(`/seps/${id}/verify-peserta`)
      return normalizeItem<Sep>(res.data)
    },
    onSuccess: () => {
      setError(null)
      refresh()
    },
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  const publishMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.post(`/seps/${id}/publish`)
      return normalizeItem<Sep>(res.data)
    },
    onSuccess: () => {
      setError(null)
      refresh()
    },
    onError: (e: unknown) => setError(errorMessage(e)),
  })

  if (!Number.isFinite(numericRegistrationId) || numericRegistrationId <= 0) {
    return <div className="p-6 text-sm text-destructive">Nomor pendaftaran tidak valid.</div>
  }

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">SEP Pendaftaran #{numericRegistrationId}</p>
          <h1 className="text-2xl font-semibold tracking-tight">SEP BPJS</h1>
        </div>
        <Button variant="outline" onClick={() => navigate('/pendaftaran-kunjungan')}>
          <ArrowLeft className="size-4" /> Kembali
        </Button>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Buat Draf dari Pendaftaran</CardTitle>
          <CardDescription>Menurunkan nomor kartu, poli, dan kelas dari data pendaftaran — tanpa ketik ulang.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => draftMutation.mutate()} disabled={draftMutation.isPending}>
            Buat Draf SEP
          </Button>
        </CardContent>
      </Card>

      {sepsQuery.isLoading && <p className="text-sm text-muted-foreground">Memuat SEP...</p>}
      {(sepsQuery.data ?? []).map((sep) => (
        <Card key={sep.id}>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle>{sep.no_sep ?? `Draf #${sep.id}`}</CardTitle>
                <CardDescription>
                  Status: {sep.local_status ?? '—'}
                  {sep.participant_class ? ` · Kelas hak: ${sep.participant_class}` : ' · Belum cek peserta'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!sep.peserta_verified_at && (
                  <Button size="sm" variant="outline" disabled={verifyMutation.isPending} onClick={() => verifyMutation.mutate(sep.id)}>
                    Cek Peserta
                  </Button>
                )}
                {sep.local_status === 'draft' && sep.peserta_verified_at && (
                  <Button size="sm" disabled={publishMutation.isPending} onClick={() => publishMutation.mutate(sep.id)}>
                    Terbitkan
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          {sep.error_message && (
            <CardContent>
              <p className="text-sm text-destructive">{sep.error_message}</p>
            </CardContent>
          )}
        </Card>
      ))}
      {sepsQuery.data?.length === 0 && (
        <p className="text-sm text-muted-foreground">Belum ada SEP untuk pendaftaran ini.</p>
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
