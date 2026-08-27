export interface PrescriptionFrequencyRule {
  id: number
  code: string | null
  description?: string | null
  times_per_day: number | null
  interval_hours?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionFrequencyRuleFormValues {
  code?: string | null
  description?: string | null
  times_per_day?: number | null
  interval_hours?: number | null
  is_active?: boolean | null
}
