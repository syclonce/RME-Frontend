export interface DeviceDay {
  id: number
  visit_id: number | null
  device_type: string | null
  inserted_at: string | null
  removed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface DeviceDayFormValues {
  visit_id?: number | null
  device_type?: string | null
  inserted_at?: string | null
  removed_at?: string | null
}
