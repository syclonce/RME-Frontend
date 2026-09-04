import { Badge } from '@/components/ui/badge'

/**
 * Status order layanan (lab, radiologi, tindakan) dalam bahasa Indonesia.
 *
 * Backend menyimpannya sebagai kata Inggris karena itulah nilai di kolom
 * `status` dan di const TRANSITIONS — menerjemahkannya di database akan
 * memutus state machine. Terjemahannya milik lapisan tampilan.
 *
 * Dipakai bersama oleh tiga modul supaya "in_progress" tidak diterjemahkan
 * jadi tiga kata berbeda di tiga layar.
 */
const LABEL: Record<string, string> = {
  pending: 'Menunggu',
  scheduled: 'Terjadwal',
  in_progress: 'Dikerjakan',
  completed: 'Selesai',
  cancelled: 'Batal',
  received: 'Diterima',
  rejected: 'Ditolak',
  reversed: 'Dibatalkan',
  open: 'Terbuka',
  closed: 'Ditutup',
}

const VARIANT: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'outline',
  scheduled: 'outline',
  in_progress: 'default',
  completed: 'secondary',
  cancelled: 'destructive',
  received: 'secondary',
  rejected: 'destructive',
  reversed: 'destructive',
  open: 'default',
  closed: 'secondary',
}

export function OrderStatusBadge({ status }: { status: string | null | undefined }) {
  if (!status) return <Badge variant="outline">Tanpa status</Badge>

  // Status yang tak dikenal ditampilkan apa adanya, bukan disembunyikan:
  // status baru di backend harus terlihat di layar, bukan hilang diam-diam.
  return <Badge variant={VARIANT[status] ?? 'outline'}>{LABEL[status] ?? status}</Badge>
}
