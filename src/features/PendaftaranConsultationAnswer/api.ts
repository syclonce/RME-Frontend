import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ConsultationAnswer } from './types'

export const PendaftaranConsultationAnswerEndpoint = '/consultationanswers'

export function useConsultationAnswerResource() {
  return useCrudResource<ConsultationAnswer>(PendaftaranConsultationAnswerEndpoint)
}
