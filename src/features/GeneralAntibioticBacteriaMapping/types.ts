export interface AntibioticBacteriaMapping {
  id: number
  antibiotic_name: string | null
  bacteria_name: string | null
  sensitivity_category?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface AntibioticBacteriaMappingFormValues {
  antibiotic_name?: string | null
  bacteria_name?: string | null
  sensitivity_category?: string | null
  is_active?: boolean | null
}
