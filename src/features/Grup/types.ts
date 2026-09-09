export interface GroupBranch {
  id: string
  instance_id: string
  code: string
  name: string
  status: 'active' | 'suspended' | 'revoked'
  is_local: boolean
  last_seen_at?: string | null
}

export interface GroupContext {
  id: string
  legal_name: string
  legal_identifier?: string | null
  status: 'active' | 'suspended' | 'revoked'
  synced_at?: string | null
  branches: GroupBranch[]
  hub_group_id?: string | null
}

export interface GroupPatientSummary {
  id: string
  branch_id?: string
  medical_record_number: string
  name: string
  birth_place?: string | null
  birth_date?: string | null
  gender_id?: number | null
  address?: string | null
  updated_at?: string | null
}

export interface GroupPatientDetail extends GroupPatientSummary {
  clinical?: {
    allergies: Record<string, unknown>[]
    diagnoses: Record<string, unknown>[]
    vital_signs: Record<string, unknown>[]
    clinical_notes: Record<string, unknown>[]
  }
}

export interface GroupReferral {
  id: number
  hub_referral_id: string
  source_branch?: Pick<GroupBranch, 'id' | 'name' | 'code'>
  destination_branch?: Pick<GroupBranch, 'id' | 'name' | 'code'>
  patient_snapshot: GroupPatientSummary
  reason: string
  clinical_summary?: string | null
  status: string
  referred_at: string
}

export interface CreateGroupReferralInput {
  destination_branch_id: string
  patient_id: number | null
  reason: string
  clinical_summary?: string
}

export interface GroupRealtimeEvent {
  event_id: string
  event_type: string
  received_at: string
  processed_at?: string | null
}
