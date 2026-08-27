export interface Ambulance {
  id: number
  vehicle_code: string | null
  plate_number: string | null
  created_at?: string
  updated_at?: string
}

export interface AmbulanceFormValues {
  vehicle_code?: string | null
  plate_number?: string | null
}
