import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepInsomniaDetail } from './types'

export const MedicalRecordBaepInsomniaDetailEndpoint = '/baep-insomnia-details'

export function useBaepInsomniaDetailResource() {
  return useCrudResource<BaepInsomniaDetail>(MedicalRecordBaepInsomniaDetailEndpoint)
}
