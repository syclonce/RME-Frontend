import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionInitialReview } from './types'

export const LayananPrescriptionInitialReviewEndpoint = '/prescription-initial-reviews'

export function usePrescriptionInitialReviewResource() {
  return useCrudResource<PrescriptionInitialReview>(LayananPrescriptionInitialReviewEndpoint)
}
