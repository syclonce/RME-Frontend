import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepMotorDetail } from './types'

export const MedicalRecordBaepMotorDetailEndpoint = '/baep-motor-details'

export function useBaepMotorDetailResource() {
  return useCrudResource<BaepMotorDetail>(MedicalRecordBaepMotorDetailEndpoint)
}
