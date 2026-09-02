import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { extractErrorMessage, useUpdatePassword } from '@/features/Auth/settingsApi'

export function SecurityPanel() {
  const updatePassword = useUpdatePassword()

  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (password !== passwordConfirmation) {
      setError('Konfirmasi password baru tidak cocok.')
      return
    }

    try {
      await updatePassword.mutateAsync({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      })
      setSuccess(true)
      setCurrentPassword('')
      setPassword('')
      setPasswordConfirmation('')
    } catch (err) {
      setError(extractErrorMessage(err, 'current_password', 'Gagal mengganti password.'))
    }
  }

  return (
    <form className="grid gap-4 max-w-md" onSubmit={handleSubmit}>
      <div className="grid gap-1.5">
        <Label htmlFor="current-password">Password Saat Ini</Label>
        <Input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="new-password">Password Baru</Label>
        <Input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="new-password-confirmation">Konfirmasi Password Baru</Label>
        <Input
          id="new-password-confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {success && <p className="text-sm text-emerald-600 dark:text-emerald-400">Password berhasil diganti.</p>}
      <div>
        <Button type="submit" disabled={updatePassword.isPending}>
          {updatePassword.isPending ? 'Menyimpan...' : 'Ganti Password'}
        </Button>
      </div>
    </form>
  )
}
