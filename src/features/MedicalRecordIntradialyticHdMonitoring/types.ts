export interface IntradialyticHdMonitoring {
  id: number
  visit_id: number | null
  patient_id: number | null
  dialysis_hour?: number | null
  blood_pressure_systolic?: number | null
  blood_pressure_diastolic?: number | null
  blood_flow_rate?: number | null
  dialysate_flow_rate?: number | null
  ultrafiltration_rate?: number | null
  venous_pressure?: number | null
  transmembrane_pressure?: number | null
  symptoms?: string | null
  monitored_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface IntradialyticHdMonitoringFormValues {
  visit_id?: number | null
  patient_id?: number | null
  dialysis_hour?: number | null
  blood_pressure_systolic?: number | null
  blood_pressure_diastolic?: number | null
  blood_flow_rate?: number | null
  dialysate_flow_rate?: number | null
  ultrafiltration_rate?: number | null
  venous_pressure?: number | null
  transmembrane_pressure?: number | null
  symptoms?: string | null
  monitored_at?: string | null
}
