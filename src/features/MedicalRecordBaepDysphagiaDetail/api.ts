import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepDysphagiaDetail } from './types'

export const MedicalRecordBaepDysphagiaDetailEndpoint = '/baep-dysphagia-details'

export function useBaepDysphagiaDetailResource() {
  return useCrudResource<BaepDysphagiaDetail>(MedicalRecordBaepDysphagiaDetailEndpoint)
}
