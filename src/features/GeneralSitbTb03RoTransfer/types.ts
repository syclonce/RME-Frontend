export interface SitbTb03RoTransfer {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SitbTb03RoTransferFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
