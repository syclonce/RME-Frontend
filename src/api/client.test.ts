import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * Kontrak keamanan client: token selalu terkirim, 401 selalu membersihkan
 * sesi. Impor ulang modul per test agar interceptor fresh.
 */
describe('apiClient auth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('menempelkan Bearer dari localStorage', async () => {
    localStorage.setItem('rme_token', 'abc123')
    const { apiClient } = await import('./client')
    const adapter = vi.fn(async () => ({ data: {}, status: 200, statusText: 'OK', headers: {}, config: {} }))
    const res = await apiClient.get('/me', { adapter: adapter as never })
    expect(res.status).toBe(200)
    expect(adapter).toHaveBeenCalledOnce()
    const calls = adapter.mock.calls as unknown[][]
    const config = calls[0][0] as { headers: Record<string, string> }
    expect(config.headers.Authorization).toBe('Bearer abc123')
  })

  it('401 menghapus token', async () => {
    localStorage.setItem('rme_token', 'basi')
    const { apiClient } = await import('./client')
    const adapter = vi.fn(async () => {
      throw Object.assign(new Error('x'), {
        response: { status: 401, data: {} },
        isAxiosError: true,
      })
    })
    await expect(apiClient.get('/me', { adapter: adapter as never })).rejects.toThrow()
    expect(localStorage.getItem('rme_token')).toBeNull()
  })
})
