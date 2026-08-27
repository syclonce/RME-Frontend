import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Obstetrics } from './types'

export const MedicalRecordObstetricsEndpoint = '/obstetrics-records'

export function useObstetricsResource() {
  return useCrudResource<Obstetrics>(MedicalRecordObstetricsEndpoint)
}
