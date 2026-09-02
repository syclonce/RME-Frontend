import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { extractErrorMessage, useMeQuery, useUpdateMe } from '@/features/Auth/settingsApi'

export function ProfilePanel() {
  const { data: me, isLoading, isError } = useMeQuery()
  const updateMe = useUpdateMe()

  // Sinkronkan form dari hasil fetch `/me` selama render (bukan di dalam
  // effect) supaya tidak memicu render tambahan: lacak id user terakhir yang
  // sudah disinkronkan, reset field saat id berubah (mis. setelah refetch).
  const [syncedUserId, setSyncedUserId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (me && me.id !== syncedUserId) {
    setSyncedUserId(me.id)
    setName(me.name ?? '')
    setUsername(me.username ?? '')
    setEmail(me.email ?? '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
      await updateMe.mutateAsync({ name, username, email })
      setSuccess(true)
    } catch (err) {
      setError(extractErrorMessage(err, undefined, 'Gagal memperbarui profil.'))
    }
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Memuat profil...</p>
  }

  if (isError) {
    return <p className="text-destructive text-sm">Gagal memuat data profil.</p>
  }

  return (
    <form className="grid gap-4 max-w-md" onSubmit={handleSubmit}>
      <div className="grid gap-1.5">
        <Label htmlFor="profile-name">Nama</Label>
        <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="profile-username">Username</Label>
        <Input id="profile-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="profile-email">Email</Label>
        <Input
          id="profile-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {success && <p className="text-sm text-emerald-600 dark:text-emerald-400">Profil berhasil diperbarui.</p>}
      <div>
        <Button type="submit" disabled={updateMe.isPending}>
          {updateMe.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  )
}
