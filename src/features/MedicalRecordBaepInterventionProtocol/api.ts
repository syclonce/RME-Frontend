import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepInterventionProtocol } from './types'

export const MedicalRecordBaepInterventionProtocolEndpoint = '/baep-intervention-protocols'

export function useBaepInterventionProtocolResource() {
  return useCrudResource<BaepInterventionProtocol>(MedicalRecordBaepInterventionProtocolEndpoint)
}
