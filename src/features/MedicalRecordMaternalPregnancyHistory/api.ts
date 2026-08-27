import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MaternalPregnancyHistory } from './types'

export const MedicalRecordMaternalPregnancyHistoryEndpoint = '/maternal-pregnancy-histories'

export function useMaternalPregnancyHistoryResource() {
  return useCrudResource<MaternalPregnancyHistory>(MedicalRecordMaternalPregnancyHistoryEndpoint)
}
