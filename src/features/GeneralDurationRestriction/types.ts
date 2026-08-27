export interface DurationRestriction {
  id: number
  antibiotic_name: string | null
  max_days: number | null
  min_days?: number | null
  requires_reevaluation?: boolean | null
  notes?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DurationRestrictionFormValues {
  antibiotic_name?: string | null
  max_days?: number | null
  min_days?: number | null
  requires_reevaluation?: boolean | null
  notes?: string | null
  is_active?: boolean | null
}
