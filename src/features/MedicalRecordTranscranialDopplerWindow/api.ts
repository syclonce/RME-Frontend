import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TranscranialDopplerWindow } from './types'

export const MedicalRecordTranscranialDopplerWindowEndpoint = '/tcd-windows'

export function useTranscranialDopplerWindowResource() {
  return useCrudResource<TranscranialDopplerWindow>(MedicalRecordTranscranialDopplerWindowEndpoint)
}
