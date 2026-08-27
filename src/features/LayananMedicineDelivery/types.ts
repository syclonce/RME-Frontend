export interface MedicineDelivery {
  id: number
  pharmacy_dispense_id: number | null
  patient_address: string | null
  requested_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicineDeliveryFormValues {
  pharmacy_dispense_id?: number | null
  patient_address?: string | null
  requested_at?: string | null
}
