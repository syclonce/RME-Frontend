/** Padanan Modules/MedicalRecordEpisode di backend. */
export type EpisodeStatus = 'open' | 'finalized' | 'amending'

export interface EpisodeTransition {
  id: number
  episode_id: number
  from_status: EpisodeStatus | null
  to_status: EpisodeStatus
  reason: string | null
  performed_by: number | null
  performed_at: string | null
}

export interface MedicalRecordEpisode {
  id: number
  visit_id: number
  status: EpisodeStatus
  version: number
  finalized_at: string | null
  finalized_by: number | null
  transitions?: EpisodeTransition[]
  created_at?: string
  updated_at?: string
}
