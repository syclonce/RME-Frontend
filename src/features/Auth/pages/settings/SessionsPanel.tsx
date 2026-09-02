import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/AuthContext'
import { useActiveSessions } from '@/features/Auth/settingsApi'

function formatDate(value: string | null): string {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })
}

export function SessionsPanel() {
  const { data: sessions, isLoading, isError } = useActiveSessions()
  const { logoutAll } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOutAll, setIsLoggingOutAll] = useState(false)

  async function handleLogoutAll() {
    setIsLoggingOutAll(true)
    try {
      await logoutAll()
      navigate('/login')
    } finally {
      setIsLoggingOutAll(false)
    }
  }

  return (
    <div className="grid gap-4">
      {isLoading && <p className="text-sm text-muted-foreground">Memuat sesi aktif...</p>}
      {isError && <p className="text-destructive text-sm">Gagal memuat daftar sesi aktif.</p>}

      {!isLoading && !isError && (
        <div className="rounded-lg border">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[34%]">Perangkat</TableHead>
                <TableHead className="w-[24%] whitespace-nowrap">Terakhir Digunakan</TableHead>
                <TableHead className="w-[24%] whitespace-nowrap">Dibuat</TableHead>
                <TableHead className="w-[18%] text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(sessions?.length ?? 0) === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Tidak ada sesi aktif.
                  </TableCell>
                </TableRow>
              ) : (
                sessions?.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="truncate" title={session.name}>
                      {session.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(session.last_used_at)}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(session.created_at)}</TableCell>
                    <TableCell className="text-right">
                      {session.is_current_device && <Badge variant="secondary">Perangkat ini</Badge>}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isLoggingOutAll}>
              {isLoggingOutAll ? 'Memproses...' : 'Keluar dari semua perangkat'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Keluar dari semua perangkat?</AlertDialogTitle>
              <AlertDialogDescription>
                Semua token login akun ini akan dicabut, termasuk sesi pada perangkat lain.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => void handleLogoutAll()}>Keluar Semua</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="mt-2 text-xs text-muted-foreground">
          Semua token login akun ini akan dicabut, termasuk sesi pada perangkat lain, dan Anda akan diarahkan ke
          halaman masuk.
        </p>
      </div>
    </div>
  )
}
