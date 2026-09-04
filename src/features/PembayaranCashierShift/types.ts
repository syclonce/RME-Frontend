/** Padanan Modules/PembayaranCashierShift di backend. */
export interface CashierShift {
  id: number
  cashier_id: number | null
  opened_by?: number | null
  opened_at?: string | null
  initial_cash?: number | null
  status?: string | null
  closed_at?: string | null
  closed_by?: number | null
  /** Dihitung server saat tutup: kas awal + tunai + penyesuaian. */
  expected_cash?: number | null
  actual_cash?: number | null
  /** actual − expected. Negatif berarti kas kurang. */
  cash_variance?: number | null
  /** Rekap per metode bayar, mis. { cash: 1500000, debit: 900000 }. */
  payment_totals?: Record<string, number> | null
  closing_notes?: string | null
  created_at?: string
  updated_at?: string
}
