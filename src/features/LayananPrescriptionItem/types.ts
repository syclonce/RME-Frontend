export interface PrescriptionItem {
  id: number
  prescription_id: number | null
  item_id?: number | null
  drug_name: string | null
  dosage: string | null
  frequency: string | null
  route?: string | null
  duration?: string | null
  quantity?: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionItemFormValues {
  prescription_id?: number | null
  item_id?: number | null
  drug_name?: string | null
  dosage?: string | null
  frequency?: string | null
  route?: string | null
  duration?: string | null
  quantity?: number | null
  notes?: string | null
}
