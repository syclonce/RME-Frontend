import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TagihanKunjunganPage } from './TagihanKunjunganPage'

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ hasPermission: () => true }),
}))

const getMock = vi.fn()
const postMock = vi.fn()

vi.mock('@/api/client', () => ({
  apiClient: {
    get: (...args: unknown[]) => getMock(...args),
    post: (...args: unknown[]) => postMock(...args),
  },
}))

const invoice = {
  id: 1,
  invoice_number: 'INV-001',
  visit_id: 1,
  total_amount: '100000',
  is_locked: false,
  status: 'open',
}

function setup() {
  getMock.mockImplementation((url: string) => {
    if (url === '/invoices') return Promise.resolve({ data: { data: [invoice], meta: { total: 1 } } })
    if (url === '/invoices/1/coverage') {
      return Promise.resolve({ data: { data: { total: '100000', covered: '0', patient_share: '100000' } } })
    }
    if (url === '/payments') return Promise.resolve({ data: { data: [] } })
    if (url === '/cashier-shifts') return Promise.resolve({ data: { data: [] } })
    return Promise.reject(new Error(`unexpected GET ${url}`))
  })
  postMock.mockImplementation((url: string) => {
    if (url === '/invoices/1/lock') return Promise.resolve({ data: { data: { id: 1, is_locked: true } } })
    return Promise.reject(new Error(`unexpected POST ${url}`))
  })
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/tagihan-kunjungan/1']}>
        <Routes>
          <Route path="/tagihan-kunjungan/:visitId" element={<TagihanKunjunganPage />} />
          <Route path="/pelayanan-pasien/:visitId" element={<div>Halaman Pelayanan</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

/**
 * Alur kasir pertama yang teruji: daftar tagihan kunjungan tampil,
 * kunci/final memanggil endpoint yang benar.
 */
describe('TagihanKunjunganPage', () => {
  beforeEach(() => {
    getMock.mockReset()
    postMock.mockReset()
  })

  it('menampilkan tagihan dan coverage kunjungan', async () => {
    setup()
    expect(await screen.findByText('#INV-001')).toBeInTheDocument()
    expect(await screen.findByText(/Rp 100\.000/)).toBeInTheDocument()
  })

  it('tombol kunci memanggil POST lock', async () => {
    const user = userEvent.setup()
    setup()
    await screen.findByText('#INV-001')
    await user.click(screen.getByRole('button', { name: /Kunci \(Final\)/ }))
    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith('/invoices/1/lock')
    })
  })
})
