import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ParentalHealthHistoryScreening } from './types'

export const MedicalRecordParentalHealthHistoryScreeningEndpoint = '/parental-health-history-screenings'

export function useParentalHealthHistoryScreeningResource() {
  return useCrudResource<ParentalHealthHistoryScreening>(MedicalRecordParentalHealthHistoryScreeningEndpoint)
}
