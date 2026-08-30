export interface SterilizationCycle {
  id: number
  machine_name: string | null
  temperature_celsius: number | null
  pressure_bar: number | null
  duration_minutes: number | null
  started_at: string | null
  completed_at?: string | null
  biological_indicator_result?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface SterilizationCycleFormValues {
  machine_name?: string | null
  temperature_celsius?: number | null
  pressure_bar?: number | null
  duration_minutes?: number | null
  started_at?: string | null
  completed_at?: string | null
  biological_indicator_result?: string | null
  status?: string | null
}

export interface SterilizedItem {
  id: number
  cycle_id: number
  item_name: string
  quantity: number
  expiry_date?: string | null
  created_at?: string
  updated_at?: string
}
