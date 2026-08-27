import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Consultation } from './types'

export const PendaftaranConsultationEndpoint = '/consultations'

export function useConsultationResource() {
  return useCrudResource<Consultation>(PendaftaranConsultationEndpoint)
}
