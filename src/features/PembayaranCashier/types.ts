export interface Cashier {
  id: number
  employee_id: number | null
  cashier_code: string | null
  shift: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface CashierFormValues {
  employee_id?: number | null
  cashier_code?: string | null
  shift?: string | null
  is_active?: boolean | null
}
