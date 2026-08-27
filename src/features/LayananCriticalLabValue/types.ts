export interface CriticalLabValue {
  id: number
  lab_order_id: number | null
  parameter_name: string | null
  critical_value: string | null
  notified_to?: string | null
  notified_at?: string | null
  acknowledged?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface CriticalLabValueFormValues {
  lab_order_id?: number | null
  parameter_name?: string | null
  critical_value?: string | null
  notified_to?: string | null
  notified_at?: string | null
  acknowledged?: boolean | null
}
