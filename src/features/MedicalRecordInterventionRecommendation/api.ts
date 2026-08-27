import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InterventionRecommendation } from './types'

export const MedicalRecordInterventionRecommendationEndpoint = '/intervention-recommendations'

export function useInterventionRecommendationResource() {
  return useCrudResource<InterventionRecommendation>(MedicalRecordInterventionRecommendationEndpoint)
}
