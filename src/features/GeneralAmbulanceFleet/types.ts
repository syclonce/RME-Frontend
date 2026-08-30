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

export interface AmbulanceTrip {
  id: number
  ambulance_id: number
  patient_id?: number | null
  driver_employee_id: number
  purpose: string
  origin: string
  destination: string
  departed_at?: string | null
  returned_at?: string | null
  status: string
  created_at?: string
  updated_at?: string
}
