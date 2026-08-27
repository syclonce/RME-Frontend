import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepCognitiveDetail } from './types'

export const MedicalRecordBaepCognitiveDetailEndpoint = '/baep-cognitive-details'

export function useBaepCognitiveDetailResource() {
  return useCrudResource<BaepCognitiveDetail>(MedicalRecordBaepCognitiveDetailEndpoint)
}
