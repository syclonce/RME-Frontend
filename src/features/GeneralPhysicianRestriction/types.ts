export interface PhysicianRestriction {
  id: number
  doctor_id: number | null
  restricted_antibiotic_name: string | null
  authorization_level?: string | null
  is_authorized_prescriber?: boolean | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PhysicianRestrictionFormValues {
  doctor_id?: number | null
  restricted_antibiotic_name?: string | null
  authorization_level?: string | null
  is_authorized_prescriber?: boolean | null
  notes?: string | null
}
