export interface Payment {
  id: number
  payment_number?: string | null
  invoice_id: number | null
  payment_method: string | null
  amount: number | null
  admin_fee?: number | null
  paid_at?: string | null
  /**
   * Shift kasir yang menerima pembayaran ini. Wajib dikirim saat posting, dan
   * jadi acuan saat pembatalan — reversal hanya dapat dilakukan pada shift
   * yang masih terbuka.
   */
  cashier_shift_id?: number | null
  received_by?: number | null
  /** 'completed' | 'reversed'. Modul ini punya beberapa tabel, sehingga luput
   *  dari penyapuan paritas tipe sebelumnya. */
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PaymentFormValues {
  payment_number?: string | null
  invoice_id?: number | null
  payment_method?: string | null
  amount?: number | null
  admin_fee?: number | null
  paid_at?: string | null
}
