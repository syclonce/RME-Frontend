import { expect, test } from '@playwright/test'

/**
 * Alur kritis pertama yang teruji browser: tanpa token dipaksa ke /login,
 * login loadtest berhasil, dashboard termuat. Backend dev + akun loadtest
 * diasumsikan ada (lihat docs-sim/implementation/akun-demo.md dan
 * LoadTestSeeder).
 */
test.describe('auth', () => {
  test('tanpa token dialihkan ke login', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByLabel(/Username \/ Email/i)).toBeVisible()
  })

  test('login berhasil masuk dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/Username \/ Email/i).fill('loadtest')
    await page.getByLabel(/Password/i).fill('loadtest-password')
    await page.getByRole('button', { name: /masuk|login/i }).click()
    await expect(page).not.toHaveURL(/\/login/, { timeout: 15000 })
  })
})
