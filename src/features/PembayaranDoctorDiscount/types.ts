export interface DoctorDiscount {
  id: number
  discount_id: number | null
  employee_id: number | null
  percentage: number | null
  created_at?: string
  updated_at?: string
}

export interface DoctorDiscountFormValues {
  discount_id?: number | null
  employee_id?: number | null
  percentage?: number | null
}
